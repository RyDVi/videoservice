import { useStaffLogin, setAuthHeader } from '@modules/api';
import {
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useHandleChange } from '@modules/hooks';
import SubmitForm from 'crmui/components/SubmitForm';
import { setCookie } from 'cookies-next';
import ListError from 'crmui/components/ListError';
import { useRouter } from 'next/router';

const LoginView: React.FC<{redirectTo?: string}> = ({redirectTo}) => {
  const router = useRouter()
  const { login, loginData, errorOflogin, setLoginData } = useStaffLogin();
  const handleChange = useHandleChange(setLoginData, loginData);
  return (
    <Container maxWidth="xs" sx={{ height: '100vh' }}>
      <Paper elevation={3} sx={{ marginTop: 'calc(100vh/4)' }}>
        <Typography variant="h3" align="center">
          Вход
        </Typography>
        <SubmitForm
          onSubmit={() =>
            login().then((response) => {
              setCookie('access_token', response.data.token);
              setAuthHeader(response.data.token);
              redirectTo && router.push(redirectTo)
            })
          }
        >
          <FormControl fullWidth size="medium" margin="normal" required>
            <FormGroup>
              <FormLabel>Никнейм или почта</FormLabel>
              <TextField
                name="username"
                value={loginData.username}
                onChange={handleChange}
                error={!!errorOflogin?.username}
                helperText={errorOflogin?.username}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Пароль</FormLabel>
              <TextField
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                error={!!errorOflogin?.password}
                helperText={errorOflogin?.password}
              />
            </FormGroup>
            <Button type="submit" sx={{ marginTop: 4 }}>
              Войти
            </Button>
            <ListError error={errorOflogin?.non_field_errors} />
          </FormControl>
        </SubmitForm>
      </Paper>
    </Container>
  );
};

export default LoginView;

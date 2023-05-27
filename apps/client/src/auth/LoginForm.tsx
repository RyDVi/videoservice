import React from "react";
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
} from "@mui/material";
import { ListError } from "@modules/components";
import { useHandleChange } from "@modules/hooks";
import { LoginData, ValidationErrors } from "@modules/api";

interface LoginFormProps {
  data: LoginData;
  errors?: ValidationErrors<LoginData> | null;
  onChange: (loginData: LoginData) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  data,
  errors,
  onChange,
}) => {
  const handleChange = useHandleChange(onChange, data);
  return (
    <>
      <FormControl fullWidth size="medium" margin="normal" required>
        <FormGroup>
          <FormLabel>Почта или никнейм</FormLabel>
          <TextField
            name="username"
            value={data.username}
            onChange={handleChange}
            error={!!errors?.username}
            helperText={errors?.username}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Пароль</FormLabel>
          <TextField
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            error={!!errors?.password}
            helperText={errors?.password}
          />
        </FormGroup>
        <Button type="submit" sx={{ marginTop: 4 }}>
          Войти
        </Button>
        <ListError error={errors?.non_field_errors} />
      </FormControl>
    </>
  );
};

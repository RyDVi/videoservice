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
import { SignupData, ValidationErrors } from "@modules/api";

interface SignupFormProps {
  data: SignupData;
  errors?: ValidationErrors<SignupData> | null;
  onChange: (signupData: SignupData) => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  data,
  errors,
  onChange,
}) => {
  const handleChange = useHandleChange(onChange, data);
  return (
    <>
      <FormControl fullWidth size="medium" margin="normal" required>
        <FormGroup>
          <FormLabel>Почта</FormLabel>
          <TextField
            name="email"
            value={data.email}
            onChange={handleChange}
            error={!!errors?.email}
            helperText={errors?.email}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Никнейм</FormLabel>
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
        <FormGroup>
          <FormLabel>Повторите пароль</FormLabel>
          <TextField
            type="password"
            name="password_repeat"
            value={data.password_repeat}
            onChange={handleChange}
            error={!!errors?.password_repeat}
            helperText={errors?.password_repeat}
          />
        </FormGroup>
        <Button type="submit" sx={{ marginTop: 4 }}>
          Зарегистрироваться
        </Button>
        <ListError error={errors?.non_field_errors} />
      </FormControl>
    </>
  );
};

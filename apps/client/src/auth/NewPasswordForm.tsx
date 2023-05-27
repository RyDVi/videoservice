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
import { NewPasswordData, ValidationErrors } from "@modules/api";

interface NewPasswordFormProps {
  data: NewPasswordData;
  errors?: ValidationErrors<NewPasswordData> | null;
  onChange: (restoreData: NewPasswordData) => void;
}

export const NewPasswordForm: React.FC<NewPasswordFormProps> = ({
  data,
  errors,
  onChange,
}) => {
  const handleChange = useHandleChange(onChange, data);
  return (
    <>
      <FormControl fullWidth size="medium" margin="normal" required>
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
          Установить новый пароль
        </Button>
        <ListError error={errors?.non_field_errors} />
      </FormControl>
    </>
  );
};

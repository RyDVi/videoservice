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
import { RestoreDataForSendEmail, ValidationErrors } from "@modules/api";

interface RestorePasswordFormProps {
  data: RestoreDataForSendEmail;
  errors?: ValidationErrors<RestoreDataForSendEmail> | null;
  onChange: (restoreData: RestoreDataForSendEmail) => void;
}

export const RestorePasswordForm: React.FC<RestorePasswordFormProps> = ({
  data,
  errors,
  onChange,
}) => {
  const handleChange = useHandleChange(onChange, data);
  return (
    <>
      <FormControl fullWidth size="medium" margin="normal" required>
        <FormGroup>
          <FormLabel>Ваш никнейм или E-Mail на сайте</FormLabel>
          <TextField
            name="email_or_username"
            value={data.email_or_username}
            onChange={handleChange}
            error={!!errors?.email_or_username}
            helperText={errors?.email_or_username}
          />
        </FormGroup>
        <Button type="submit" sx={{ marginTop: 4 }}>
          Получить Email для восстановления
        </Button>
        <ListError error={errors?.non_field_errors} />
      </FormControl>
    </>
  );
};

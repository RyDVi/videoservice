import React, { FormEvent } from "react";
import styled from "@emotion/styled";

const Form = styled.form({
  padding: 12,
});

export interface FormElements<T> {
  data: T;
  onChange: (data: T) => void;
}

export interface SubmitFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  vertical?: boolean;
  submitBtnText?: string;
}

const SubmitForm: React.FC<SubmitFormProps> = ({
  children,
  vertical,
  onSubmit,
  submitBtnText,
  ...props
}) => {
  const handleSubmit = React.useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit && onSubmit(event);
    },
    [onSubmit]
  );
  return (
    <Form onSubmit={handleSubmit} {...props}>
      {children}
    </Form>
  );
};

export default SubmitForm;

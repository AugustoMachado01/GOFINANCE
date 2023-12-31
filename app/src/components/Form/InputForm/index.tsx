import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { TextInputProps } from "react-native";

import { Container, Error } from "./styles";
import { Input } from "../Input";

interface Props extends TextInputProps {
  control: Control<any>;
  name: string;
  error?: FieldError;
}

export function InputForm({ control, error, name, ...rest }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
      {error && <Error>{error.message}</Error>}
    </Container>
  );
}

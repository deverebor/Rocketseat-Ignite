import { FormControl, FormLabel, Input as ChakraInput, InputProps as CharkraInputProps } from "@chakra-ui/react";
import React from "react";

interface InputProps extends CharkraInputProps {
  name: string,
  label?: string,
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }

      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="red.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: 'gray.900'
        }}
        size="lg"
        {...rest}/>
    </FormControl>
  )
}
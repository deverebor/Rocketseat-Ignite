import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as CharkraInputProps } from "@chakra-ui/react";
import { FieldError } from 'react-hook-form'
import React, { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends CharkraInputProps {
  name: string,
  label?: string,
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
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
        ref={ref}
        {...rest}/>

        { !!error && (
          <FormErrorMessage>
            { error.message }
          </FormErrorMessage>
        ) }
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
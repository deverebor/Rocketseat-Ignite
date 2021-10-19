import { FormControl, FormLabel, Input as ChakraInput, InputProps as CharkraInputProps } from "@chakra-ui/react";
import React, { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends CharkraInputProps {
  name: string,
  label?: string,
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, ...rest }, ref) => {
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
        ref={ref}
        {...rest}/>
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
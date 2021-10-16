import { Box, Flex, Avatar, Text } from '@chakra-ui/react'

export function Profile() {
  return(
    <Flex align={"center"}>
      <Box mr={"4"} textAlign={"right"}>
        <Text>Lucas Souza</Text>
        <Text color={"gray.300"} fontSize={"small"}>
          lucasp.sdev@gmail.com
        </Text>
      </Box>

      <Avatar size={"md"} name={"Lucas Souza"} src={"https://github.com/deverebor.png"} />
    </Flex>
  )
}
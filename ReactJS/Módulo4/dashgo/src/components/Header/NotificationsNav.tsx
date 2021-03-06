import { HStack, Icon } from '@chakra-ui/react'
import { RiNotification2Line, RiUser2Line } from 'react-icons/ri'

export function NotificationsNav(){
  return(
    <HStack
      spacing={["6","8"]}
      mx={["6","8"]}
      pr={["6","8"]}
      py="1"
      color={"gray.300"}
      borderRight={1}
      borderColor={"gray.700"}
      >
      <Icon as={RiNotification2Line} fontSize={"20"} />
      <Icon as={RiUser2Line} fontSize={"20"} />
    </HStack>
  )
}
import { Box, Drawer, DrawerOverlay, DrawerContent, useBreakpointValue, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContexts";

import { SidebarNav } from "./SidebarNav";

export function SideBar() {
  const { isOpen, onClose } = useSidebarDrawer()

  const isDrwaerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  if (isDrwaerSidebar){
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg={"gray.800"} p={"4"}>
          <DrawerCloseButton mt={"6"} />
          <DrawerHeader>Navegação</DrawerHeader>

          <DrawerBody>
            <SidebarNav />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
    )
  }

  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  )
}
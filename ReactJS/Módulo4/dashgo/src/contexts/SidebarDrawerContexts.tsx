import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SidebarDrawerProviderProps {
  children: ReactNode,
}

type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData)

export function SiderbarDrawerProvider({ children }: SidebarDrawerProviderProps) {
  const disclsure = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    disclsure.onClose()
  }, [router.asPath])

  return(
    <SidebarDrawerContext.Provider value={disclsure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)
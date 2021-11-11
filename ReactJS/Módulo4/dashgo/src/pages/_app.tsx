import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'

import { makeServer } from '../services/mirage'

import { SiderbarDrawerProvider } from '../contexts/SidebarDrawerContexts'

if(process.env.NODE_ENV !== 'production') {
  makeServer()
}

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ChakraProvider theme={theme}>
      <SiderbarDrawerProvider>
        <Component {...pageProps} />
      </SiderbarDrawerProvider> 
    </ChakraProvider>
  ) 
}

export default MyApp

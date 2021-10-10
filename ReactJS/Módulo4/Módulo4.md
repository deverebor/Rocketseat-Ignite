# Construindo Interfaces do Futuro

## Interface Declarativa

Interface do usuário declarativa é uma interface de usuário projetada de maneira declarativa (você descreve como deve ser) em vez de uma maneira imperativa (você codifica as etapas para criá-la.)

Exemplos:

- Tailwind CSS;
- Theme UI;
- Chakra UI;

Será utilizado nesse projeto a [Chakra UI](https://chakra-ui.com/docs/getting-started)

Biblioteca mais famosa de para transição é o Frame motion.

O Chakra dispõe de um [tema](https://chakra-ui.com/docs/theming/theme) padrão que possui configurações simples e fáceis.

----------------------------------------------------------------------------------

## Criando projeto NextJS

```shell
yarn create next-app dashgo
```

Ou

```shell
yarn create next-app --typescript
```

A estrutura inicial recomendada para um projeto NextJS é:

```bash  
  ├── .next
  │ 
  ├── node_modules
  │
  ├── public
  │
  ├── src
  │  ├── components
  │  ├── pages
  │  │   ├── _app.tsx
  │  │   ├── index.tsx
  │  │   └── _document.tsx
  │  │
  │  └── styles
```

----------------------------------------------------------------------------------

## Configurando o Chakra UI

Para instalar o Chakra no seu projeto usa-se:

```shell
yarn add @chakra-ui/react @chakra-ui/core @emotion/react @emotion/styled framer-motion
```

O Chakra por debaixo dos panos tem a integração com o [Emotion](https://emotion.sh/docs/introduction) e o [Framer Motion](https://www.framer.com/motion/).

Logo após cria-se o config.ts e theme.ts.

theme.ts => onde ficará nosso tema do chakra modificado. Por padrão as estilizações já vem com layouts definidos, nesse arquivo faz a alteração necessária.

config.ts =>

Todas as importações que forem ser feitas são do:

```typescript
import {  } from '@chakra-ui/react'
```

Para alterar os estilos de um componente do Chakra, estende-se ele e somente assim será possível atera-lo.

```typescript
import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  
})
```

**Um exemplo de estilização do Chakra:**

```typescript
import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
   styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50'
      }
    }
  }
})
```

Para utilizar os temas deve-se importar no _app.tsx o ChakraProvider e envolve-lo na aplicação, como parâmetro passa-se o theme={nomeDaConstanteExportadaNoArquivotheme.ts}.

```typescript
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  ) 
}

export default MyApp
```

O resetCSS vai remover TODA a estilização default do css padrão no html. Por padrão ele vem como true caso seja necessário usa-se o false.

```typescript
    <ChakraProvider resetCSS={false} theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
```

Para configurar as nossas próprias cores usa-se o:

```typescript
    colors: {
      gray: {
        "900": "#181B23",
        "800": "#1F2029",
        "700": "#353646",
        "600": "#4B4D63",
        "500": "#616480",
        "400": "#797D9A",
        "300": "#9699B0",
        "200": "#B3B5C6",
        "100": "#D1D2DC",
        "50": "#EEEEF2",
    }
  },
```

----------------------------------------------------------------------------------

## Configurando a fonte

Primeiro cria-se o _document.tsx para configurar o nosso documento html no next. 
Logo após cria-se uma classe que terá na sua estrutura a fonte que será utilizada.

```typescript
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```
Configurado o a fonte na raiz da aplicação agora é necessário configurar no Chakra UI, dentro do themes.ts:

```typescript
fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
```

O atributo heading configura as fontes do Header, já o body o do Body.

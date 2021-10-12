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

----------------------------------------------------------------------------------

## Página: Sign In

Para trabalhar com Flex no Chakra é bem interessante, usa-se o componente ```<Flex>```

Dentro desse flex existem vários parâmetros de estilização que podem ser passados clique [aqui](https://chakra-ui.com/docs/layout/flex) para saber mais.
Alguns exemplos são:

```text
width={100} ou w={"100px"}
height={50} ou h={"50vw"}
```

Pode-se passar tanto em número ou texto.

Por padrão todo flex é uma div, para altear isso usa-se o ```as="outra tag"``` Ex:

```typescript
<Flex as="form">
</Flex>
```

Agora o flex é um formulário.

Quando se usa um número como string no valor de um elemento no Chakra e não se passa qual a sua medida ele interpreta como a medida criada [default](https://chakra-ui.com/docs/theming/theme) ferramenta.

```8 = 2rem = 32px```

Para converter em **rem** basta dividir por 4

$
\frac{8}{4} = 2
$

Para converter em **px** basta multiplicar por 4

$
8\times 4 = 32
$

O ```<Button>``` dentro do Chakra possui uma propriedade chamada colorScheme que faz com que ele possa mudar a sua cor padrão de Botão.

```typescript
<Button type="submit" mt="6" colorScheme="red">Entrar</Button>
```

O Chakra dispõe de várias formas de configuração do conteúdo, trazendo uma liberdade maior para estilização. Para configurar por exemplo o estilo da borda do botão quando o foco está ativo é o focusBorderColor:

```typescript
 <Input
    name="email"
    type="email"
    placeholder="Login" 
    focusBorderColor="red.900"/>
```

Também é possível modificar o tipo de contorno que terá o input, para saber mais clique [aqui](https://chakra-ui.com/docs/form/input).
Um dos exemplos é o flushed, que deixa o contorno apenas na parte de baixo. E para configurar isso usa-se o variant:

```typescript
<Input
   variant="flushed"/>
```

Para configurar os estados que um elemento no Chakra tem usa-se o _nomeDoEstado, exemplo:

```typescript
<Input
  _hover={{
    bgColor: 'gray.900'
  }}
```

As {} indica que será atribuido um código JavaScript e dentro disso passamos um objeto, esse objeto tem como atributos a cor de fundo sendo um cinza mais escuro.

A propriedade size="" no Chakra indica o tamanho que o input terá.

Quando se cria uma pilha de elementos que terá um espaçamento entre eles usa-se o **Stack** um componente do Chakra UI.

----------------------------------------------------------------------------------

## Componente: Input

Como forma de boas práticas para a manutenção de uma aplicação, muitas vezes será necessário componentizar um elemento.
Utilizando o Chakra não será diferente e para fazer isso é simples.

Nesse caso foi componentizado o elemento Input.

```bash  
  ├── src
  │  ├── components
  │  │   └── Form
  │  │        └──  Input.tsx
```

Foi criado uma pasta para os componentes de formulário, sempre que possível é bom separar-lo pelo todo, ou seja, de onde vem aquele componente.

Dentro do ```Input.tsx``` importa-se os componentes do chakra que será utilizado na criação.

```typescript
import { FormControl, FormLabel, Input as ChakraInput, InputProps as CharkraInputProps } from "@chakra-ui/react";
import React from "react";
```

> O **Input** e **Input props** foram importados com um alias por motivos de: O componente vai possuir uma **tipagem própria** e será **exportado como Input**.

Após as importações inicia-se a codificação

```typescript
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
```

a função Input receberá como parâmetros as props que **devem existir** e também o que virá das propriedades padrões do Chakra, por isso usa-se o ```...rest``` para informar que será passado o restante do conteúdo que vem do pai, já que um input pode precisar de diversos elementos extras.

A minha tipagem extende a tipagem pai que é o InputProps do Chakra, isso ocorre porque o ```name``` e ```label``` serão as tipagens obrigatórias do meu elemento então é necessário **explicitar** isso, já que estou utilizando TypeScript:

```typescript
interface InputProps extends CharkraInputProps {
  name: string,
  label?: string,
}
```

Mas como esse componente será utilizado de forma universal e não será necessário sempre ter uma label, resolvemos isso usando uma condição:

```typescript
{ !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
```

O label pode ser falso e também pode existir.

----------------------------------------------------------------------------------

## Criando o Header

Como o header será utilizado em diversas partes da aplicação além do Dashboard cria-se um componente:

```bash  
  ├── src
  │  ├── components
  │  │   └── Header.tsx
```

Para a estilização padrão desse Header foi feito:

```typescript
<Flex
  as="header"
  w="100%"
  maxWidth={1480}
  h="20"
  mx="auto"
  mt="4"
  px="6"
  align="center"
  >
         
</Flex>
```

A estilização da "logo" da aplicação foi feito desta maneira:

```typescript
<Text
  fontSize="3xl"
  fontWeight="bold"
  letterSpacing="tight"
  w="64"
  >
  Dashgo
  <Text as="span" ml="1" color="red.500">.</Text>
</Text>
```

Por padrão o componente ```Text``` vem com display block e é um paragrafo, Então foi necessário adicionar o ```as="span"```, fazendo com que esse Text agora torne-se um elemento HTML ```<span>```.

Quando precisa-se de um ícone em conjunto de um input, a melhor maneira é fazer o elemento que está por volta dos dois ter a estilização de um Input para a pessoa clicar e ambos receberem o foco. Neste caso transformei em label:

```typescript
<Flex
  as="label"
  flex="1"
  py="4"
  px="8"
  ml="6"
  maxW={400}
  alignSelf="center"
  color="gray.200"
  position="relative"
  bg="gray.800"
  borderRadius="full"
  >
    
  <Input
    color="gray.50"
    variant="unstyled"
    px="4"
    mr="4"
    placeholder='Buscar na plataforma'
    _placeholder={{
      color: 'gray.400'
    }}
    />
  <Icon as={RiSearchLine} fontSize="20"/>
</Flex>
```

Biblioteca de icone:

```bash
yarn add react-icons
```

Na documentação do Chakra pede-se que caso utilize um ícone de fora da biblioteca importa-se o componente ```Icon``` padrão do chakra e o alias para o externo.

```typescript
<Icon as={RiSearchLine} fontSize="20"/>
```

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

----------------------------------------------------------------------------------

## Finalizando o Header

Nessa parte foi feito as adições do botão de notificação/pedido de amizade e o avatar do usuário/nome/email

Como o icone de notificação ficará lado a lado do de amizades, usa-se o ```HStack``` que é um componente com orientação Horizontal de um Stack(também existe o VStack, que parte do mesmo pressuposto).

```typescript
<HStack
  spacing="8"
  mx="8"
  pr="8"
  py="1"
  color="gray.300"
  borderRight={1}
  borderColor="gray.700"
  >
  <Icon as={RiNotification2Line} fontSize="20" />
  <Icon as={RiUser2Line} fontSize="20" />
</HStack>
```

Para a sessão com o Nome do usuário + email utiliza-se o componente ```Box``` que é a "div" do Chakra.

```typescript
<Box mr="4" textAlign="right">
  <Text>Lucas Souza</Text>
  <Text color="gray.300" fontSize="small">
    lucasp.sdev@gmail.com
  </Text>
</Box>
```

Para a configuração da seção do usuário usa-se o componente ```Avatar``` do Chakra:

```typescript
<Avatar size="md" name="Lucas Souza" src="https://github.com/deverebor.png" />
```

Usa-se esse componenete porque ele premite interações utéis como:

- Caso o usuário não tenha foto de perfil ficará as iniciais do nome ```name=""```.
- Se o usuário tiver uma foto de perfil basta linkar no ```src=""```

----------------------------------------------------------------------------------

## Componente: Sidebar

Como a sidebar será utilizado em diversas partes da aplicação além do Dashboard cria-se um componente:

```bash  
  ├── src
  │  ├── components
  │  │   └── Sidebar.tsx
```

Para a estilização padrão do sidebar foi feito, O ```Box as="aside"``` já que normalmente se utiliza em sidebar essa propiedade para definir uma sidebar.

```typescript
<Box as="aside" w="64" mr="8">
//..código
</Box>
```

Como haverá um conjunto de conteúdos usa-se o stack, para agrupar todos esses conteúdos e trazer organizado na tela.

```typescript
<Stack spacing="12" align="flex-start">
//..código
</Stack>
```

Cada seçãos será divida por uma ```<Box>``` ou seja uma div. Dentro de cada box terá uma seção com o conteúdo pre definido:

Seção: **GERAL**:

```typescript
<Box>
  <Text fontWeight="bold" color="gray.400" fontSize="small">GERAL</Text>
    <Stack spacing="4" mt="8" align="stretch">
      <Link display="flex" align="center">
        <Icon as={RiDashboardLine} fontSize="20" />
        <Text ml="4" fontWeight="medium">Dashboard</Text>
      </Link>
      <Link display="flex" align="center">
        <Icon as={RiContactsLine} fontSize="20" />
        <Text ml="4" fontWeight="medium">Usuários</Text>
      </Link>
    </Stack>
</Box>
```

Seção: **AUTOMAÇÃO**:

```typescript
<Box>
  <Text fontWeight="bold" color="gray.400" fontSize="small">AUTOMAÇÃO</Text>
    <Stack spacing="4" mt="8" align="stretch">
      <Link display="flex" align="center">
        <Icon as={RiInputMethodLine} fontSize="20" />
        <Text ml="4" fontWeight="medium">Formulários</Text>
      </Link>
      <Link display="flex" align="center">
        <Icon as={RiGitMergeLine} fontSize="20" />
        <Text ml="4" fontWeight="medium">Automação</Text>
      </Link>
    </Stack>
</Box>
```

Dentro de cada seção existe um ```<Stack>``` que envole os ```<Links>``` e seu conteúdo.
O ```spacing=""``` é utilizado para informar o espaçamento em cada item interno ao Stack.

Por questões de boas práticas como essa side bar vai conter muitas seções e links, atomizar mais ainda e componenteizar algumas seções, assim tornando a aplicação melhor no quesito manutenção e também para futuras melhorias.

----------------------------------------------------------------------------------

## Página: Dashboard

Biblioteca para gráficos [Apexcharts.js](https://apexcharts.com/docs/installation/)

```bash
yarn add apexcharts react-apexcharts
```

O ```<SimpleGrid>``` é Compenente para criação de grids simples, caso necessário algo mais complexo usa-se o ```<Grid>```.

O SimpleGrid possui diversas propriedades e uma delas é o ```<minChildWidth>``` ele existe somente dentro do SimpleGrid e torna a responsividade mais automatizada, já que após uma determinada largura ele vai "quebrar" o layout, colocando um elemento em cima do outro.

```typescript
<SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
  <Box
    p="8"
    bg="gray.800"
    borderRadius="8"
    pb="4"
    >
      <Text fontSize="lg" mb="4">Inscritos da Semana</Text>
      <Chart options={options} series={series} type="area" height={160} />
  </Box>

  <Box
    p="8"
    bg="gray.800"
    borderRadius="8"
    pb="4"
    >
      <Text fontSize="lg" mb="4">Taxa de Abertura</Text>
      <Chart options={options} series={series} type="area" height={160} />
  </Box>
</SimpleGrid>
```

Para configurar o Chart é necessário criar 2 constantes:

```typescript
const option = {

} 

//e

const series = [

]
```

> No option ficará as configurações do grafico.
> No series ficará os dados do grafico.

```typescript
const option: ApexOptions = {

} 
```

É necessário caso esteja utilizando typescript, passar o ```ApexOptions``` como proprioedades das **options**, porque caso contrário não será enctrado essas propriedades do Chart.

Em Next quando se faz o primeiro carregamento da aplicação, ocorre um loading do HTML pelo servidor back-end e do o front-end.
Dentro dessa intermediação roda-se um processo node e quando se recarrega a página o Chart apresentará um erro:

```text
Server Error
ReferenceError: window is not defined

This error happened while generating the page. Any console logs will be displayed in the terminal window.
```

A o Chart precisa do objeto window e este não é renderizado no lado do servidor, para resolver fazemos:

1. Importação do ```dynamic```

    ```typescript
    import dynamic from 'next/dynamic'
    ```

2. Depois reescrevemos a importação do Chart transformando-o em uma constante:

    ```typescript
    const Chart = dynamic(() => import('react-apexcharts'), {
      ssr: false,
    })
    ```

Esse tipo de importação chamasse *lazy loading* ou seja quando se carrega algum componente de forma dinamica, por exemplo quando o usuário clicar em um botão e etc.
Além disso passamos uma opção ```ssr: false,```. Essa opção informa que aquele componente especifico não sera carregado no lado do servidor e sim no lado do cliente.

----------------------------------------------------------------------------------

## Página: Lista de usuário

`<Heading>` é utilizado para fazer textos `<h2>`

Por padrão o botão no chakra pode utilizar dois elementos para configurar icones dentro dele.

`leftIcon={}` ou `rightIcon={}`
> direita     |   esquerda

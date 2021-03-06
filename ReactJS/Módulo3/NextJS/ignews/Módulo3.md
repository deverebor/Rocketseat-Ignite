# Fundamentos do Next.js - 3.1

## Aula 01 - Fluxo da aplicação

O projeto que será construido no modulo é um site para assinar newsletter.
Link do layout do figma: <https://www.figma.com/file/3pxSUIP7oueM2t0LVtuYox/ig.news-(Copy>)
Link da documentação do NextJS: <https://nextjs.org/docs/getting-started>

Ferramentas que serão utilizadas na construção do site:

Stripe: API para pagamentos
FaunaDB: Banco de dados para aplicações serverless (Outra opção seria o DynamoDB da AWS)
Prismic CMS: Content Management System -> Painel de administração para cadastrar informações e servir uma API.
OAuth(Autenticação): GitHub.

----------------------------------------------------------------------------------
Aula 02 - Fundamentos do Next.js

O NextJS utiliza SSR(Server Side Rendering) -> Faz com que o contúdo da aplicação seja carregado pelo lado do back-end assim melhorando uma serie de fatores inclusive o SO da aplicação. O modelo tradicional de SPA(Single Page Application) carrega o conteúdo todo no front-end, então caso haja algum problema de indexação a página não será carregada por completo.

----------------------------------------------------------------------------------
Aula 03 - Criando estrutura Next.js
Para criar uma aplicação com o next usa-se:

yarn create next-app ignews -> nome da aplicação

A pasta pages só pode estar em dois lugares na estrutura de uma aplicação react: Raiz do projeto ou dentro do SRC

O arquivo chamado index é o principal da aplicação e não é necessário criar uma rota default para ela. Para cada arquivo criado na pasta pages o next entende como uma rota, exceto o _app e o_documents.

----------------------------------------------------------------------------------
Aula 04 - Adicionando TypeScript
Para adicionar o typescript ao projeto next usa-se o seguinte comando:

yarn add typescript @types/react @types/node -D

Quando se adiciona o typescript a um projeto next é uma boa prática importar as propriedades para o _app.tsx

```typescript
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
```

Dessa forma as propriedades terão o seu valor tipado.

----------------------------------------------------------------------------------
Aula 05 - Estilização com SASS
No nextjs a estilização global fica no _app.jsx para evitar conflitos de estilizações futuras, como surgimento de novas classes e também a construção da mesma.

O styledcomponets é muito bom porém não é necessário se utilizar em todo projeto, pode-se alternar entre ele e o sass. O styledcomponets usa-se de muitos recursos e também uma complexidade maior, dependendo do projeto pode-se utilizar o sass ou qualquer outro pre processador de css.

Todo arquivo que possui um 'home*.module.*css' ele é um css scoped usa-se um css modules dentro do next.js
Quando se utiliza css modules não se faz estilização em tags diretas e sim em classes ou id's.

----------------------------------------------------------------------------------
Aula 06 - Configurando fonte externa
O _app.tsx vai SEMPRE está por volta de toda a aplicação, ou seja, sempre envolverá todas as páginas da aplicação. Toda vez que o usuário mudar de página o_app.tsx será recarregado.

Caso seja necessário carregar apenas UMA ÚNICA vez qualquer elemento, por exemplo uma font externa, se utiliza o _document.jsx esse arquivo funciona da mesma maneira que o index.html do create-react-app.

O NextJS ainda não tem um suporte tão bom para se utilizar o _docuemnt.jsx como função então exporta-se ele como uma classe:

```typescript
import Document from 'next/document'

export default **class MyDocument** extends Document {
  render() {
    return(

    )
  }
}
```

Todos as tags htmls utlizadas no _document são transformadas em components html que veem por padrão no NextJS:

```typescript

import Document, **{ Html, Head, Main, NextScript }** from 'next/document'

export default class MyDocument extends Document {
  render() {
    return(
      *<Html>*
        *<Head>*
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />

        *</Head>*
        <body>
          <Main /> -> onde será carregado o conteúdo da página.
          <NextScript /> -> onde fica armazenado os scripts js para funcionalidade da aplicação.
        </body>
      *</Html>*
    )
  }
}
```

----------------------------------------------------------------------------------
Aula 07 - Title dinâmico por página

index.tsx

```typescript
<Head>
  <title>Início | ig.news</title>
</Head>
```

Todo conteúdo colocado dentro de um < Head > é linkado com o head do _document.tsx para criar os títulos dinâmicos para cada página, caso seja colocado dentro do_document será um titulo universal e todas as páginas terão o mesmo.

----------------------------------------------------------------------------------
Aula 08 - Estilos globais do app

Quando se utiliza o .module.scss você está definindo um estilo somente para aquele componente, já quando se utiliza somente a extensão é um estilo global.

color: inherit; -> assume a cor do elemento que está por volta dele.

o scss não pode-se importar dentro do _document.

Para definir o rem da página pega-se o valor padrão do tamanho das fonts (16px) e multiplica pela percentagem necessária, EX:

16 x 93,75% =
16 x 0,9375 = 15

----------------------------------------------------------------------------------
Aula 09 - Componente: Header
No next não se importa as imagens como é normalmente no create-react-app importa-se assim:

```html
<img src="/images/logo.svg" alt="" />
```

TODAS AS IMAGENS DEVE FICAR NO PUBLIC.

::after -> estilizar algo antes de fechar a tags
::before -> estilizar algo no começo da tag

dentro do after ou before é necessário ter um content mesmo que esteja vazio.

----------------------------------------------------------------------------------
Aula 09 - Componente: SignInButton
Toda vez que um componente muda de estado no react ele é renderizado novamente.

Para pegar alguns icones pode-se instalar o pacote react-icons.

yarn add react-icons

----------------------------------------------------------------------------------
Aula 09 - Página Home

```css
height: calc(100vh - 5rem); -> Altura total da tela - o fontsize
```

----------------------------------------------------------------------------------
Aula 09 - Componente: SubscribeButton

O contexto sempre define o espaçamento dos elementos dentro dele.

----------------------------------------------------------------------------------
Aula 10 - Configurando Stripe
A chave publica do stripe é para fazer requisições de dados no front-end.
A chave secreta é  a chave que da o controle de admin em toda a aplicação.

.env.local = rodando projeto local.
.env.production = rodando em produção.
.env.development = rodando em desenvolvimento.
.env.test = rodando em teste.

Documentação do NextJS sobre variáveis locais: <https://nextjs.org/docs/basic-features/environment-variables>

----------------------------------------------------------------------------------
Aula 10 - Consumindo API do Stripe (SSR)
para adicionar o stripe SDK (SoftwareDevelopmentKit) na aplicação usa-se:

yarn add stripe

Documentação da API do stripe: <https://stripe.com/docs/api>
Layout shift= mudança percetível ao usuário

Para exportar o conteúdo da requisição para um componente é necessário armazenar os valores em uma página já que O SSR só funciona em páginas do next e não em componentes. Para isso cria-se uma constante que armazenará as propriedades do server O NOME SÓ PODE SER getServerSideProps NÃO PODE SER OUTRO:

```typescript
export const getServerSideProps = async () => {
  
}
```

Sempre será uma async fucntion porque retornará uma promessa que será utilizada.
Tudo isso se faz para poder importar uma tipagem do next para essa função que é o notFound(boleano), props e redirect:

```typescript
import {GetServerSideProps} from 'next'

export const getServerSideProps: *GetServerSideProps* = async () => {

}
```

Tudo que é retornado dentro do getServerSideProps é passado como propriedade para a Home(props) fazendo com que tenha um fluxo de troca de dados.
Os comandos rodados dentro do getServerSideProps é somente NO LADO do SERVIDOR ou seja se rodarmos um console.log por exemplo ele aparecerá no lado do servidor, ou seja no nosso terminal porque todo o conteúdo está no SERVIDOR NODE.

Após criar a pasta services dentro do src, cria-se um stripe.ts onde coloca-se as configurações do stripe, um exemplo "default":

```typescript
import Stripe from 'stripe'
import { version } from '../../package.json'

export const stripe = new Stripe(
  process.env.STRIPE_API_KEY, -> importação da chave local.
  {
    apiVersion: '2020-08-27', -> versão da api
    appInfo: { -> informação da aplicação
      name: 'Ignews', -> nome da aplicação;
      version -> versão importada do package.json;
    },
  }
)
```

A configuração do stripe dentro do Home() ficaria assim por "default":

```typescript
export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1JJybFLKxNvsNVSHX1Y71OMK', {
    expand: ['product'] -> Pega toda a descrição do produto.
  })

  const product = {
    priceId: price.id, -> id do produto que será utilizado.
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100), -> Convertendo para USD e colocando em cents, é sempre bom utilizar centavos no servidor para conseguir trabalhar melhor com o preço.

  }

  return {
    props: {
      product, -> retornando o produto para utilização das propriedades na função Home()
    }
  }
}
```

----------------------------------------------------------------------------------
Aula 10 - Static Site Generation (SSG)
No caso dessa aplicação já que na HOME o preço vai ser o mesmo e não receberá alteração pode-se utilizar o SSG para cuidar da renderiação disso. Com o SSG o next salva uma cópia estática da aplicação e não terá que recarregar toda vez e fazer um contato com o servidor para pegar as informações do preço. Só deve-se utilizar o SSG em páginas que o conteúdo vai ser o mesmo por tempo indeterminado.

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JJybFLKxNvsNVSHX1Y71OMK')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),

  }

  return {
    props: {
      product,
    },
    revalidate: 60 *60* 24, -> Quanto tempo em segundos a página não será revalidada. 60 -> 1 min, 60 -> 1hr, 24 -> 1 dia = cada 1 dia.
  }
}

----------------------------------------------------------------------------------
Back-end no front-end - 3.2
Aula 11 - API routes no Next.js

Toda vez que se cria uma página dentro do next ele cria automaticamente uma rota.
A partir do momento que o código do back-end é executado no front-end nunca será seguro, pois ela se torna pública.

Uma função de retorno para a api que conecta o ban-end sempre receberar um request e um response como parametro da função.

----------------------------------------------------------------------------------
Back-end no front-end - 3.2
Estratégias de autenticação

JWT(refresh token): salvo em um storage, esse JWT tem um tempo de expiração e quando o úsuario necessita novamente de um token é criado.

NextAuth: quando se quer uma autenticação simples como um login social(login com terceiro Google, GitHub e etc). Quando não é necessário se preocupar em armazenar credencial de acesso do usuário.
Para ler mais sobre autenticação com o NextAuth ( nextjs.org/docs/authentication )

Providers externos: Cognito(AWS), Auth0

O metódo de autenticação usada nessa aplicação é a NextAuth.

----------------------------------------------------------------------------------
Back-end no front-end - 3.2
Parametrização nas rotas

O nextauth utiliza o spreedoperator para pegar todo o conteúdo da rota e ser utilizada nas rotas futuras.
Ex:

[...params].tsx => retornara todo o conteúdo de dentro da rota users.

Para isso funcionar é necessário criar uma pasta para a rota.

----------------------------------------------------------------------------------
Back-end no front-end - 3.2
Autenticação com Next Auth

Necessário criar um OAuth no github.
[Aqui](https://github.com/settings/applications/new)
[Parametros para as requisições no [...nextauth].ts](https://docs.github.com/pt/developers/apps/building-oauth-apps/authorizing-oauth-apps)

Dentro do env, configurasse os tokens da aplicação de autenticação utilizada, nesse caso o GitHubAuth.

Para utilizar a autenticação vincula ao botão uma função do proprio nextauth chamada signIn.
Para deslogar o usuário da aplicação é necessário utilizar a função signOut.
Além disso para verificar se o usuário está logado ou não usasse uma propriedade da função useSession() chamada session.

----------------------------------------------------------------------------------
Back-end no front-end - 3.2
Escolhendo um banco de dados

Utilizando na aplicação: FaunaDB melhor compatibilidade com o NextJS

----------------------------------------------------------------------------------
Back-end no front-end - 3.2
Configurando FaunaDB

fauna.com/pricing

Necessário criar o fauna.ts no services.

AS CONSULTAS NÃO PODEM SER FEITAS NO LADO DO USUÁRIO, SOMENTE NA /api ou no export const getStaticProps.

----------------------------------------------------------------------------------
Back-end no front-end - 3.2
Salvando usuário no banco

[JWT](https://next-auth.js.org/warnings#server)

É necessário importar o query para fazer a inserção no banco. uma estrutra base será algo similar a isso:

callbacks: {
    async signIn(user, account, profile) {
      const { email } = user

      try {
        await fauna.query(
          q.Create(
            q.Collection('users'),
            { data: {email}}
          )
        )

        return true
      } catch {
        return false
      }
      
    },
  }

----------------------------------------------------------------------------------
Back-end no front-end - 3.2
Verificando usuário duplicado

try {
        await fauna.query(
          q.If( => Se
            q.Not( => Não
              q.Exists( => Existe
                q.Match( => Algo igual a isso:
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create( => Cria
              q.Collection('users'), => Na colections
              { data: {email}} => usuario com email
            ),
            q.Get( => Se não, pega
              q.Match( => Algo igual a isso
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        )
Cria-se essa consulta para fazer a verificação.

----------------------------------------------------------------------------------
Back-end no front-end - 3.2
Gerando sessão de checkout

[Docuemntação do Stripe - Checkout Sessions](https://stripe.com/docs/api/checkout/sessions)

Uma sessão de check-out representa a sessão do cliente enquanto eles pagam por compras únicas
ou assinaturas através do Checkout.
Recomenda-se a criação de uma nova Sessão cada vez que seu cliente tentar pagar.

Lugares para fazer operações que necessitam de segurança e/ou utilizar as variáveis ambientes:

getServerSideProps => usando SSR (Server Side Rendering) - utilizado quando a página é renderizada.
getStaticProps => usando SSG (Static Side Generation) - utilizado quando a página é renderizada.
API Routes => rotas da api dentro da aplicação - utilizado em uma ação do usuário.

Sempre que se cria algo no back-end usa-se POST.

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST'){ => se o metódo de requisição for POST
    const session = await getSession({ req }) => pega a seção atual do usuário nos cookies

    const stripeCustomer = await stripe.customers.create({ => cria um cliente no stripe 
      email: session.user.email,
      
    })

    const stripeCheckoutSession = await stripe.checkout.sessions.create({ => faz a checagem se o usuário está na sua seção.
      customer: stripeCustomer.id, => id do cliente.
      payment_method_types: ['card'], => metódo de pagamento.
      billing_address_collection: 'required', => se o endereço será colocado pelo usuário ou não. Pode ser 'required' ou 'auto'.
      line_items: [
        {price: 'price_1JJybFLKxNvsNVSHX1Y71OMK', quantity: 1} => Item que será comprado e sua quantidade.
      ],
      mode: 'subscription', => tipo de compra.
      allow_promotion_codes: true, => permite códigos promocionais.
      success_url: process.env.STRIPE_SUCCESS_URL, => Url de sucesso.
      cancel_url: process.env.STRIPE_CANCEL_URL => Url de cancelamento.
    })

    return res.status(200).json({ sessionId:  stripeCheckoutSession.id}) => retorna um status de Sucesso enviando um JSON com o id da seção.
  } else { => se a requisição não for POST
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed') => ´Metódo não permitido
  }
}

----------------------------------------------------------------------------------
Back-end no front-end - 3.2
Redirecionando para o Stripe

Para comunicar o front-end com as todas da API do tipo POST usa-se o axios ou fetch, nesse caso utilizei o axios.

Integração do Stripe com o browser = stripe-js.ts yarn add @stripe/stripe-js

export async function getStripeJs(){
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) => chave publica para criação do cliente no stripe.

  return stripeJs
}

//checkout session
    try {
      const response = await api.post('/subscribe') => envia para a rota de subscrebe.

      const { sessionId } = response.data => armazena a id da seçãoa atual do usuário.

      const stripe = await getStripeJs() => pega o id da seção atual do usuário no cookie,

      await stripe.redirectToCheckout({ sessionId }) => envia para a tela de pagamento.

    } catch (err) {
      alert(err.message)
    }
  }

----------------------------------------------------------------------------------
Back-end no front-end - 3.2
Evitando duplicação no Stripe

Para remover a repetição de dados foi necessário fazer algumas alterações, como na aplicação trata-se de uma inscrição mensal, o usuário tem a opção de remover essa inscrição
Insecrever-se no futuro novamente ou continuar, então é necessário adaptar essa lógica que até então não existe na aplaicação.

É necessário tipar o User para definir as propriedades que serão levadas por ele.

type User = {
  ref: {
    id: string; -> id do usuário
  },
  data: {
    stripe_customer_id: string, -> id do customer na api do stripe.
  }
}

Além do id para a autenticação do usuário também deve ser armazenado o id do usuário no stripe, para fazer isso utiliza-se dos cookies, definindo assim o mesmo id que escite no banco de dados para o stripe também. Para fazer isso definimos da seguinte maneira:

if (req.method === 'POST') { => se for método POST, ou seja, se fizer uma conexão post no banco de dados.
    const session = await getSession({ req }); => pega a seção do usuário.

    const user = await fauna.query<User>( => Usa a tipagem do usuário para passar os atributos necessários.
      q.Get( => Pega o Match
        q.Match( => Procura algo parecido com isso:
          q.Index('user_by_email'), => email
          q.Casefold(session.user.email) => coloca o novo id relacionando com o email
        )
      )
    );

    let customerId = user.data.stripe_customer_id;

    if (!customerId) { => se for dirente de customerId
      const stripeCustomer = await stripe.customers.create({ =>cria um novo usuário com email no banco.
        email: session.user.email,
        // metadata: 
      });

      await fauna.query(
        q.Update( => faz o update
          q.Ref(q.Collection('users'), user.ref.id), na coleção de users
          {
            data: {
              stripe_customer_id: stripeCustomer.id, => esse conteúdo 
            }
          }
        )
      )

      customerId = stripeCustomer.id;
    }

----------------------------------------------------------------------------------
Back-end no front-end - 3.3
Escolhendo um CMS

JAMStack (typescript API Markup Stack)

----------------------------------------------------------------------------------
Back-end no front-end - 3.3
Configurando Prismic CMS

Conteúdo téorico.

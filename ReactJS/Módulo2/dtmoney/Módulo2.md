# Primeira aplicação web com ReactJS

Aula 01 - Estrutura com create-react-app

Criando aplicação com o create-react-app.

yarn create reat-app nome_do_aplicativo --template typescript

Por padrão ele cria uma aplicação utilizando o JavaScript por isso o template typescript.

Para inicializar o projeto com o ract-app usa-se o yarn start

export function x export default function

Quando se passa uma função como export default quem define o nome do componente não é quem faz a exportação e sim quem importa, ou seja, caso eu faça uma alteração no nome da exportação vai ser permitido não será a mesma da função.
Quando se exporta normalmente é obrigatório utilizar o nome da função entre { }. Caso seja necessário nomear de forma diferente ta função é só utilizar o **as** EX:

import { App **as** Batata } from './App'

-------------------------------------------------------------------------------------------
Aula 02 - Exportando assets do Figma

link do projeto no figma: <https://www.figma.com/file/qkFLgkbDJdddx8T0uIligU/dtmoney---Ignite?node-id=0%3A1>

Se exporta como SVG imagens vetorizadas;
o favicon é o ícone da página;

Uma boa prática para se fazer é pegar todas as cores dominantes do projeto e transformar em varáveis para se trabalhar de uma melhor forma.

-------------------------------------------------------------------------------------------
Aula 03 - Instalando Styled Components

Documentação => <https://styled-components.com>

Uma das maiores estratégias no front-end no quesito estilização é o css in js. Existes várias bibliotecas que fazem esse trabalho porém uma das melhores é a styled-components, para instalar no projeto se utiliza:

yarn add styled-componets

yarn add @types/styled-components -D => integração com typescript

Com o styled-components os componentes são previamente estilizados.

Para se criar faz da seguinte maneira:

import styled from "styled-components";

const Title = styled.h1`
  font-size: 64px;
  color: #8257e8

`

export function App() {
  return (
    <div className="App">
      <Title>Hello World!</Title>
    </div>
  );
}

As estilizações utilizando o styled-components nunca serão compartilhadas como ocorre no scss ou css, a não ser que seja configurado para isso.

-------------------------------------------------------------------------------------------
Aula 04 - Criando estilos globais

Para se estilizar com o styled-components cria-se um arquivo .ts dentro da pasta styles e importa a biblioteca:

import { createGlobalStyle } from "styled-components"; => estilização global.

Os componentes são nomeados com camelcase => GlobalStyle <= porque é importado como componente no react.

Por questão de acessibilidade não se remove o outlined globalmente da aplicação, porque ele define qual o elemento em foco e etc.

É importante também utilizar varáveis na criação da estilização, pois elas dão uma leitura melhor para o código. EX:

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #f0f2f5;
  }

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(---background);
  }
`

-webkit-font-smoothing: antialiased;  => remove o serrilhamento das fontes.

1 REM = tamanho do font-size da página, ou seja:

font-size = 16px -> 1rem = 16px

Criação de acessibilidade na página:

 html {
    @media (max-width: 1080px){
      font-size: 93.75%;
    }

    @media (max-width: 720px){
      font-size: 87.5%;
    }
  }

Isso faz com que as fontes se adaptem para a tela do usuário e também possa deixar o uso das REM's no futuro mais simples. Se utiliza em percentagem justamente para se adaptar as configurações já dispostas no dispositivo do usuário, assim adaptando a cada um.

Tudo que estiver desabilitado na página pode ser configurado utilizando a seguinte tag:

[disabled]{
    opacity: 0.5;
    cursor: not-allowed;
  }

-------------------------------------------------------------------------------------------
Aula 05 - Fontes do Google Fonts

Os preconnect's coloca-se no incio de tudo no index.html

<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    .
    .
    .

O input, textarea e o button por padrão não importam a font do body, por isso tem explicitar na configuração.

-------------------------------------------------------------------------------------------
Aula 06 - Componente: Header

Para ter um resultado melhor, cria-se primeiro o esqueleto do componente para depois estiliza-lo.

É possível de forma sucinta analisar um layout e dele tirar quantas, div's terá, button e etc. Então é sempre bom analisar o layout que estamos trabalhando para saber como construir a nossa estrutura.

A tag filter cria um filtro em aul elemento e aplica uma interação, normalmente se utiliza em botões, nesse caso quando o mouse passar por cima vai aplicar esse filtro, que é um escurecimento no botão de 0.9 e o transition faz uma transição entre o estado atual e o futuro.

transition: filter 0.2s;

&:hover {
      filter: brightness(0.9)
    }

-------------------------------------------------------------------------------------------
Aula 07 - Componente: Summary

Para estilização de containers lado a lado, pode-se utilizar tanto o grid quanto o flex, mas o grid é melhor.
Repete as colunas 3 vezes com 1 de espaçamento.

grid-template-columns: repeat(3, 1fr);

o repeat(quantidades_de_vezes_para_repetir, colunasfr) serve para repetir um conteúdo uma determinada vez

-------------------------------------------------------------------------------------------
Aula 08 - Componente: TransactionsTable

border-spacing: 0 0 0.5rem; => cria uma espaçamento entre os itens de uma tabela.

Configura o primeiro filho de um pai.

&.:first-child {

      }

-------------------------------------------------------------------------------------------
Aula 09 - Criando front-end sem back-end

Existem muitas ferramentas que podem simular uma back-end para continuar o desenvolvimento, elas nunca serão utilizadas para produção apenas teste e desenvolvimento como:

JsonServer => cria rotas baseadas em um db.json;
MirageJS => possui bancos de dados integrados, relacionamentos e etc;
MSW => Ele adiciona um funcionamento fictício para a camada de network;

-------------------------------------------------------------------------------------------
Aula 10 - Configurando MirageJS

yarn add miragejs

Foi colocado no componente de transação a rota para a api:

useEffect(() => {
    fetch('http://localhost:3000/api/transactions') => rota fictícia da API;
    .then(response => response.json())
    .then(data => console.log(data)) => ver se o resultado foi postado.
  }, [])

Futuramente quando o back-end ficar pronto pode-se mudar o endereço para o correto.

No index.jsx da aplicação, cria-se as rotas e também a importação do miragejs.

import { createServer } from 'miragejs'

createServer({
  routes(){
    this.namespace = 'api' => Cria a rota raiz da aplicação

    this.get('/transactions', () => { => Cria uma rota na aplicação que foi configurada anteriormente no useEffect.
      return [
        {
          id: 1,                   |
          title: 'Transaction 1',  |
          amount: 400,             |
          type: 'Deposit',         | => conteúdo que vai ser exibido no array, quando a requisição for feita.
          category: 'Food',        |
          createdAt: new Date()    |
        }
      ]
    })
  }
})

Se aparecer código 200 no console o retorno foi um sucesso.

-------------------------------------------------------------------------------------------
Aula 10 - Configurando cliente do Axios
O fetch não será utilizado para fazer a sincronização com a rota e sim o Axios, já que é uma biblioteca especializada nisso.

yarn add axios

Para configurar o axios cria uma pasta no src chamada de services. O services ele possui o intuito de ser um serviço de dados ou seja onde se pode buscar dados, enviar dados e fazer todo esse processo.
A criação da API base será assim:

import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:3000/api', => url padrão de todas as requisições.
})

logo após eu volto no meu TransactionsTable e altero o useEffect:

useEffect(() => {
    api.get('/transactions')
    .then(response => console.log(response.data))
  }, [])

Ao invés de ser fetch, agora se torna api.get() porque eu estou pegando o conteúdo da requisição e também não será mais necessário fazer a requisição de mudança para json.

-------------------------------------------------------------------------------------------
Aula 11 - Configurando modal de criação
Documentação react-modal: <https://github.com/reactjs/react-modal>

Para instalar a biblioteca do modal se utiliza:

yarn add react-modal

yarn @types/react-modal -D

O primeiro passo para a configuração de um modal é saber qual botão será clicado para a abertura dele. No caso da aplicação desse módulo é a de Nova Transação.
Para a configuração de um modal primeiro cria-se uma constante para ver se o modal está aberto ou fechado;
Após cria-se uma função para mudar o valor de abertura do modal para true;
Após cria-se uma função para mudar o valor de fechamento do modal para false;
É necessário um botão que executará o openModal.
E por ultimo o modal configurado a baixo do botão onde ficará os estados e propriedades do modal como o isOpen e etc.

Ex de configuração básica do modal:

import { useState } from 'react'
import Modal from 'react-modal'
import logoImg from '../../assets/logo.svg'

import { Container, Content } from './styles'

export function Header() {
  
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal(){
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal(){
    setIsNewTransactionModalOpen(false)
  }

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dtmoney" />
        <button type="button" onClick={handleOpenNewTransactionModal}>
          Nova Transação
        </button>
        <Modal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
        >
          <h2>Cadastrar informação</h2>
        </Modal>
      </Content>
    </Container>
  )
}

Para ficar mais semantico o modal faz parte do app, então será necessário fazer a migração do conteúdo do modal para a o App.tsx
todas as funções e o modal serão migrados exeto o button que continuará no componente Header, já que a ação de aberdura é no cabeçalho mas o conteúdo do modal semanticamente faz parte do app. Após isso para conseguir pegar o conteúdo do botão clicado no Header usa-se as props para passar isso para o modal no app.tsx. O componente header agora possúi uma tipagem:

**interface HeaderProps {
  onOpenNewTransactionModal: () => void
}**

export function Header(**{onOpenNewTransactionModal}: HeaderProps**) {

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dtmoney" />
        **<button type="button" onClick={onOpenNewTransactionModal}>**
          Nova Transação
        </button>
      </Content>
    </Container>
  )
}

E no App.tsx ficará configurado da seguinte maneira:

import Modal from 'react-modal'
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { useState } from "react";

import { GlobalStyle } from "./styles/global";

Modal.setAppElement('#root') => acessibilidade informando que o modal está por cima da div#root e não será possível interagir com ela no momento.

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal(){
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal(){
    setIsNewTransactionModalOpen(false)
  }
  
  return (
    <>
      **<Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>** => Pegando a props do Header e passando para a função de abertura

      <Dashboard />

      <Modal 
        isOpen={isNewTransactionModalOpen} 
        onRequestClose={handleCloseNewTransactionModal}
        >
          <h2>Cadastrar informação</h2>
      </Modal>

      <GlobalStyle />
      
    </>
  );
}

-------------------------------------------------------------------------------------------
Aula 12 - Componente: NewTransactionModal

Como será muitas informações dentro do html do modal é melhor transformar ele em um componente da aplicação porque além disso no futuro pode-se utiliza-lo em outras partes do site. Para isso eu preciso tipar o Modal para passar o conteúdo dele para o app em forma de Componente.

import Modal from 'react-modal'

**interface NewTransactionModalProps {
  isOpen: boolean,
  onRequestClose: () => void,
}**

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
  return (

    <Modal 
        **isOpen={isOpen}**
        **onRequestClose={onRequestClose}**
        >
          <h2>Cadastrar informação</h2>
    </Modal>

  )
}

E no componente já importado no App.tsx é necessário passar as propriedades com o nome das devidadas funções.

<NewTransactionModal
        **isOpen={isNewTransactionModalOpen}**
        **onRequestClose={handleCloseNewTransactionModal}**
/>

-------------------------------------------------------------------------------------------
Aula 13 - Estrutura do formulário
Documentação react-modal: <https://github.com/reactjs/react-modal>

É possivel estilizar um modal na sua propriedade, por classe ou por classes novas(criadas pelo desenvolvedor) que será a utilizada e ficara da seguinte forma:

<Modal
  **overlayClassName="react-modal-overlay"**
  **className="react-modal-content"**
>
  
</Modal>

Como a estilização do modal se repete em toda a aplicação, será colocado a estilização do mesmo no global.ts.

-------------------------------------------------------------------------------------------
Aula 14 - Estilizando o Modal

Criado a estilização do modal

-------------------------------------------------------------------------------------------
Aula 15 - Criando botões de Tipo

Com os botões de entrada e saida vão possuir uma configuração propria é necessario criar um componente de estilização deles.

Para estilziar um botão que não sejá capaz de aceitar o filter usa-se funções já que estamos trabalhando com styled-components. Uma biblioteca boa para isso é a polished:

yarn add polished

É necessário importar oque será usado onde está o styled-components:

import styled from "styled-components";
**import { darken } from 'polished'**

Um exemplo de usabilidade é:

&:hover {
      border-color: **${darken(0.1, '#d7d7d7')};**
}

Utilizando interpolação pode-se configurar um elemento usando alguma função da bilbioteca polished.

-------------------------------------------------------------------------------------------
Aula 16 - Funcionamento dos Botões

Sempre que for armazenar um clique de um usuário em um botão ou num input, usa-se um useState()

Para conseguir configurar a alteração dos botões pode se utilizar o proprio styled-components para fazer.
É necessário primeiro transformar os botões em um componente do styled-components:

export const RadioBox = styled.button**<RadioBoxProps>**` => Propiedade tipada.
  height: 4rem;
  border: 1px solid #d7d7d7;
  border-radius: 0.25rem;

  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: border-color 0.2s;

  &:hover {
    border-color: ${darken(0.1, '#d7d7d7')};
  }

  img {
    width: 20px;
    height: 20px;
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: var(--text-title);
  }
`

Depois se altera os botões de button para o nome do componente:

<TransactionTypeContainer>
  **<RadioBox**
    type="button"
    onClick={() => {setType('deposit')}}
    isActive={type === 'deposit'}
    >
    <img src={incomeIgm} alt="Entrada" />
    <span>Entrada</span>
  **</RadioBox>**

  **<RadioBox**
    type="button"
    onClick={() => {setType('withdraw')}}
    isActive={type === 'withdraw'}
  >
    <img src={outcomeImg} alt="Saída" />
    <span>Saída</span>
  **</RadioBox>**
</TransactionTypeContainer>
  
Após isso tipasse o botão para poder reber as propriedade isActive, que vai ser responsavel pela alternancia entre das colorações:

interface RadioBoxProps {
  isActive: boolean,
}

Toda vez que for passado uma função no styled-components ela vai ser chamada automaticamente EX:

background: ${(props) => props.isActive ? '#ccc' : 'transparent'};

Agora a mudança de cor do botão vai ser alterado quando o usuário clicar nele, porém por padrão é o deposit que está selecionado.

-------------------------------------------------------------------------------------------
Aula 16 - Cores dos botões
O JavaScript não identifica váriaveis css no styled-components por isso coloca-se as cores em hexadecimal CASO foi utilizar em alguma função do styled-components.

Para mudar a coloração para verde(Entrada) e vermelho(Saída) é preciso assim como anteriormente criar uma classe no button componentizado.
Nesse caso foi criado o activeColor="green" e activeColor="red" para cada um dos botões.
Com isso foi adicionado na tipagem anterior mais uma propríedade:

interface RadioBoxProps {
  isActive: boolean,
  **activeColor: 'green' | 'red',**
}

O botão pode ter o valor green ou red.

Após isso cria-se uma nova constante onde ocorrerá o armazenamento das cores:

const colors = {
  green: '#33CC95',
  red: '#E52E4D'
}

E é alterado o valor anterio que existia na função (#ccc) para uma condicional.

background: ${(props) => props.isActive
    ? transparentize(0.9, colors[props.activeColor]) => transparentize é uma biblioteca interna do polished para adicionar transparencia
    : 'transparent'};

-------------------------------------------------------------------------------------------
Aula 17 - Salvando dados do form

Por padrão os formulário sempre atualizam a página quando fazem o envio de um formulário, para evitar esse "problema" do html pode-se tipar o *event* do submit de um formulário para apontar a uma direção.

function handleCreateNewTransaction(event: FormEvent){
    event.preventDefault()

Uma das formas de se pegar um conteúdo do formulario para enviar a api é criando um estado em cada um com o seu devido tipo:

const [title, setTitle] = useState('')
const [value, setValue] = useState(0)
const [category, setCategory] = useState('')

E em cada input deve-se configurar um:

value={title} => nome do estado criado.
onChange={event => setTitle(event.target.value)} => evento para pegar o valor que foi colocado no input e armazenando no estado setedado.

um event.target.value sempre retorna uma string. Para contornar esse problema existem algumas formas:

value={number}
onChange={event => setNumber(+event.target.value)} => adicionando um + na frente do event.

ou

value={number}
onChange={event => setNumber(Number(event.target.value))}

-------------------------------------------------------------------------------------------
Aula 18 - Inserindo transação na API

Para fazer uma inserção usa-se o metódo post()

Deve-se criar uma rota de post no miraje onde vão passar os dados.

this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody) => pega os dados e passa para JSON.
    })

request = requisição feita
schema = banco de dados

Rota 201 = sucesso

Para integrar as rotas de post e get da api usa-se o bacndo de dados do mirage (APENAS DESENVOLVIMENTO)

createServer({

  models:{
    transaction: Model,
  },

  routes(){
    this.namespace = 'api'

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data) 
    })
  }
})

-------------------------------------------------------------------------------------------
Aula 19 - Listando transações e seeds
É possível deixar um valor "default" para ser mostrado no backend trazendo para o front

seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance Web',
          type: 'deposit',
          category: 'Dev',
          amount: 8000,
          createdAt: new Date('2021 - 02 - 12 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1500,
          createdAt: new Date('2021 - 02 - 17 09:00:00'),
        }
      ]
    })
  },

Para colocar isso em tela é necessário criar um estado para armazenar o conteúdo e setar um novo conteúdo:

const [transaction, setTransaction] = useState([]) => como vai retornar uma array de objeto coloca-se no useState um array.

Depois se configura o event listerner do useEffect.

useEffect(() => {
    api.get('/transactions')
    .then(response => *setTransaction(response.data)*)
  }, [])

Toda vez que se utiliza um map no react, o primeiro elemento do map deve ter uma key={} para ser referencia para percorrer toda a array.

-------------------------------------------------------------------------------------------
Aula 19 - Formatando valores

para fazer formatações utiliza-se um recurso dos brwosers de hoje que é o INTL.

Conversão para real:

<td className={transaction.type}>{new Intl.NumberFormat('pt-BR', {
  style:'currency',
  currency: 'BRL',
}).format(transaction.amount)}</td>

Conversão para data:

<td>{new Intl.DateTimeFormat('pt-BR').format(
      new Date(transaction.createdAt)
)}</td>

-------------------------------------------------------------------------------------------
Aula 19 - A Context API no React

Quando se cria um contexto no react toda a plicação pode acessalo, mas para que todos os componentes da aplicação tenham acesso precisamos colocar em volta desses componentes um Provider.

return (
    <TransactionsContext.Provider value={[]}> => O provider obrigatoriamente precisa receber um value como atributo.
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>

      <Dashboard />

      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      /> 

      <GlobalStyle />
      
    </TransactionsContext.Provider>
  );

Existem 2 formas de se consumir um dado da ContextAPI
1- Usando renderProps, ao invés de se passar um componente passa-se uma função:

<TransactionsContext.Consumer>
  {(data) => {
  return (
      <ul>

      </ul>
    )
   }}
</TransactionsContext.Consumer>

2- useContext:

const data = useContext(TransactionsContext)

Quando ocorre uma mudança no valor da api de contexto vai ser alterado algum valor no local onde está sendo utilizado o useContext.

-------------------------------------------------------------------------------------------
Aula 20 - Carregando transações

interface TransactionsProviderProps {
  children: ReactNode, => propriedade do react para informar que será retornarno conteúdo react e tags.
}

export const TransactionsContext = createContext<Transaction[]>([]) => recebendo a tipagem como propriedade para armazenamento de array.

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('/transactions')
    .then(response => setTransactions(response.data.transactions))
  }, [])

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  )
}

Tipando uma children para o componente poder receber todos os outros componentes como filhos no app.

Depois de tipar pode-se utilizar o contexto apenas passando o useContext onde será utilizado:

const transactions = useContext(TransactionsContext)

o transactions vai armazenar o conteúdo existente no context e alimentar o componente que ele está.

-------------------------------------------------------------------------------------------
Aula 21 - Movendo criação para o context

interface Transaction {
  id: number,
  title: string,
  amount: number,
  type: string,
  category: string,
  createdAt: string,
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'> => recebe todo o conteúdo do Transaction menos o id e o createdAte, porque está sendo omitido.

Omit => omite os campos escolhidos na selação da tipagem herdada;
Pick => seleciona os campos escolhidos na tipagem herdada;

interface TransactionContextData {
  transactions: Transaction[],
  createTransaction: (transaction: TransactionInput) => void
}

export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData => falando para o react que o TransactionsContext recebe um objeto e dentro desse objeto possui uma função e um parametro.
)

-------------------------------------------------------------------------------------------
Aula 21 - Finalizando inserção
Toda função ascincrona no javascript retorna uma promise.

Conceito de imutabilidade:

setTransactions([
      ...transactions,
      transaction,
    ])

Não está se alterando o valor e sim reescrevendo.

-------------------------------------------------------------------------------------------
Aula 22 - Calculando resumo
Toda vez que um valor do contexto for alterado vai mudar o valor do Summary

const totalDeposits = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'deposit') {
      return acc + transaction.amount
    }

    return acc 
}, 0)

<div>
  <header>
    <p>Entradas</p>
    <img src={incomeImg} alt="Entradas"/>
  </header>
  **<strong>{totalDeposits}</strong>**
</div>

algoritmio de calculo das transações:

const summary = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'deposit') {
      acc.deposits += transaction.amount
      acc.total += transaction.amount
    } else {
      acc.withdraws += transaction.amount
      acc.withdraws -= transaction.amount
    }

    return acc
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0,
  })

O reduce precisa que em toda alteração ele retorne um accumulator.

-------------------------------------------------------------------------------------------
Aula 22 - Criando hook
Um hook no react pode usar outros hooks.

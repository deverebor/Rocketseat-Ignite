# Fundamentos do ReactJS

Aula 01 - Criando estrutura do projeto

Bibliotecas instaladas nessa aula para o projeto:
react;
react-dom;

Primeira coisa que se faz em qualquer projeto que se utiliza JavaScript, sempre se inicializa o repositório criando o package.json existem algumas formas de se fazer isso são elas:

yarn init -y

ou

npm init -y

O package.json é onde se armazena as informações principais do projeto, ou seja dependências de terceiros, nome do projeto, versão, licença e etc.

Estrutura de pastas da aplicação:

src => Onde fica todo o código da aplicação.
puclic => Onde fica arquivos e assets que são acessados por meios externos da aplicação.

-------------------------------------------------------------------------------------------
Aula 02 - Configuração do Babel

Babel serve para converter o código para que todos os browsers e todo o ambiente da aplicação consiga entender todos os códigos.

Para instalar o babel na sua aplicação react se utiliza o seguinte comando:

yarn add @babel/core @babel/cli @babel/preset-env -D

O -D é para definir como dependência de desenvolvimento e o contúdo não estará disponível quando a aplicação for ao ar.

Após a instalação deve-se criar um arquivo chamado => babel.config.js onde será exportado as configurações do babel.

Para traduzir um arquivo se utiliza o seguinte comando:

yarn babel src/index.js -o dist/bundle.js => conversão padrão de um arquivo js para babel.

Primeiro se diz onde está o arquivo o "-o" significa o que será gerado na saída e por fim o diretório e nome do arquivo traduzido.

Para o Babel entender a arquitetura de código React é necessário instalar mais 1 biblioteca:

yarn add @babel/preset-react -D

Após se importa dentro do arquivo do babel.config.js

Com isso o Babel agora vai entender toda as importações de html dentro do js.
O babel configurado ficará da seguinte maneira:

module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ]
}
-------------------------------------------------------------------------------------------

Aula 03 - Configuração do Webpack

O Webpack manuseia o tratamento dos arquivos na minha aplicação para interpretação do browser.
Para instalar o Webpack se utiliza o seguinte comando:

yarn add webpack webpack-cli webpack-dev-server -D

para configurar se cria primeiro um arquivo no diretório raiz da aplicação:

webpack.config.js

dentro da sua configuração, se define o arquivo principal da aplicação dentro do *entry:* onde se configura o arquivo de entrada.

*Um jeito mais organizado de se puxar diretórios para configuração de arquivos é utilizando o path() já que de OS para OS as navegações entre arquivos são distintas.*

Após configurar o entry se configura o output, que será o arquivo de saída do resultado.

Também é necessário configurar o module:{} que será o local onde ficará os arquivos que passaram pela filtragem e convertidos para as devidas extensões, dentro do modules se cria o rules:[] um array odne será armazenado as regras de verificação dos arquivos utilizando o test: que recebe uma expressão regular para fazer a verificação do arquivo.

Sempre que eu quiser definir que irá terminar com algo se usa o *$* na configuração do test.

Para fazer a integração do babel e o webpack se utiliza uma biblioteca:

yarn add babel-loader -D

O webpack configurado ficará da seguinte maneira:

const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ],
  }
}

-------------------------------------------------------------------------------------------
Aula 04 - Estrutura do ReactJS

O render() é uma função que renderiza um elemento na tela. O primeiro parâmetro é o que será renderizado em tela e o segundo é dentro de qual elemento será renderizado a informação.

A partir da versão 17 do react não é mais necessário importar o react em todo o projeto, apenas onde será utilizado. Para resolver problemas de leitura se adiciona no babel uma configuração, ficará da seguinte forma:

module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', {
      runtime: 'automatic'
    }]
  ]
}

Transforma-se o preset em uma array de duas posições onde a primeira será o preset e a segunda posição o runtime, que definirá automaticamente a leitura do react.

-------------------------------------------------------------------------------------------
Aula 05 - Servindo HTML estático

Se caso ocorra a mudança do nome do arquivo de configuração 'bundle.js' ele não vai ser lido, então para resolver esse problema se utiliza um plugin do webpack para injetar essa configuração no html.

yarn add html-webpack-plugin -D

A configuração fica da seguinte forma:

const path = require('path')
**const HtmlWebpackPlugin = require('html-webpack-plugin')**

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  **plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ],**
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ],
  }
}

-------------------------------------------------------------------------------------------
Aula 06 - Webpack Dev Server

Como criar a automatização do webpack para que ele sempre execute um "fetch" no arquivo, sendo assim não será necessário fazer a todo momento um yarn webpack.

Para fazer isso basta ir ao arquivo de configuração do webpack e colocar os seguinte comando:

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  **devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },**
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ],
  }
}

agora basta colocar no console:

yarn webpack serve

-------------------------------------------------------------------------------------------
Aula 07 - Utilizando source maps

O source map nada mais é que uma forma de se visualizar o nosso código em desenvolvimento sem estár desorganizado ( como o bundle.js).

Se adiciona no arquivo de configuração do Webpack abaixo do mode:

module.exports = {
  mode: 'development',
  **devtool: 'eval-source-map',**
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ],
  }
}

Existem dois tipos de source maps o de desenvolvimento e o de produção.

-------------------------------------------------------------------------------------------
Aula 08 - Ambiente dev e produção

Para configurar o webpack sendo modo de desenvolvimento e produção se adiciona o seguinte comando na configuração do webpack dentro do module:

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
}

para criar o NODE_ENV deve-se instalar o pacote :

yarn add cross-env -D

Que vai servir para definir variáveis ambientes independente do OS da pessoa.

Se configura o package.json adicionando abaixo da license um script:

"scripts": {
    "dev": "webpack serve",
    "build": "cross-env NODE_ENV=production webpack"
  },

  -------------------------------------------------------------------------------------------
  Aula 09 - Importando arquivos CSS

Para o webpack entender as estilizações css é preciso configurar o webpack criando uma nova rule para os arquivos css.
Para fazer a leitura e transformar para uma forma que o browser entenda é necessário utilizar um loader de estilo, para isso se instala as seguintes bibliotecas.

yarn add style-loader css-loader -D

Logo após no arquivo de configuração do webpack se adiciona uma nova regra para os arquivos css:

{
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }

-------------------------------------------------------------------------------------------
Aula 10 - Utilizando SASS

Para utilizar o sass no react é necessário instalar primeiro suas dependências.

yarn add node-sass sass-loader -D

A configuração vai ser a mesma do CSS em relação ao webpack:

   {
        test: **/\.scss$/**,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', **'sass-loader'**]
      }

Ao invés de se criar uma nova regra para o webpack, basta somente alterar o compilador de css antigo, adicionando o .scss e seu loader 'sass-loader'.

--------------------------------------------------------------------------------------------
Aula 11 - Componente no React

Componente é tudo aquilo que compõe nosso app, como uma funcionalidade e etc. Os componentes sempre começam com a primeira letra maiúscula por exemplo App.tsx e NUNCA deve-se ter mais de um componente por arquivo. Quando algo se repete muitas vezes dentro da nossa aplicação é recomendado fazer um componente.

Para criar um componente cria-se a pasta componets dentro do src e lá guarda-se os componentes.

Para importar um componente para uma parte do app faz da seguinte maneira:

**import { RepositoryList } from './components/RepositoryList'**
import './styles/global.scss'

export function App() {
  return **<RepositoryList/>**
}

Assim é importado o contúdo do componente para a parte necessária do app.

Sempre que for necessário adicionar uma variável do JavaScript no React se usa por meio de interpolação ex:

<h1>{variavel}</h1>

Sempre que componentes destinos forem colocados em baixo um do outro existe uma regra que:

Componentes destinos precisam ter um componente pai em volta para poder existir lado a lado. E para resolver esse problema existem duas formas:

1- criar uma *div* em volta dos componentes (não é a melhor opção):

export function App() {
  return (
    <div>
      <RepositoryList/>
      <Counter />
    </div>
  )
}

ou

2- Utilizar Fragment ou tag vazia (melhor opção):

export function App() {
  return (
    <>
      <RepositoryList/>
      <Counter />
    </>
  )
}

--------------------------------------------------------------------------------------------
Aula 12 - Propriedades no React

As propriedades no react funcionam da mesma maneira que atributos no HTML são informações que pode ser passada para um componente funcionar de forma diferente EX:

<a **href="link"**>Hello World</a> <= HTML

 <Route **path="/" exact component={Home}**/> <= React

 Quando se retorna muitos atributos no return usa-se o () se for pouco, pode-se colocar na mesma linha.

 O conceito de componente no React é: É enviar uma informação do componente pai para o filho, ou seja enviar uma propriedade para seu filho.

 para fazer isso passa-se como parâmetro da minha função pai o props, ex:

 export function RepositoryItem(props) {
  return (
    <li>
      <strong>{props.repository ?? 'Default'}</strong>
      <p>Forms in React</p>

      <a href="">Acessar Repositório</a>
    </li>
  );
}

**O "**??**'Default' " é para se caso um elemento dentro da minha propriedade esteja vazio, ele vai receber um nome e esse nome é Default.**

E no filho passa-se a propriedade:

import { RepositoryItem } from "./RepositoryItem"

export function RepositoryList () {
  return (
    <section className="repository-list">
      <h1>Lista de Repositórios</h1>

      <ul>
      <RepositoryItem repository="unform2"/>
      <RepositoryItem />
      <RepositoryItem />
      <RepositoryItem />
      </ul>
    </section>
  )
}

--------------------------------------------------------------------------------------------
Aula 13 - Estado do componente

São variáveis que o react monitora e quando ha uma mudança ela causa um efeito.

Para fazer isso usa-se um hooke do react o **useState()** que é importado da biblioteca do react.

O useState retorna um array de duas posições onde é configurado os estados do componente em questão e quando vai ser usado. Ex:

import { useState } from "react"

export function Counter() {
  const [counter, setCounter] = useState(0)

  function increment() {
    setCounter(counter + 1)
  }

  return (
    <div>
      <h2>{counter}</h2>
      <button type="button" onClick={increment}>
      Increment
      </button>
    </div>
  )
}

--------------------------------------------------------------------------------------------
Aula 14 - A imutabilidade no React (useState)

Quando uma variável é classificada como imutável não é possível alterar o conteúdo dessa variável mas sim dar um novo valor a ela. Ex:

usuarios = ['lucas', 'souza', 'pereira']

novoUsuario = [...usuarios, 'wilson']

--------------------------------------------------------------------------------------------
Aula 15 - Fast Refresh no Webpack

O fast refresh serve é um plugin que serve para atualizar o conteúdo da página salvando em cache. Para instalar usa-se o seguinte comando:

yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh

Após a instalação se configura o react-refresh no webpack.

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin react-refresh')

e o adiciona na parte de plugins do webpack:

plugins: [
    **isDevelopment && new ReactRefreshWebpackPlugin(),**
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ]**.filter(Boolean)**,

Como o refresh é utilizado somente em desenvolvimento usa-se uma operador ternário de verificação se ele é Dev ou não. Mas isso causaria um problema que seria o retorno false, caso o usuário não seja um dev sendo assim quebraria a aplicação, por isso que é adicionado o .filter() no fim do array, filtrando o resultado boobleano e dessa forma não será armazenado na aplicação.

A mesma alteração deve ser feita no modulo, ficando da seguinte maneira:

 module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        }
      },

Usa-se um objeto e dentro desse objeto tem o loader e as opções do plugin. Que cria-se uma condição onde se for Dev vai pedir o requerimento para o refresh.

Por fim é necessário adicionar uma configuração do plugin no servidor Dev:

devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
  },

--------------------------------------------------------------------------------------------
  Aula 16 - Estilização da listagem

Criado a estilização da parte de listagem da aplicação.

li {
      margin-bottom: 20px;

      &:last-child {
        margin: 0;
      }
    }

o &:last-child é para modificar o ultimo filho do li, tirando a sua margem. Também é possível fazer de outra forma:

li {
      & + li {
        margin-top: 20px;
      }

Todo li seguido de outro li vai ter uma margem em cima de 20px.

--------------------------------------------------------------------------------------------
Aula 17 - Utilizando o useEffect e useState.

A estrutura básica de um useState é : useState([])

O useEffect é um hook que dispara uma função quando algo acontecer na aplicação.

A estrutura básica do useEffect é useEffect(() => {}, [])

O useEffect recebe 2 parâmetros:

1- () => {}:
Qual função será executada e quando será executada.

2- []:
a variável que vai receber a mudança, ou seja a dependência.

Se o array de dependência for passado vazio a função será executada apenas uma única vez.

IMPORTANTE: caso o useEffect sejá executado sem passar a sua dependência ele ficara em looping executando a função infinitamente.

Para fazer a alimentação de uma API na minha aplicação na maioria das vezes se utilizará o useEffect, um exemplo é a alimentação da API do GitHub na minha aplicação:

useEffect(() => {
    fetch('https://api.github.com/users/deverebor/repos') => conectando-se com a API.
    .then(response => response.json()) => transformando a resposta dessa conexão em um JSON.
    .then(data => console.log(data)) => mostrando esses dados no console para debuggar.
  }, [repositories])

--------------------------------------------------------------------------------------------
  Aula 18 - Listando repositórios

Toda vez que uma informação está armazenada no vetor e que será distribuído para cada elemento especifico faz da seguinte maneira no JSX:

1- Maneira "errada"
 <ul>
      {repositories.forEach()}
      <RepositoryItem repository={repository} />
      <RepositoryItem repository={repository} />
      <RepositoryItem repository={repository} />
      <RepositoryItem repository={repository} />
      </ul>

2- Maneira correta
 <ul>
      {repositories.map(repository => {
        <RepositoryItem repository={repository} />
      })}

  </ul>

Ao contrario do forEach o map vai percorrer todo o meu array e me retornar um valor especifico.

Existem duas formas de se catalogar um dado dentro da array usando o map.()

1-

 <ul>
      {repositories.map(repository => {
       return <RepositoryItem repository={repository} />
      })}

  </ul>

2-
 <ul>
      {repositories.map(repository => (
        <RepositoryItem repository={repository} />
      ))}

  </ul>

Quando o retorno é somente 1 elemento pode-se fazer da mesma linha:

 <ul>
      {repositories.map(repository => <RepositoryItem repository={repository} />)}

  </ul>

Quando se usa um map() deve-se definir uma chave "key={}" ajudando acaso haja uma mudança de local.

--------------------------------------------------------------------------------------------
Aula 19 - Fundamentos do TypeScript

Os tipos são sempre definidos por letra maiúsculas ex:

type **User** = {
  name: string,
  email: string,
  address: {
    city: string,
    state?: string, => a "?" define que o elemento pode ter um valor ou não.
  }
}

O TypeScript é utilizado para tipar variáveis assim tornando mais explicito os seus valores.

Para se usar a tipagaem feita a cima é da seguinte maneira:

type **User** = {
  name: string,
  email: string,
  address: {
    city: string,
    state?: string, => a "?" define que o elemento pode ter um valor ou não.
  }
}

function showWellcomeMesseger(**user: User**) {
  return `Wellcome ${user.name}, your email is ${user.email}. Your city is ${user.city} and you state is ${user.state}`
}

showWellcomeMesseger({
  name: 'Lucas Souza',
  email: 'lucas@souza.com',
  address: {
    city: 'Salvador',
    state: 'BA',
  }
})

A tipagem é passada como parametro da função e na mesma é definida como user, ou seja, a tipagem User se tornou user e todo o atributo é passado para ela, assim podendo ser utilizado pela template string no nosso "return".

--------------------------------------------------------------------------------------------
Aula 20 - TypeScript no ReactJS

Primeiro se instala o TypeScript no projeto:

yarn add typescript -D

yarn add @types/react-dom -D

yarn add @types/react -D

logo ápos usa-se:

yarn tsc --init

Para inicializar o typescript na aplicação.

**Para selecionar todos os elementos iguais no vscode se usa o cntrl+shift+L**

Logo quando se utiliza o --init será criado um arquivo de configuração do typescript e por padrão toda aplicação React utiliza a configuração abaixo:

{
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ESNext"], => Diz que será utilizado o DOM
    "allowJs": true, => permite arquvios JS na aplicação.
    "jsx": "react-jsx", => JavaScript no React
    "noEmit": true, => Caso execulte o build da aplicação não emitir o código dela.
    "strict": true, => Entrar no modo strict do JavaScript.
    "moduleResolution": "node", => o modulo da aplicação é node
    "resolveJsonModule": true, => importar arquivos json
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"] => onde o código da aplicação se encontra.
}

Para fazer o Babel interpretar o TypeScript usa-se a biblioteca:

yarn add @babel/preset-typescript -

Em seguida se configura no babel.config o novo interpretador:

module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    ['@babel/preset-react', {
      runtime: 'automatic'
    }]
  ]
}

E no webpack se configura da seguinte maneira:

 rules: [
      {
        test: /\.(j|t)sx$/, => será JSX ou TSX
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],

--------------------------------------------------------------------------------------------
Aula 21 - Componentes com TypeScript

Quando se definie uma propriedade no TypeScript é necessário tipar ela.

Quando se tipa uma propriedade de função repete o nome dela e adiciona Props no final.

Oque será tipado dentro de uma variavel cosumida de uma API deve ser somente o conteúdo que será utilizado na aplicação e não tudo.

[RepositoryList => Linha 6] => não vai o Props no final porque não é uma propriedade e sim um estado.

o <> depois do useState diz qual é o tipo daquele estado, que foi tipado anteriormente isso é chamado de generic.

const [repositories, setRepositories] = useState<Repository[]>([])

Coloca-se um array depois do nome da tipagem se ela receber uma lista de alguma coisa.

--------------------------------------------------------------------------------------------
Aula 22 - Utilizando React DevTools

extensões React DevTools para debuggar.

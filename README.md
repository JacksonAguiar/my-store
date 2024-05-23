# My Store - README

## Visão Geral do Projeto

Este projeto consiste no desenvolvimento de uma mini loja virtual que permite aos clientes realizar login, visualizar um catálogo de produtos, adicionar produtos ao carrinho, finalizar compras, ver o histórico de compras e gerenciar produtos. O sistema é composto por um backend desenvolvido em Node.js com TypeScript, utilizando MongoDB e Mongoose, seguindo a arquitetura Domain-Driven Design (DDD). O frontend é desenvolvido em React.js, seguindo a arquitetura React Pattern.

OBS.: O arquivo .env foi submetido para fins de teste.

## Funcionalidades

### Cliente

- **Login**: Permite ao cliente realizar login na plataforma.
- **Catálogo de Produtos**: Visualizar todos os produtos disponíveis na loja.
- **Carrinho de Compras**: Adicionar produtos ao carrinho e finalizar a compra.
- **Finalização da Compra**: Escolher formas de pagamento (simulação de cartão de crédito, PIX e boleto).
- **Histórico de Compras**: Visualizar o histórico de compras realizadas.

### Administrador

- **Cadastro de Produtos**: Cadastrar novos produtos no sistema.
- **Gerenciamento de Produtos**: Listar e editar produtos existentes.
- **Histórico de Compras**: Visualizar o histórico de todas as compras realizadas na loja.

## Arquitetura e Estrutura do Projeto

### Backend

- **Linguagem**: Node.js com TypeScript
- **Banco de Dados**: MongoDB utilizando Mongoose
- **Arquitetura**: Domain-Driven Design (DDD)

#### Design pattern

- `src/`
  - `domain/`: Contém as entidades e repositórios.
  - `application/`: Contém os casos de uso e serviços de aplicação.
  - `infra/`: Configuração do banco de dados, modelos Mongoose, e implementação dos repositórios.
  - `web/`: Controladores e rotas.

## Motivo para Escolha de Domain-Driven Design (DDD)

1. **Separação de Responsabilidades**:

   - DDD promove uma clara separação entre os diferentes domínios do sistema, facilitando a manutenção e evolução do código.
   - Ajuda a manter o código organizado, dividindo a lógica de negócios em camadas bem definidas (Domínio, Aplicação, Infraestrutura, e Web(comunicação com o exterior)).

2. **Foco na Lógica de Negócios**:

   - DDD coloca a lógica de negócios no centro do desenvolvimento, garantindo que as regras e processos da aplicação sejam corretamente implementados e mantidos.
   - Facilita a comunicação com stakeholders, utilizando uma linguagem ubíqua que reflete diretamente os conceitos do domínio.

3. **Facilidade de Testes**:

   - Apesar de não ter a imeplementação dos testes-unitarios, a modularidade e a clara separação de responsabilidades proporcionadas pelo DDD tornam o código mais testável, permitindo a criação de testes unitários e de integração mais eficazes.

4. **Escalabilidade e Flexibilidade**:

   - DDD permite que o sistema seja facilmente escalável e adaptável a mudanças futuras no domínio de negócios, pois cada módulo pode ser desenvolvido e modificado de forma independente.
   - A arquitetura modular facilita a integração com outros sistemas e serviços, promovendo a flexibilidade na escolha de tecnologias e frameworks.

5. **Manutenção e Evolução do Código**:
   - A organização em torno do domínio de negócios facilita a manutenção do sistema, uma vez que alterações em uma parte do código não impactam negativamente outras partes.
   - Suporta a evolução contínua da aplicação, permitindo incorporar novas funcionalidades e adaptar-se a novas necessidades de negócios sem comprometer a estabilidade do sistema.
6. **Documentação e Comunicação**:
   - O uso de "use-cases" na camada de application, servem como uma forma de documentação funcional do sistema, facilitando a comunicação entre desenvolvedores e stakeholders. E proporcionam um entendimento claro das funcionalidades do sistema e como elas são implementadas.

Em resumo, a escolha por Domain-Driven Design (DDD) foi feita para garantir um desenvolvimento robusto, escalável e centrado nas necessidades de negócios, facilitando a comunicação, manutenção e evolução contínua do sistema.

### Frontend

- **Linguagem**: JavaScript com React.js
- **Estado Global**: ContextAPI
- **Arquitetura**: React Pattern

#### Design pattern
- `src/`
  - `components/`: Componentes reutilizáveis da interface.
  - `hooks/`: Implementação dos hooks da aplicação.
  - `pages/`: Páginas principais da aplicação (login, catálogo, carrinho, histórico, etc).
  - `services/`: Serviços para comunicação com a API.
  - `types/`: Interfaces da aplicação.
  - `utils/`: Funções utilitárias.

## Justificativa para a Arquitetura da Aplicação React Pattern HOC

**Legibilidade e Organização**:
- A separação clara de responsabilidades e a organização dos arquivos em diretórios específicos melhora a legibilidade e a navegabilidade do código.
- Desenvolvedores podem facilmente localizar e entender diferentes partes da aplicação, facilitando a colaboração e a manutenção.
**Modularidade e Escalabilidade**:
- Uma estrutura modular permite que a aplicação seja escalável, com novos componentes, hooks, serviços e páginas sendo adicionados sem comprometer a organização do projeto.
- Facilita a reutilização de código e a implementação de novas funcionalidades de forma incremental e controlada.
  **Facilidade de Testes**:
- Organizar o código em componentes, hooks, serviços e utilitários separados facilita a criação de testes unitários e de integração, melhorando a cobertura de testes e a qualidade do código.
  **Manutenção e Evolução**:
- Uma estrutura bem organizada facilita a manutenção e a evolução contínua da aplicação, permitindo que melhorias e correções sejam implementadas de forma eficiente e com menor risco de introdução de erros.

# Configuração e Execução

### Requisitos

- **Docker**: Para execução dos containers.
- **Node.js**: Versão 14 ou superior.
- **MongoDB**: Pode ser executado localmente ou utilizando um serviço de hospedagem.

### Instruções para Execução

1. **Clone o repositório**:
   ```sh
   git clone https://github.com/JacksonAguiar/my-store 
   cd my-store
   ```
2. **Configuração do Backend**:
   - **Instale as dependências**:
     ```sh
     cd backend
     npm install
     ```
   - **Configuração das variáveis de ambiente**:
     Crie um arquivo `.env` na raiz do diretório `backend` com as seguintes variáveis:
     ````sh
     DATABASE_URL=<sua-string-de-conexao-do-mongodb>
     JWT_SECRET=<sua-chave-secreta-jwt>
     ````
   - **Execução**:
     ````sh
     npm run dev
     ````
3. **Configuração do Frontend**:
   - **Instale as dependências**:
     ```sh
     cd frontend
     npm install
     ```
   - **Configuração das variáveis de ambiente**:
     Crie um arquivo `.env` na raiz do diretório `frontend` com as seguintes variáveis:
     ```env
     REACT_APP_BACKEND_URL=http://localhost:4000/
     ```
    - **Execução**:
     ````sh
     npm run start
     ````

4. **Executar a aplicação com Docker Compose**:
   ```sh
   docker-compose up
   ```
5. **Acessar a aplicação**:
   - O frontend estará disponível em `http://localhost:3000`
   - O backend estará disponível em `http://localhost:4000`

## Documentação Adicional

- **User Stories**: Detalhamento das histórias de usuário desenvolvidas (disponível no arquivo `UserStories.docx`).
- **Evidências de Funcionamento**: Video: https://drive.google.com/file/d/1C61Tzus_kN7zAuysw2b7TtlbH0OVYQLq/view?usp=sharing.
- **Código Fonte**: Disponível no repositório GitHub (link fornecido).

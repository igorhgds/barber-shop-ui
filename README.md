# Frontend: Barber Shop UI

Esta é uma interface SPA (Single Page Application) desenvolvida em Angular para o gerenciamento reativo de uma barbearia. O projeto foca em uma experiência de usuário fluida, permitindo o agendamento de serviços e o cadastro de clientes com validações em tempo real.

### 🔗 Repositórios do Projeto
* **Frontend (Esta Interface):** [https://github.com/igorhgds/barber-shop-ui](https://github.com/igorhgds/barber-shop-ui)
* **Backend (API):** [https://github.com/igorhgds/barber-shop-api](https://github.com/igorhgds/barber-shop-api)

## 📸 Demonstração das Telas

| Agendamentos | Cadastro de Clientes | Listagem de Clientes |
| :--- | :--- | :--- |
| ![Agendamentos](https://raw.githubusercontent.com/igorhgds/barber-shop-ui/main/src/images/agendamentos.png) | ![Cadastro](https://raw.githubusercontent.com/igorhgds/barber-shop-ui/main/src/images/cadastrar-cliente.png) | ![Listagem](https://raw.githubusercontent.com/igorhgds/barber-shop-ui/main/src/images/listar-clientes.png) |

## Arquitetura
O frontend utiliza **Angular 21** com uma arquitetura baseada em componentes. A comunicação entre componentes segue o padrão de fluxo de dados Unidirecional: o componente pai (`SchedulesMonth`) gerencia o estado e as chamadas HTTP, enquanto os componentes filhos utilizam `@Input` e `@Output` para exibição e emissão de eventos.

## Principais Responsabilidades
* **Controle de Agenda:** Implementa lógica de seleção de horários travada em intervalos de 60 minutos para otimização da agenda.
* **Cálculo Automático:** Define o horário de término automaticamente (+1h) ao selecionar o início, impedindo conflitos manuais na interface.
* **Sincronização com Backend:** Garante que a lista de agendamentos seja atualizada apenas após a confirmação de sucesso do servidor, evitando "dados fantasma" em caso de erro.
* **Feedback Reativo:** Uso de `MatSnackBar` para exibir mensagens de erro personalizadas vindas da API (Ex: Horário ocupado).

## Tecnologias Utilizadas
* **Angular 21**
* **Angular Material:** Componentes de calendário, seletores de tempo e tabelas.
* **RxJS:** Para gerenciamento de fluxos assíncronos e subscrições.
* **SCSS:** Estilização avançada com foco em layouts responsivos e centralizados.
* **Ngx-Mask:** Para formatação de campos de celular e documentos.

## Pré-requisitos
* Node.js (Versão LTS).
* Angular CLI instalado globalmente.
* Docker e Docker Compose (para execução containerizada).

## Como Executar

### 1. Ambiente Completo com Docker Compose
Esta abordagem sobe o frontend e o backend simultaneamente.

1.  Na raiz do projeto (onde está o `docker-compose.yml`), execute:
    ```bash
    docker-compose up --build -d
    ```
2.  Acesse a aplicação em `http://localhost:4200`.

### 2. Ambiente de Desenvolvimento Local
Ideal para modificações rápidas e uso do live-reload.

1.  **Instale as dependências**:
    ```bash
    npm install
    ```
2.  **Configure o endpoint da API** em `src/environments/environment.ts` para apontar para `http://localhost:8080`.
3.  **Inicie o servidor de desenvolvimento**:
    ```bash
    ng serve
    ```
4.  Acesse `http://localhost:4200` no seu navegador.

## Regras de Interface Implementadas

| Recurso | Descrição |
| :--- | :--- |
| **Intervalo de Horário** | Seletor restrito a horas cheias (Ex: 08:00, 09:00). |
| **Trava de Término** | Campo de término é `readonly` e calculado via código. |
| **Validação de Formulário** | Botão de salvar habilitado apenas com formulário 100% válido. |
| **Tratamento de Erros** | Captura automática de mensagens de negócio do backend. |

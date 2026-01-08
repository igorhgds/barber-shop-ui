# API: Barber Shop

Esta API é o núcleo do sistema de gerenciamento de uma barbearia. Ela é responsável por gerenciar o cadastro de clientes e o fluxo de agendamentos, garantindo a integridade da agenda através de uma lógica rigorosa de validação para evitar sobreposições de horários.

### 🔗 Repositórios do Projeto
* **Backend (Esta API):** [https://github.com/igorhgds/barber-shop-api](https://github.com/igorhgds/barber-shop-api)
* **Frontend (Interface):** [https://github.com/igorhgds/barber-shop-ui](https://github.com/igorhgds/barber-shop-ui)

## 📸 Visualização do Sistema
Abaixo, as telas principais que consomem os recursos desta API:

| Agendamentos | Cadastro de Clientes | Listagem de Clientes |
| :--- | :--- | :--- |
| ![Agendamentos](https://raw.githubusercontent.com/igorhgds/barber-shop-ui/main/src/images/agendamentos.png) | ![Cadastro](https://raw.githubusercontent.com/igorhgds/barber-shop-ui/main/src/images/cadastrar-cliente.png) | ![Listagem](https://raw.githubusercontent.com/igorhgds/barber-shop-ui/main/src/images/listar-clientes.png) |

## Arquitetura
A API segue o padrão **RESTful** com Spring Boot 3. A lógica de negócio é centralizada na camada de `Service`, utilizando um `QueryService` especializado para validar a disponibilidade de horários antes da persistência, garantindo que as regras de negócio sejam respeitadas independentemente das restrições do banco de dados.

## Principais Responsabilidades
* **Validação de Agenda:** Implementa lógica de interseção de intervalos para impedir agendamentos conflitantes no mesmo período.
* **Gestão de Clientes:** CRUD completo de clientes com restrições de unicidade para dados sensíveis como E-mail e Telefone.
* **Tratamento de Exceções:** Possui um manipulador global que traduz erros de negócio em respostas HTTP padronizadas (Ex: `ScheduleAlreadyUsedException`).

## Tecnologias Utilizadas
* **Java 21**
* **Spring Boot 3.x**
* **Spring Data JPA** (Hibernate)
* **Lombok & MapStruct:** Para redução de boilerplate e mapeamento eficiente de DTOs.
* **Postgres**
* **Docker & Docker Compose:** Para containerização do ambiente.

## Pré-requisitos
* JDK 21 ou superior.
* Docker e Docker Compose instalados.

## Como Executar

Existem duas formas principais de executar o projeto.

### 1. Ambiente Completo com Docker Compose
Esta abordagem sobe a API e a infraestrutura de banco de dados de forma containerizada.

1.  Na raiz do projeto, execute o comando:
    ```bash
    docker-compose up --build -d
    ```
2.  A API estará disponível em `http://localhost:8080`.

### 2. Ambiente Híbrido para Desenvolvimento Local
Ideal para quando você está desenvolvendo ativamente e quer usar o live-reload do Spring DevTools.

1.  **Suba apenas o banco de dados** via Docker:
    ```bash
    docker-compose up -d db
    ```
2.  **Execute a aplicação** diretamente pela sua IDE, rodando a classe principal `BarberShopApiApplication.java`.
3.  Certifique-se de que as configurações em `application.yml` apontam para os serviços na sua máquina local.

## Endpoints da API

| Verbo | Endpoint | Descrição |
| :---- | :------------ | :---------------------------------------- |
| `POST` | `/clients` | Cadastra um novo cliente. |
| `GET` | `/clients` | Lista todos os clientes cadastrados. |
| `POST` | `/schedules` | Cria um agendamento (Valida sobreposição). |
| `GET` | `/schedules/{year}/{month}` | Lista agendamentos por ano e mês. |

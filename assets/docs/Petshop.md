Sistema de Gestão para Petshop
Este é um projeto de API RESTful completo, desenvolvido com Java 17 e Spring Boot 3, para a gestão de um petshop. A aplicação segue as melhores práticas de desenvolvimento, como arquitetura em camadas, uso de DTOs, autenticação via JWT com Spring Security e documentação de API com Swagger.

Principais Tecnologias
Java 17: Versão LTS da linguagem.

Spring Boot 3: Framework principal para a criação da aplicação.

Spring Data JPA (Hibernate): Para persistência de dados e mapeamento objeto-relacional.

Spring Security: Para controle de autenticação e autorização de utilizadores.

MySQL/PostgreSQL: Banco de dados relacional.

Maven: Gestor de dependências e build do projeto.

Lombok: Para reduzir código boilerplate em entidades e DTOs.

Swagger (Springdoc OpenAPI): Para documentação interativa da API.

JWT (Java Web Token): Para uma autenticação stateless segura.

JUnit 5 & Mockito: Para testes unitários e de integração.

Thymeleaf: Para a interface web administrativa básica.

Funcionalidades
O sistema possui uma API REST completa com as seguintes funcionalidades:

👤 Gestão de Utilizadores:

Registo de novos utilizadores com diferentes perfis (ADMIN, USER).

Autenticação via login para obter um token JWT.

🙋 Gestão de Clientes:

CRUD completo (Criar, Ler, Atualizar, Excluir) para clientes.

🐾 Gestão de Pets:

CRUD completo para pets.

Vínculo de cada pet a um cliente (relacionamento One-to-Many).

🧑‍⚕️ Gestão de Veterinários:

Cadastro e listagem de veterinários.

📅 Gestão de Agendamentos:

Criação de agendamentos para serviços (banho, tosa, consulta).

Vínculo de cada agendamento a um pet e, opcionalmente, a um veterinário.

Controle de status do agendamento (AGENDADO, CONCLUÍDO, CANCELADO).

🌐 Interface Web:

Página de login.

Painel administrativo para visualizar e gerir clientes (consumindo a própria API).

Pré-requisitos
Antes de começar, certifique-se de que tem os seguintes softwares instalados:

JDK 17 ou superior.

Maven 3.8 ou superior.

Um servidor de banco de dados MySQL ou PostgreSQL a correr localmente.

Uma ferramenta de API, como Postman ou Insomnia, para testar os endpoints.

Como Configurar e Executar
Clone o Repositório

git clone <url-do-seu-repositorio>
cd petshop

Crie o Banco de Dados
Execute o seguinte comando SQL no seu servidor de banco de dados:

CREATE DATABASE petshop_db;

Configure a Conexão
Abra o ficheiro src/main/resources/application.properties e atualize as seguintes propriedades com as suas credenciais:

# Substitua com os seus dados
spring.datasource.url=jdbc:mysql://localhost:3306/petshop_db
spring.datasource.username=seu_usuario_mysql
spring.datasource.password=sua_senha_mysql

# Se estiver a usar PostgreSQL, comente as linhas do MySQL e descomente estas:
# spring.datasource.url=jdbc:postgresql://localhost:5432/petshop_db
# spring.datasource.username=seu_usuario_postgres
# spring.datasource.password=sua_senha_postgres
# spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

Execute a Aplicação
Utilize o Maven para compilar e iniciar o projeto:

mvn spring-boot:run

A aplicação estará disponível em http://localhost:8080.

Utilização da API
Documentação Interativa
A forma mais fácil de explorar e testar todos os endpoints é através da interface do Swagger. Após iniciar a aplicação, aceda a:

http://localhost:8080/swagger-ui.html

Fluxo de Autenticação
Registar um Utilizador:

Endpoint: POST /api/auth/registo

Corpo (Body):

{
    "login": "admin",
    "senha": "password123",
    "role": "ADMIN"
}

Fazer Login para Obter um Token:

Endpoint: POST /api/auth/login

Corpo (Body):

{
    "login": "admin",
    "senha": "password123"
}

Resposta: A API retornará um token JWT.

Aceder a Endpoints Protegidos:
Para aceder a qualquer outro endpoint (ex: GET /api/clientes), inclua o token JWT no cabeçalho (header) da sua requisição:

Header: Authorization

Valor: Bearer <o_seu_token_jwt>

Executando os Testes
Para rodar os testes unitários e de integração, execute o seguinte comando na raiz do projeto:

mvn test

Estrutura do Projeto
O projeto está organizado na seguinte estrutura de pacotes para garantir a separação de responsabilidades:

com.ghpxd.petshop
├── config/          # Configurações do Spring (ex: SecurityConfig)
├── controller/      # Camada de API REST (endpoints)
├── dto/             # Objetos de Transferência de Dados
├── entity/          # Entidades JPA (mapeamento do banco)
├── repository/      # Interfaces Spring Data JPA para acesso a dados
├── service/         # Camada de lógica de negócio
└── PetshopApplication.java

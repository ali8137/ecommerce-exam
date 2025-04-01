# ecommerce-exam

---

## Description
This is a full-stack e-commerce application built using Spring Boot for the backend and next.js with TypeScript for the frontend. The application allows users to browse products, add them to the shopping cart, ...

---

## Notes and Assumptions
- I have made dnd effect for categories only and not products
- after reordering categories in the admin/categories page, there is a button at bottom, it must be clicked for the new order to be persited in the database
- I just made a basic cart with certain API calls to the backend
- 

---

## Table of Contents
- [Features](#features)
- [Dependencies](#dependencies)
- [Database Design](#Database-Design)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#API-Documentation)
- [Deployment](#deployment)

---

## Features
- User authentication and authorization
- Product listing
- Shopping cart management
- Admin panel for managing products and categories

---

## Dependencies
- Java version 17
- Spring Boot Version 3.4.4
  - Spring Web
  - Spring Security
  - Spring Data JPA
  - PostGrSQL Driver
  - Spring Boot DevTools
  - Lombok
  - Validation
- jjwt-impl version 0.12.6
- jjwt-api version 0.12.6
- jjwt-jackson version 0.12.6

---

💡 **TODO:** 
- [ ] add database schema diagram

<details>
  <summary>
    the entity classes of the database this application are: User, Product, Category, Cart, CartItem.

    the entity classes that represent many tables (self-referencing relationships): 
    the many-to-many relationship tables are: no many-to-many relationships in this project yet.
    the supporting/"weak"-entity tables are: 
    the enumerated helper classes: Role.
    the record classes: 
  </summary>

  - relationships:
    - user table:
      - has one-to-many relationship with cart table
    - product table:
      - has one-to-one relationship with cart_item table
      - has many-to-one relationship with category table
    - category table:
      - has one-to-many relationship with product table
    - cart table:
      - has many-to-one relationship with user table
      - has one-to-many relationship with cart_item table
    - cart_item table:
      - has one-to-one relationship with product table
      - has many-to-one relationship with cart table

  - association of the database tables with their functionsalities/features in the application:
    - product table:
      - to display store products
    - user table:
      - for authentication
    - category:
      - for product categorization
    - cart and cart_item tables:
      - for shopping cart
</details>

---

---

## application architecture:

💡 **TODO:** 
- [ ] add application architecture schema diagram


### high level explanation:
This is a simplified ecommerce project with features like fetching categories, products, managing them in admin panel, implementing drag-and-drop functionality for easy management of the categories and products.

### Backend architecture:
- technologies:
  - spring boot
  - postgreSQL
  - JWT authentication
 

- drag-and-drop: was implemented by persisting the data in the database to enable the user to get access to the new listing order customized by the admin. the frontend data used to achieve this were the id and listingOrder of the categories, where the order hierarchy inducted through the index order of the categories after/during the dragging, where the exposed hooks and props of dnd-kit were being used to track the new order of the categories and to track the dragged and target item. these data were used to fetch the categories from the database and persist them with the updated hierarchy order.

- API structure:
- categories:
  - api/categories
    ---> categories in order
  - api/categories//update-categories-order
    ---> reorder categories
- products:
  - api/products
    ---> products in order
- cart:
  - api/cart/get-carts
    ---> get user cart along with the cart items
  - api/cart/add-cart-item
    ---> add a cart item to the user cart
- cart item:
  - api/cart-item/increment-cart-item/{id}
    ---> increment quantity of a cartitem of the user cart
- api/auth/register
  ---> register/sign up
- api/auth/authenticate
 ---> login/sign in

### frontend architecture:
- app routes:
  - user routes:
    - categories
    - categories/[categoryName]
    - categories/[categoryName]/product
  - admin routes:
    - categories
    - categories/[categoryName]
- components:
  -  are inside 'components' directory
  -  some component: Category, Product, AdminCategory, Authentication, AuthProvider , Cart , CartProduct, CartOrderSummary
- redux slices are inside 'redux' directory
  -  some redux slices: auth, cart, category, ...
- dnd-kit components are inside 'components/admin/dnd'
  - Draggable
  - Droppable
  - DnDContext
  - onDragOver event handler, active and over props
- data fetching:
  - axios
  - NEXTjs API routing
  - api.ts

---

## application structure:


### folder structure
💡 **TODO:** 
- [ ] add this section

### exception handling
💡 **TODO:** 
- [ ] add this section

---

## Installation (local development)


### Prerequisites
- Java 11+
- PostgreSQL
- Maven
- Git


### Backend Setup
- clone the repository:

```bash
git clone git@github.com:ali8137/ecommerce-exam.git
cd ecommerce-exam
```

- configure environment variables:


backend environment variables: JWT_SECRET_KEY, MYSQL_DB_USERNAME, and MYSQL_DB_PASSWORD
frontend environment variables: NEXT_PUBLIC_BACKEND_API_URL, and NEXT_PUBLIC_API_BASE_URL

it is recommended to add .env file at the root of each project side

- install dependencies:

```bash
mvn clean install
```

or using "ctrl + shift + o" in Intellij IDEA

- run the application:

```bash
mvn spring-boot:run
```


### Database Setup
- create the database:

```bash
postgre -u root -p -e "CREATE DATABASE ecommerce;"
```

or using pgadmi4 UI

don't forget to create the database in postgreSQL 'ecommerce-exam'
there are initdb SQL files in the backend part, execute them before starting the project for better devlopment experience

---

## Usage
- once the backend is running, you can access the app at http://localhost:8080 and the frontend at http://localhost:3000

💡 **TODO:** 
- [ ] continue/fill the below section
### API Endpoints
- `GET /api/...` - ...
- `POST /api/...` - ...
- `PUT /api/...` - ...
- 

### Authentication
To access protected routes, you need to authenticate using a JWT token. 
- Log in using `POST /api/auth/register` with your email and password.
- After successful login, use the returned JWT token in the `Authorization` header of your subsequent requests.

### Example Request
request: 
**POST** `http://localhost:8088/api/login`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

response:
{
  "accessToken": "your-jwt-token-here"
}

---

## API Documentation
- API Base URL: http://localhost:8088/api

💡 **TODO:** 
- [ ] add postman tests
- [ ] add Swagger API documentation

---

## Deployment

💡 **TODO:** 
- [ ] update this section


## 📌 Authorship & License  

This project was created by **[Ali Mezher](https://github.com/ali8137)**.  

📜 **License:** This project is licensed under the [MIT License](LICENSE).  

# Recouvra API

## Overview

Recouvra API is a backend service for managing **client invoices, payments, and recovery actions**.
It allows agents to track unpaid invoices, record payments, and monitor recovery operations.

The system is built with **Node.js, Express, and MongoDB**, and includes **authentication and automated testing with Jest and Supertest**.

---

## Features

* User authentication (register & login)
* Client management
* Invoice management
* Payment tracking
* Recovery action tracking
* System statistics
* Automated API testing

---

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* Jest
* Supertest
* dotenv

---

## Project Structure

```
src/
 ├── controllers
 ├── models
 ├── routes
 ├── middleware
 └── app.js

tests/
 ├── auth.test.js
 ├── client.test.js
 ├── invoice.test.js
 ├── payment.test.js
 ├── recovery.test.js
 └── stats.test.js
```

---

## Installation

1. Clone the repository

```
git clone <repository-url>
cd recouvra-api
```

2. Install dependencies

```
npm install
```

3. Configure environment variables

Create a `.env` file:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/recouvra
MONGODB_URI_TEST=mongodb://localhost:27017/recouvra_test
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h
```

4. Run the server

```
npm run dev
```

---

## API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Clients

```
POST /api/clients
GET /api/clients
GET /api/clients/:id
PATCH /api/clients/:id
DELETE /api/clients/:id
```

### Invoices

```
POST /api/invoices
GET /api/invoices
GET /api/invoices/:id
PATCH /api/invoices/:id
DELETE /api/invoices/:id
```

### Payments

```
POST /api/invoices/:id/payments
GET /api/payments
GET /api/payments/:id
DELETE /api/payments/:id
```

### Recovery

```
POST /api/recovery
GET /api/recovery
GET /api/recovery/:id
PATCH /api/recovery/:id
DELETE /api/recovery/:id
```

### Statistics

```
GET /api/stats
```

---

## Running Tests

Run all tests using:

```
npm test
```

The project includes tests for:

* Authentication
* Clients
* Invoices
* Payments
* Recovery
* Statistics

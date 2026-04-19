# Expense Tracker with Analytics Dashboard

![Java](https://img.shields.io/badge/Java-21-007396?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?logo=springboot&logoColor=white)
![Maven](https://img.shields.io/badge/Build-Maven-C71A36?logo=apachemaven&logoColor=white)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-5D6D7E)
![Status](https://img.shields.io/badge/Status-Active-2EA043)

Backend-first expense tracking platform built with Spring Boot. The current repository contains a production-style backend API for authentication, category and expense management, and analytics endpoints, along with a baseline frontend direction for the upcoming dashboard client.

## Overview
This project is organized as a monorepo with a backend module currently implemented:

- Root workspace: `smart-expense-tracker-with-analytics-dashboard`
- Backend service: `expense-tracker-backend/expense-tracker`
- Planned frontend app: baseline architecture documented below

## Implemented Backend Features

### Authentication and Security
- User registration and login
- JWT-based authentication and request filtering
- Password change endpoint
- Spring Security configuration for protected routes

### Expense and Category Management
- Create, read, update, and delete expenses
- Create, read, and delete categories
- User-scoped expense data

### Analytics
- Monthly expense aggregation
- Category-wise expense breakdown for dashboard visualizations

### Backend Architecture
- Controller layer for REST APIs
- Service layer for business logic
- JPA repositories for persistence
- DTO-based API contracts
- Centralized exception handling

## Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA (Hibernate)
- MySQL
- Maven

### Frontend (Baseline)
- React + TypeScript (recommended)
- Vite (recommended bundler)
- Charting library for analytics views (for example, Recharts or Chart.js)
- Axios/Fetch client with JWT interceptor

## Current Repository Structure

```text
smart-expense-tracker-with-analytics-dashboard/
├─ Readme.md
└─ expense-tracker-backend/
   └─ expense-tracker/
      ├─ pom.xml
      └─ src/
         ├─ main/
         │  ├─ java/com/expensetracker/expense_tracker/
         │  │  ├─ config/
         │  │  ├─ controller/
         │  │  ├─ dto/
         │  │  ├─ entity/
         │  │  ├─ exception/
         │  │  ├─ repository/
         │  │  ├─ security/
         │  │  └─ service/
         │  └─ resources/
         │     └─ application.properties
         └─ test/
```

## Database Model

### Core Tables
- User: `id`, `username`, `email`, `password`, `role`
- Category: `id`, `name`
- Expense: `id`, `amount`, `description`, `date`, `category_id`, `user_id`

## API Endpoints (Current)

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/change-password`

### Categories
- `POST /api/categories`
- `GET /api/categories`
- `DELETE /api/categories/{id}`

### Expenses
- `POST /api/expenses`
- `GET /api/expenses`
- `PUT /api/expenses/{id}`
- `DELETE /api/expenses/{id}`

### Analytics
- `GET /api/analytics/monthly`
- `GET /api/analytics/category`

## Local Setup

### Prerequisites
- Java 17+
- MySQL 8+
- Maven (or use the Maven Wrapper included in the backend module)

### Backend Configuration
Update `expense-tracker-backend/expense-tracker/src/main/resources/application.properties` or provide environment variables:

- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`

Default DB URL:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
```

### Run the Backend

From the repository root:

```bash
cd expense-tracker-backend/expense-tracker
```

Using Maven Wrapper on Windows:

```bash
.\mvnw.cmd spring-boot:run
```

Using Maven (if installed globally):

```bash
mvn spring-boot:run
```

## Baseline Frontend Overview

The frontend application is not yet committed in this repository. The baseline implementation should cover:

### Product Scope
- Authentication flow (login/register) with JWT token storage
- Expense list with filtering by category/date
- Expense create/edit/delete forms
- Category management screen
- Analytics dashboard with monthly trend and category split charts

### Recommended Frontend Structure

```text
frontend/
├─ src/
│  ├─ app/
│  ├─ pages/
│  │  ├─ Login
│  │  ├─ Register
│  │  ├─ Dashboard
│  │  ├─ Expenses
│  │  └─ Categories
│  ├─ components/
│  ├─ services/
│  │  ├─ authApi.ts
│  │  ├─ expenseApi.ts
│  │  ├─ categoryApi.ts
│  │  └─ analyticsApi.ts
│  ├─ hooks/
│  ├─ types/
│  └─ utils/
└─ package.json
```

### Frontend Integration Notes
- Set API base URL to backend host, for example: `http://localhost:8080`
- Send JWT in `Authorization: Bearer <token>` for secured routes
- Keep DTO contracts aligned with backend `dto` package

## Roadmap
- Export reports (PDF/Excel)
- Recurring expenses and subscription tracking
- Budget planning and alerting
- CI/CD and cloud deployment

## License
This project is licensed under the MIT License.

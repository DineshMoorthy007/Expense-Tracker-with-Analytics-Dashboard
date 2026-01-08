# 📊 Expense Tracker with Analytics Dashboard

![Java](https://img.shields.io/badge/Java-17-blue?logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-green?logo=springboot)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange?logo=mysql)
![JWT](https://img.shields.io/badge/Auth-JWT-yellow?logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-lightgrey)
![Status](https://img.shields.io/badge/Status-Active-success)

A **Java Spring Boot backend application** for tracking personal expenses with category management, JWT-based authentication, and analytics dashboard support. This project helps users manage their daily expenses, generate monthly reports, and visualize spending patterns.

---

## 🚀 Features
- **User Authentication**
  - Registration & Login with JWT-based authentication
  - Role-based access (Admin/User)

- **Expense Management**
  - Add, edit, delete expenses
  - Categorize expenses (Food, Travel, Bills, etc.)
  - Filter by date range or category

- **Analytics Dashboard**
  - Monthly expense reports
  - Category-wise breakdown
  - API support for chart visualization (Pie/Line charts)

- **Advanced Features (Optional)**
  - Export reports as PDF/Excel
  - Recurring expenses (subscriptions)
  - Cloud deployment (Heroku/AWS/GCP)

---

## 🛠 Tech Stack
- **Backend:** Java, Spring Boot  
- **Database:** MySQL (JPA/Hibernate)  
- **Authentication:** Spring Security + JWT  
- **Frontend (optional):** React/Angular for dashboard visualization  
- **Tools:** Maven/Gradle, Postman, GitHub  

---

## 📂 Project Structure

ExpenseTracker/
│── src/main/java/com/expensetracker/
│   ├── controller/        # REST API controllers
│   ├── model/             # Entity classes (User, Expense, Category)
│   ├── repository/        # JPA repositories
│   ├── service/           # Business logic
│   └── security/          # JWT & Spring Security configs
│
│── src/main/resources/
│   ├── application.properties  # DB config
│
│── pom.xml                # Maven dependencies


---

## 🗄 Database Schema
### Tables:
- **User**
  - `id`, `username`, `email`, `password`, `role`
- **Category**
  - `id`, `name`
- **Expense**
  - `id`, `amount`, `description`, `date`, `category_id`, `user_id`

---

## ⚡ Getting Started

### Prerequisites
- Java 17+
- Maven/Gradle
- MySQL/PostgreSQL

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/expense-tracker.git

2. Configure database in application.properties

- spring.datasource.url=jdbc:mysql://localhost:3306/expense_db
- spring.datasource.username=root
- spring.datasource.password=yourpassword

3. Run the application:
   ```bash
   mvn spring-boot:run

4.Test APIs using Postman

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` → Register a new user  
- `POST /api/auth/login` → Login and receive JWT token  

### Expenses
- `POST /api/expenses` → Add a new expense  
- `GET /api/expenses` → Retrieve all expenses for the logged-in user  
- `GET /api/expenses/{id}` → Retrieve expense by ID  
- `PUT /api/expenses/{id}` → Update an existing expense  
- `DELETE /api/expenses/{id}` → Delete an expense  

### Analytics
- `GET /api/analytics/monthly` → Get monthly expense report  
- `GET /api/analytics/category` → Get category-wise expense breakdown  

---

## 📈 Future Enhancements
- Integration with payment APIs (Stripe/PayPal) for income vs expense tracking  
- AI-powered expense predictions and budgeting suggestions  
- Export reports as PDF/Excel for offline usage  
- Multi-user collaboration (family/group expense tracking)  
- Cloud deployment with CI/CD pipelines for scalability  

---

## 📜 License
This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this project with proper attribution.

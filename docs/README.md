# Full Stack Assessment Solution

## Introduction
This repository contains the solution for a full stack assessment involving SQL databases, React SPA development, and backend API development on Node.js.

## Setup
1. **Repository**: Forked and cloned locally for development.
2. **Database**: MySQL database set up using Docker as specified in the instructions.

## 1. Database Solution
To normalize the database, the following structure was created:

- **`user` table**:
  - `id` (PK)
  - `username`
  - `email`

- **`home` table**:
  - `id` (PK)
  - `street_address`
  - `city`
  - `state`
  - `zip_code`
  - `price`

- **`home_user` table** (many-to-many relationship):
  - `id` (PK)
  - `user_id` (FK)
  - `home_id` (FK)

A SQL script `99_final_db_dump.sql` in the `sql` directory contains all the necessary changes to transform the database to the normalized structure.

**Key Points**:
- Separated user and home data into respective tables.
- Created a junction table (`home_user`) for many-to-many relationships.
- Used foreign key constraints for data integrity.

## 2. React SPA Solution
A React Single Page Application (SPA) was developed with the following features:

- **Homes for User Page**:
  - Single-select dropdown to choose a user.
  - Displayed related homes in responsive cards below the dropdown.
  - Used Redux Toolkit for state management.
  - Data fetching via RTK Query.

- **Edit User Functionality**:
  - Edit User modal for each home card.
  - Checkbox toggling for user selection.
  - Ensured at least one user is selected before saving.
  - Updated database and UI upon saving changes.

- **Data Fetching**:
  - RTK Query for efficient data fetching and caching.
  - Implemented loading spinners and error handling.

- **Error Handling**:
  - Alert messages for displaying errors to the user.

**Technologies Used**:
- Vite for project setup
- Redux Toolkit for state management
- RTK Query for data fetching
- Tailwind CSS for styling
- react-loading-skeleton for loading states

**Frontend Configuration**:
- Update the backend URL in `src/services/apiUrls.js` to match your setup.

## 3. Backend API Development on Node.js
A Node.js backend using NestJS was developed with the following REST APIs:

- `GET /user/find-all`: Returns all users.
- `GET /home/find-by-user`: Returns all homes related to a user.
- `GET /user/find-by-home`: Returns all users related to a home.
- `PUT /home/update-users`: Updates the users related to a specific home.
- `POST /home`: Adds a new home.
- `POST /user`: Adds a new user.

**Key Features**:
- Appropriate HTTP methods for each endpoint.
- JSON interfaces for all APIs.
- Input data sanitized to prevent SQL injection.
- Idempotency for `/home/update-users`.
- Pagination for `/home/find-by-user` API with page size of 50.

**Technologies Used**:
- NestJS as the backend framework
- TypeORM for database interactions

## Running the Solution

**Database Setup**:
```bash
docker-compose -f docker-compose.final.yml up --build -d

# Project Setup

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
2. Install the necessary dependencies:
    ```bash
   npm install
3. Start the backend server:
    ```bash
   npm run dev

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
2. Install the necessary dependencies:
    ```bash
   npm install
3. Start the frontend server:
    ```bash
   npm run dev

## Additional Notes
1. All frontend code is located in the ./frontend directory.
2. All backend code is located in the ./backend directory.
3. The SQL script for database changes is located at ./sql/99_final_db_dump.sql.
4. Ensure that you update the .env files in the backend directory with the appropriate configuration.
  

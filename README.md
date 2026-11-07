# 📚 UniArchive — Centralized Institutional Repository for Academic Research

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

A full-stack, database-driven web application that centralizes undergraduate theses and capstone projects into a single searchable repository. Built for students, researchers, and faculty who need fast, organized access to academic research — complete with role-based access control, advanced filtering, and full CRUD management.

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Project Context](#project-context)

---

## Features

### 🔐 Authentication & Access Control

- **JWT-based sessions** — secure stateless authentication with token verification on every protected route.
- **Bcrypt password hashing** — credentials are never stored in plain text.
- **Role-based access** — separate `user` and `admin` roles gate sensitive endpoints and the admin dashboard.
- **Route protection middleware** — unauthorized requests are rejected with `401` before reaching controllers.

### 🔎 Research Discovery

- **Keyword search** — full-text matching across titles and abstracts.
- **Category filtering** — browse across 10 technical domains.
- **Academic year filtering** — narrow results by publication period.
- **Paginated results** — efficient browsing with Previous/Next controls and configurable page size.
- **Author aggregation** — `GROUP_CONCAT` combines multiple authors into a single readable record.
- **Detail view** — full title, abstract, authors, category, year, and a link to the full paper.

### 🗂️ Admin CRUD Management

- **Add research** — insert new records with title, abstract, year, category, and file URL.
- **Edit research** — update any field on existing records.
- **Delete research** — cascade-removes associated author links via foreign key constraints.
- **User management** — view all registered users, promote/demote roles, and remove accounts.

### 🖥️ Web Interface

- **Home page** — landing page with project statistics and navigation.
- **Login & Register** — authentication forms with validation and error handling.
- **Dashboard** — browse by category or search with filters and pagination.
- **Research detail** — full record view with authors and file link.
- **Profile** — logged-in user information and logout.
- **Admin dashboard** — research and user management with tabbed CRUD tables.
- **About page** — project background, problem statement, and team information.

### 🗄️ Database & Data

- **9,969 research records** imported from IEEE Xplore.
- **34,402 author records** with 34,402 junction-table links.
- **10 categories:** AI, Cloud Computing, Computer Architecture, Computer Networks, Cybersecurity, Data Science, Embedded System, Internet of Things, Machine Learning, Robotics.
- **Normalized relational schema** — `users`, `research`, `author`, and `research_authors` junction table.
- **Cascade constraints** — deleting a research record or author automatically removes associated links.

---

## Technology Stack

| Layer | Technologies Used |
|-------|-------------------|
| **Frontend** | React.js, Vite, React Router, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | Railway MySQL (cloud-hosted) |
| **Authentication** | JWT (JSON Web Tokens), bcrypt |
| **Data Source** | IEEE Xplore (CSV export, 10 technical categories) |
| **Tunneling** | ngrok (development exposure) |
| **Configuration** | dotenv (`.env` environment variables) |

---

## System Architecture

1. **Client Request** — The React frontend sends an HTTP request to the backend API, attaching the JWT token from `localStorage` in the `Authorization` header.
2. **Auth Middleware** — Express routes protected by `authMiddleware` verify the token using `JWT_SECRET`; invalid or missing tokens are rejected with `401 Unauthorized`.
3. **Controller Logic** — The matched controller (`auth`, `search`, or `admin`) executes business logic and validates input.
4. **Database Query** — The controller uses a `mysql2/promise` connection pool to query the Railway MySQL database, joining `research`, `author`, and `research_authors` tables where needed.
5. **Response** — Results are serialized to JSON and returned to the client, which updates the React component state.
6. **Static Serving** — For non-API routes, Express serves `dist/index.html` so React Router can handle client-side navigation without a full page reload.

```text
React (Vite) → Axios → Express API → Auth Middleware → Controllers → Railway MySQL
                                    ↑
                          JWT + bcrypt verification
```

### Database Schema

| Table | Key Columns | Notes |
|-------|-------------|-------|
| `users` | `id` (PK), `name`, `email` (unique), `password`, `role` | `role` is `ENUM('admin', 'user')`, default `user` |
| `research` | `research_id` (PK), `title`, `abstract`, `academic_year`, `category`, `file_url` | Core research metadata |
| `author` | `author_id` (PK), `full_name` | Individual contributor records |
| `research_authors` | `research_id` (FK), `author_id` (FK) | Junction table resolving the M:N relationship; composite primary key; `ON DELETE CASCADE` and `ON UPDATE CASCADE` |

---

## Getting Started

### Prerequisites

Ensure the following are installed and configured:

- **Node.js** (v18 or higher) and **npm**
- A **Railway MySQL** database instance (host, port, user, password, and database name)
- **ngrok** account and CLI (for exposing the local backend)
- A code editor and terminal

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/uniarhive.git
cd uniarhive
```

### 2. Install Dependencies

Install backend and frontend packages separately:

```bash
# Backend
cd uniarhive-server
npm install

# Frontend
cd ../uniarhive-client
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in `uniarhive-server/` with the following keys:

```env
PORT=5000
DB_HOST=metro.proxy.rlwy.net
DB_PORT=56057
DB_USER=root
DB_PASSWORD=your_railway_password
DB_NAME=railway
JWT_SECRET=your_secret_key
```

> **⚠️ Important:** Never commit your `.env` file or hardcode database credentials. Rotate your `JWT_SECRET` and Railway password if they are ever exposed. The ngrok URL changes on every restart — update the `API` constant in the frontend and rebuild after each restart.

### 4. Import Research Data (Optional)

If starting with a fresh database, run the CSV import script:

```bash
cd uniarhive-server
node importCSV.js
```

This populates the database with approximately 9,969 research records, 34,402 authors, and 34,402 author-research links across 10 categories.

### 5. Build the Frontend

Compile the React app into static files served by Express:

```bash
cd uniarhive-client
npm run build
cp -r dist ../
cd ..
```

### 6. Run the Backend

```bash
cd uniarhive-server
node index.js
```

The server starts on `http://localhost:5000`.

### 7. Expose via ngrok

In a separate terminal:

```bash
ngrok http 5000
```

Copy the generated public URL and set it as the `API` constant in your frontend source files, then rebuild the frontend.

### 8. Access the Application

Open the ngrok URL in your browser. Register a new account, log in, and start browsing research.

### Known Limitations

- **ngrok free tier** provides a new public URL on every restart.
- **Backend availability** requires the host machine to be running.
- **Frontend API constant** must be updated and the frontend rebuilt whenever the ngrok URL changes.
- **Admin access** requires a user whose `role` is set to `admin` in the database.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user (hashed password, default role) |
| `POST` | `/api/auth/login` | Authenticate user and return a JWT |
| `GET` | `/api/research/search` | Search and filter research with keyword, category, year, and pagination (auth required) |
| `GET` | `/api/research/:id` | Retrieve full detail for a single research record (auth required) |
| `GET` | `/api/admin/users` | List all registered users (admin only) |
| `PUT` | `/api/admin/users/:id` | Update a user's role (admin only) |
| `DELETE` | `/api/admin/users/:id` | Delete a user account (admin only) |
| `GET` | `/api/admin/research` | List the latest research records (admin only) |
| `POST` | `/api/admin/research` | Add a new research record (admin only) |
| `PUT` | `/api/admin/research/:id` | Update an existing research record (admin only) |
| `DELETE` | `/api/admin/research/:id` | Delete a research record and its author links (admin only) |

> **Note:** All `/api/research` and `/api/admin` endpoints require a valid `Bearer <token>` in the `Authorization` header.

---

## Project Context

UniArchive was developed as the final project for **CPE011 — Database Management Systems** at the **Technological Institute of the Philippines, Quezon City Campus**. The project addresses a real institutional pain point: research outputs scattered across libraries, personal storage, and unorganized digital files, making discovery difficult for students and researchers. By centralizing nearly 10,000 IEEE Xplore research records into a normalized relational database with a full-featured web interface, UniArchive demonstrates practical application of database design principles — ER modeling, normalization, foreign key constraints, and junction tables — alongside modern full-stack development, from JWT authentication and RESTful API design to React state management and cloud database deployment.

---

<p align="center"><i>Built with ☕ and SQL for CPE011 — Database Management Systems.</i></p>

# FoodieExpress

**FoodieExpress** is a full-featured food delivery platform built with the MERN stack (MongoDB, Express.js, ReactJS, Node.js) and integrates Stripe for secure payment processing. The application includes both a customer-facing web interface and an administrative dashboard, sharing a common RESTful API and database to manage real-time orders, inventory, and user data.

---

## Table of Contents

1. [Key Features](#key-features)
2. [Technology Stack](#technology-stack)
3. [Architecture & Folder Structure](#architecture--folder-structure)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation Steps](#installation-steps)
   - [Running Locally](#running-locally)
5. [Configuration & Environment Variables](#configuration--environment-variables)
6. [API Documentation](#api-documentation)
   - [Authentication](#authentication)
   - [Food Management](#food-management)
   - [Cart Operations](#cart-operations)
   - [Order Processing](#order-processing)
7. [Data Models](#data-models)
8. [Authentication & Authorization Flow](#authentication--authorization-flow)
9. [Payment Workflow](#payment-workflow)
10. [Storage & Media Handling](#storage--media-handling)
11. [Error Handling & Validation](#error-handling--validation)
12. [Testing](#testing)
13. [Deployment](#deployment)
14. [CI/CD](#ci-cd)
15. [Contributing](#contributing)
16. [License](#license)
17. [Contact](#contact)

---

## Key Features

- **User Authentication & Authorization**
  - Secure registration and login with JWT-based sessions.
  - Role-based access: customers vs. admins.
- **Dynamic Food Catalog**
  - Browsable menu with categories, descriptions, prices, and images.
  - Admin can add, update, or remove items.
- **Shopping Cart**
  - Add/remove items, view dynamic totals, and persist cart between sessions.
- **Order Management**
  - Place orders, track status (processing, out for delivery, delivered).
  - Admin dashboard for viewing all orders and updating statuses.
- **Payment Integration**
  - Stripe Checkout Sessions for secure, PCI-compliant payments.
  - Webhook-based payment verification.
- **Real-time Inventory & Notifications**
  - Synchronized inventory updates between frontend and backend.
- **Media Storage**
  - Food item images stored and served from Firebase Storage.

---

## Technology Stack

| Layer               | Technology               |
| ------------------- | ------------------------ |
| Frontend            | ReactJS, Context API     |
| UI & Styling        | Tailwind CSS (optional)  |
| State Management    | React Context            |
| HTTP Client         | Axios                    |
| Backend Framework   | Node.js, Express.js      |
| Database            | MongoDB (Mongoose ODM)   |
| Storage             | Firebase Storage         |
| Payment Gateway     | Stripe API               |
| Authentication      | JWT, bcryptjs            |
| Testing             | Jest, Supertest (backend)|
| Version Control     | Git/GitHub               |
| CI/CD               | GitHub Actions           |
| Deployment          | Heroku / AWS / Vercel    |

---

## Architecture & Folder Structure

```
foodie-express/
├── backend/
│   ├── controllers/        # Business logic functions
│   │   ├── authController.js
│   │   ├── foodController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── middleware/         # Express middleware
│   │   └── authMiddleware.js
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   ├── Food.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/             # Route definitions
│   │   ├── authRoutes.js
│   │   ├── foodRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── utils/              # Helpers (Stripe, Firebase)
│   │   ├── stripe.js
│   │   └── firebase.js
│   ├── tests/              # Unit & integration tests
│   ├── .env.example
│   └── server.js           # App entrypoint
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # StoreContext.js
│   │   ├── pages/          # Page-level components
│   │   ├── services/       # API service functions
│   │   └── App.js          # Routes & layout
│   └── package.json
└── README.md               # This documentation
```

---

## Getting Started

### Prerequisites

- Node.js v14+
- npm or Yarn
- MongoDB Atlas account or local MongoDB instance
- Firebase project for Storage
- Stripe account for API keys

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/foodie-express.git
   cd foodie-express
   ```
2. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   ```
3. **Install frontend dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

### Running Locally

1. **Configure environment variables** (see [Configuration](#configuration--environment-variables)).
2. **Start backend server**:
   ```bash
   cd backend
   npm run dev
   ```
3. **Start frontend client**:
   ```bash
   cd ../frontend
   npm start
   ```
4. **Access the app** at `http://localhost:3000` (frontend) and API at `http://localhost:5000/api/`

---

## Configuration & Environment Variables

Rename `backend/.env.example` to `.env` and set these values:

```ini
# Server
PORT=5000
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret>

# Stripe
STRIPE_SECRET_KEY=<Your Stripe secret key>
STRIPE_WEBHOOK_SECRET=<Your Stripe webhook signing secret>

# Firebase
FIREBASE_PROJECT_ID=<Your Firebase project ID>
FIREBASE_CLIENT_EMAIL=<Firebase client email>
FIREBASE_PRIVATE_KEY=<Firebase private key>
FIREBASE_STORAGE_BUCKET=<Your Firebase storage bucket>
```

---

## API Documentation

All endpoints prefixed with `/api`. Protected routes require an `Authorization: Bearer <token>` header.

### Authentication

| Method | Route                | Description                        | Request Body                          | Response                             |
| ------ | -------------------- | ---------------------------------- | ------------------------------------- | ------------------------------------- |
| POST   | `/api/user/register` | Create a new user                  | `{ name, email, password }`           | `{ token, user: { id, name, email }}` |
| POST   | `/api/user/login`    | Authenticate existing user         | `{ email, password }`                 | `{ token, user: { id, name, email }}` |

### Food Management

| Method | Route              | Description                       | Request Body (multipart/form-data)               | Response            |
| ------ | ------------------ | --------------------------------- | ------------------------------------------------ | ------------------- |
| POST   | `/api/food/add`    | Add new food item (admin only)    | `name, description, price, imageFile`            | `{ success, food }` |
| GET    | `/api/food/list`   | Retrieve all food items           | —                                                | `[{ food... }]`     |
| POST   | `/api/food/remove` | Remove food item (admin only)     | `{ foodId }`                                     | `{ success }`       |

### Cart Operations

| Method | Route                 | Description                | Request Body                    | Response                |
| ------ | --------------------- | -------------------------- | ------------------------------- | ----------------------- |
| POST   | `/api/cart/add`       | Add item to user’s cart    | `{ foodId, quantity }`          | `{ success, cart }`     |
| POST   | `/api/cart/remove`    | Remove item from cart      | `{ foodId }`                    | `{ success, cart }`     |
| POST   | `/api/cart/get`       | Get current cart           | —                               | `{ cart }`              |

### Order Processing

| Method | Route                    | Description                          | Request Body                       | Response                        |
| ------ | ------------------------ | ------------------------------------ | ---------------------------------- | ------------------------------- |
| POST   | `/api/order/place`       | Create order & Stripe session       | `{ cartItems, shippingInfo }`      | `{ sessionId, order }`          |
| POST   | `/api/order/verify`      | Verify Stripe payment               | `{ sessionId }`                    | `{ success, orderStatus }`      |
| POST   | `/api/order/userorders`  | Get orders for authenticated user   | —                                  | `[{ order... }]`                |
| GET    | `/api/order/list`        | Get all orders (admin only)         | —                                  | `[{ order... }]`                |
| POST   | `/api/order/status`      | Update order status (admin only)    | `{ orderId, status }`              | `{ success, updatedOrder }`     |

---

## Data Models

- **User**: `{ name, email, passwordHash, role, createdAt }`
- **Food**: `{ name, description, price, imageUrl, category, createdAt }`
- **Cart**: `{ userId, items: [{ foodId, quantity }] }`
- **Order**: `{ userId, items, shippingInfo, totalPrice, paymentStatus, orderStatus, stripeSessionId, createdAt }`

---

## Authentication & Authorization Flow

1. **Registration**: User submits `{ name, email, password }` → password hashed → user saved → JWT issued.
2. **Login**: Credentials verified → JWT issued.
3. **Token Storage**: Stored in `localStorage` and React context.
4. **Protected Requests**: `authMiddleware` verifies JWT, attaches `req.user`.
5. **Role Checks**: Admin-only endpoints check `req.user.role === 'admin'`.

---

## Payment Workflow

1. **Order Placement**: `/api/order/place` creates a Stripe Checkout Session with line items and redirect URLs.
2. **Checkout Redirect**: Frontend redirects to Stripe-hosted page.
3. **Webhook or Redirect**: After payment, Stripe calls webhook or user returns and frontend calls `/api/order/verify` with session ID.
4. **Verification**: Backend retrieves session status via Stripe SDK, updates order’s `paymentStatus`.

---

## Storage & Media Handling

- **MongoDB**: Persistent storage for all application data.
- **Firebase Storage**: Hosts food images; firebase utility handles uploads and returns public URLs.

---

## Error Handling & Validation

- **Controllers** wrap async logic in try/catch and call `next(err)`.
- **Error Middleware** returns consistent JSON: `{ message, statusCode }`.
- **Input Validation** using `express-validator` for request bodies.

---

## Testing

- **Backend**:
  - Unit tests for controllers and utilities with Jest.
  - Integration tests for API endpoints with Supertest.
- **How to run**:
  ```bash
  cd backend
  npm test
  ```

---

## Deployment

1. **Environment**: Configure variables on hosting platform (Heroku, AWS, Vercel).
2. **Build**:
   - Backend: `npm run build`
   - Frontend: `npm run build`
3. **Serve**:
   - Serve backend via Node or Docker.
   - Serve static frontend from CDN or via Express static middleware.

---

## CI/CD

Configured GitHub Actions for:
- **Linting**: ESLint on push and PRs.
- **Testing**: Run backend tests.
- **Deployment**: Automated deploy to staging on merge to `main`.

---

## Contributing

We welcome contributions! Steps:
1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/YourFeature`.
3. Commit with clear messages.
4. Push branch and open a Pull Request.
5. Ensure tests and lint pass.

Please follow our [CODE_OF_CONDUCT.md] and [CONTRIBUTING.md].

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Contact

**Maintainer**: Kiran Pillai (`pillaikiran88@gmail.com`)

Project Repository: https://github.com/DetonatedSkull1722/foodie-express

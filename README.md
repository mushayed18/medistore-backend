```markdown
# MediStore - Online OTC Medicine E-Commerce Platform

MediStore is a full-stack online pharmacy platform for over-the-counter medicines.

## Features

### Public Features
- Browse and search medicines with filters (category, price range, manufacturer)
- View detailed medicine information (description, price, stock, seller, reviews)
- See customer reviews, rating on medicine detail page

### Customer Features
- Register/Login with role selection
- Place orders with shipping address (Cash on Delivery)
- View own order history (paginated)
- View single order details
- Cancel pending orders (restores stock)

### Seller Features
- Add, update, delete own medicines
- View own medicine list (paginated, sorted)
- View orders containing own medicines
- Update order status (PENDING → SHIPPED → DELIVERED / CANCELLED)

### Admin Features
- Full access to manage medicines (any seller's)
- View all orders (paginated)
- List all users
- Ban/unban users (blocks login and actions)

### Tech Stack (Backend)
- Node.js + Express + TypeScript
- Prisma ORM + PostgreSQL (Neon)
- Better Auth (authentication & session management)
- Role-based access control (CUSTOMER, SELLER, ADMIN)
- Input validation, error handling, pagination & sorting

### Setup Instructions
1. Clone repo
2. `npm install`
3. Create `.env` with `DATABASE_URL` (PostgreSQL/Neon)
4. `npx prisma generate`
5. `npx prisma migrate dev`
6. `npm run dev`

```

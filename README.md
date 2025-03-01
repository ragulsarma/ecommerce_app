## 🛒 E-Commerce App - Product Review & Wishlist (Backend)

A backend service for an E-Commerce system where users can browse products, submit reviews, manage a wishlist, and admins can manage products, reviews, and wishlists.

## 🚀 Tech Stack  
- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL, Sequelize ORM  
- **Authentication**: JWT (JSON Web Tokens)  
- **API Documentation**: Swagger  (Swagger API Docs available at http://localhost:${PORT}/api-docs)

---

## 📌 Features & Roles  

### 👤 **Admin**  
- ✅ View all wishlists  
- ✅ Manage (CRUD) products  
- ✅ View & reply to reviews  

### 🛍️ **Customer**  
- ✅ Login & authentication  
- ✅ Browse paginated products  
- ✅ Add products to wishlist  
- ✅ Write a review (1 review per product)  
- ✅ View other users' reviews  

---

## 📁 Project Structure  

```code
│── src/
│── controllers/   # Handles request processing (Product, Review, Wishlist)
│── models/        # Database models (User, Product, Review, Wishlist)
│── routes/        # API endpoints for different modules
│── config/        # Database & environment configurations
│── server.js      # Server setup
│── .env           # Environment variables
│── package.json   # Dependencies & scripts

```

## 🔹 Installation & Setup  

Clone this project with the following command:

```bash
git clone https://github.com/ragulsarma/ecommerce_app.git
```

Open the project with your code editor, and change into the **backend**:

```bash
cd ecommerce_app
```

Install dependencies:

```bash
npm install
```

 Configure Environment Variables
Create a .env file and add:

```bash
PORT=8000
DATABASE_URL=postgres://username:password@localhost:5432/ecommerce_db
JWT_SECRET=your_secret_key
```
Start the Server

```bash
npm start
```
# 🛍️ Shop Mart – Modern E-commerce Website

A modern and responsive e-commerce web application built using **React.js, Tailwind CSS, and React Router**. Shop Mart provides an online shopping experience where users can browse products, manage their cart and wishlist, place orders, and track their order history.

🌐 **Live Demo:** [Shop Mart](https://shop-mart-beta-topaz.vercel.app/)

💻 **GitHub Repository:** [Shop Mart](https://github.com/sonuThakurCsit/shop-mart)

---

## ✨ Features

### 🏠 Home Page
- Modern and responsive homepage.
- Featured products section.
- Easy navigation between pages.

### 🛒 Product Management
- Display all available products.
- Dynamic product details pages.
- Search products by name.
- Filter products by category.
- Filter products by price range.
- Sort products by price.
- Product stock information.

### 🛍️ Shopping Cart
- Add products to cart.
- Increase and decrease product quantities.
- Stock validation.
- Remove products from cart.
- Automatic price calculation.
- Cart data persistence using LocalStorage.

### ❤️ Wishlist
- Add products to wishlist.
- Remove products from wishlist.
- Move wishlist products to cart.
- Wishlist data persistence using LocalStorage.

### 👤 User Authentication
- User registration.
- User login and logout.
- Form validation.
- Duplicate email validation.
- Current user persistence using LocalStorage.
- Conditional Navbar links based on login status.
- Protected routes for authenticated users.

**Note:** Authentication is currently frontend-only and implemented using LocalStorage for learning and demonstration purposes. It is not secure production authentication.

### 💳 Checkout
- Checkout form with customer details.
- Form validation.
- Order placement.
- Automatic cart clearing after successful order.

### 📦 Order History
- View previously placed orders.
- Display order ID and date.
- Display customer and product details.
- View total order amount.
- Cancel confirmed orders.

### ⭐ Product Reviews & Ratings
- Submit product reviews.
- Add ratings.
- Display customer reviews.
- Calculate average product rating.
- Display total review count.

### 📱 Responsive Design
- Mobile-friendly layout.
- Responsive Navbar.
- Responsive product cards and pages.
- Built with Tailwind CSS.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend UI |
| JavaScript | Application Logic |
| Tailwind CSS | Styling and Responsive Design |
| React Router DOM | Client-side Routing |
| React Context API | Global State Management |
| React Hooks | State and Lifecycle Management |
| React Icons | Icons |
| LocalStorage | Browser-side Data Persistence |
| Vite | Development and Build Tool |
| Git & GitHub | Version Control |
| Vercel | Deployment |

---

## 📸 Project Preview

Visit the live website:

👉 [https://shop-mart-beta-topaz.vercel.app/](https://shop-mart-beta-topaz.vercel.app/)

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/sonuThakurCsit/shop-mart.git
```

### 2. Navigate to Project Directory

```bash
cd shop-mart
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Open in Browser

Open the local URL shown in your terminal, usually:

```text
http://localhost:5173/
```

---

## 📦 Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## 💾 Data Storage

Shop Mart currently uses browser LocalStorage to persist:

- Cart items
- Wishlist items
- Registered demo users
- Current logged-in user
- Product reviews
- Order history

Data is stored locally in the browser and is not shared between different browsers or devices.

---

## 🚀 Deployment

The project is deployed using **Vercel**.

🌐 Live Website: [Shop Mart](https://shop-mart-beta-topaz.vercel.app/)

---

## 🎯 Learning Objectives

This project helped me practice and improve my skills in:

- React component-based architecture.
- React Hooks (`useState`, `useEffect`, `useContext`).
- React Context API for global state management.
- Dynamic routing using React Router.
- CRUD operations.
- Array methods (`map`, `filter`, `reduce`, `find`).
- Form handling and validation.
- LocalStorage integration.
- Responsive UI development.
- Git and GitHub workflow.
- Deploying React applications using Vercel.

---

## 👨‍💻 Developer

**Sonu Kumar**

Frontend Developer

- GitHub: [@sonuThakurCsit](https://github.com/sonuThakurCsit)
- LinkedIn: [Sonu Kumar](https://linkedin.com/in/sonu-kumar-a9202b415/)

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!

**Made with ❤️ by Sonu Kumar**
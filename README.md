# Custom Services & Products Platform

A full-stack web platform that connects service providers (artisans, designers, freelancers) with customers who are looking for custom-made products and services.  
The system supports real-time chat, AI assistance, secure payments, and cloud-based image storage.

## Live Demo

You can explore the deployed version of the project here:  
 [https://frontend-fzb2.onrender.com](https://frontend-fzb2.onrender.com)

---

## Project Overview

The platform enables providers to showcase their work, while customers can browse, request, and communicate directly with them.  
It simplifies finding and managing custom products or services — all within one modern web application.

---

## Project Goals

- Empower local talents to display and sell their services online.  
- Help customers easily access personalized, handcrafted, or specialized products.  
- Support collaboration and communication between providers and customers.  
- Promote the local economy through remote, digital work opportunities.  
- Integrate AI to improve platform usability and user experience.

---

## Target Users

- Service Providers: Artisans, designers, developers, and creators.  
- Customers: People searching for high-quality, customized products or services.  
- Admins: Manage content, oversee transactions, and ensure platform integrity.

---

## Key Features

### Home Page
- Public access (no login required).  
- Displays featured products, top services, and categories.

### Authentication
- Register or log in as a Customer or Provider.  
- Includes email verification and social login options.

### User Dashboard
- Search and filter products by category or name.  
- Add items to the cart or wishlist.  
- React to posts with Like, Support, or Proud to encourage providers.

### Provider Dashboard
- Create and manage posts (Product or Service).  
- Upload photos stored securely using Firebase Storage.  
- AI-powered description suggestions to generate professional text automatically.  
- Manage and update orders with price changes or notes.  
- Send offers to customers using “Send to User Approve”.

### Live Chat
- Built with Socket.io for instant real-time communication.  
- Users can send text, images, and files directly.

### Orders Management
- Track orders by status: Pending, In Progress, Awaiting Approval, Completed.  
- AI-powered analysis shows diagrams and summaries of order counts, revenue, and progress.  
- Motivational message for providers and thank-you message for customers after analysis.

### Cart & Checkout
- Add, edit, or delete items easily.  
- Include custom requirements before checkout for personalized products.  
- Payment only includes approved and confirmed orders.  
- Integrated with Stripe for secure online transactions.

### Wishlist
- Save favorite products and services for quick access.

### AI Assistant
- Works like ChatGPT but trained specifically on this project.  
- Replaces documentation by acting as a smart guide that explains each feature and helps users step-by-step.

---

## Technologies Used

| Layer | Technology | Purpose |
|-------|-------------|----------|
| Frontend | React.js, Tailwind CSS | UI and responsive design |
| Backend | Node.js, Express.js | RESTful API and server logic |
| Database | PostgreSQL | Structured data storage |
| Real-time | Socket.io | Live chat and instant updates |
| Payments | Stripe | Secure online transactions |
| Storage | Firebase Storage | Image and file upload handling |
| AI | OpenAI API / LLM | AI assistant and order analysis |
| Tools | npm, Axios, Lucide Icons | Utilities and dependency management |
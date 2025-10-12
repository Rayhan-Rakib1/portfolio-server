# B5A7 Portfolio Backend

![Node.js](https://img.shields.io/badge/Node.js-18.16.0-green)
![Express](https://img.shields.io/badge/Express-4.x-yellow)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/License-MIT-red)

🚀 **Backend for a personal portfolio website** supporting authentication, blogs, projects, comments, and secure owner-only dashboard.

---

## 🌟 Features

### Authentication & Authorization
- JWT-based authentication with `accessToken` and `refreshToken` (future-proof)
- Password hashing using **bcrypt**
- Role-based access: Owner/Admin vs Public
- Login, logout, register, update profile, change password, delete account
- Secure routes: Owner-only routes for blog/project management

### Blog Management
- CRUD operations for blogs
- Public users can view blogs and individual blog pages
- Supports **slug-based URLs** for SEO
- Rich content support (HTML, Markdown-ready)

### Project Showcase
- CRUD for personal projects
- Public view for portfolio showcase
- Slug-based URLs

### Comments System
- Users can post, update, delete comments on blogs
- Public can view comments
- Nested comments possible (if extended)

### Error Handling
- HTTP status codes used correctly
- Clear error messages
- Handles authentication & authorization errors

### UI/UX Friendly
- Designed for API consumption by **NextJS frontend**
- Integrates seamlessly with **NextAuth** for login

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js + Express |
| Database | PostgreSQL (Prisma ORM) / MongoDB (alternative) |
| Authentication | JWT + bcrypt |
| Language | TypeScript |
| Notification | react-hot-toast (frontend) |

---

## 🌐 About This Website

**B5A7 Portfolio Website** is a **personal portfolio platform** designed to showcase the work, skills, and blogs of the portfolio owner in a clean, modern, and responsive layout. It serves both **public visitors** and the **owner/admin** with role-specific features:

### Public Features
- Visitors can explore **all blogs** and read individual blog posts with rich formatting.
- Showcase of **personal projects** including live links, descriptions, and images.
- **About Me** section presenting personal details, experience, skills, and contact information.
- SEO-friendly pages using **slug-based URLs**.
- Responsive UI that works smoothly on **mobile, tablet, and desktop devices**.

### Owner/Admin Features
- Secure **login system** using JWT-based authentication.
- **Dashboard** to manage blogs and projects easily.
- Ability to **create, edit, update, and delete** blogs and projects.
- Access to **user comments management** on blog posts.
- Real-time notifications for successful actions and errors via **react-hot-toast**.
- Rich text editor for blog/project content with formatting options like **bold, italic, links, and images**.

### Design Philosophy
- Modern, **clean UI/UX** with interactive components such as cards, modals, and smooth transitions.
- Fast and optimized with **NextJS ISR/SSG** for public pages.
- Accessibility-friendly with semantic HTML and responsive design.
- Error handling and validation are implemented for secure and seamless user experience.

**Purpose:**  
This website demonstrates the portfolio owner’s **technical skills, projects, and thought leadership through blogs**, while providing a **secure admin interface** to manage content efficiently. It is perfect for personal branding, client showcases, and professional presentations.


---

## 🛣 API Routes

### **User Routes**

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/user/register` | Register a new user |
| POST | `/api/user/login` | Login user |
| POST | `/api/user/logout` | Logout user |
| GET | `/api/user/me` | Get current logged-in user |
| PATCH | `/api/user/update-user` | Update user profile |
| PATCH | `/api/user/change-password` | Change password |
| DELETE | `/api/user/delete-user` | Delete user account |

---

### **Blog Routes**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/blog` | Get all blogs (public) |
| GET | `/api/blog/:id` | Get blog by slug (public) |
| POST | `/api/blog` | Create a blog (Owner only) |
| PATCH | `/api/blog/:id` | Update a blog (Owner only) |
| DELETE | `/api/blog/:id` | Delete a blog (Owner only) |

---

### **Comment Routes**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/comment/blog/:blogId` | Get comments for a blog |
| POST | `/api/comment/blog/:blogId` | Add comment to a blog |
| PATCH | `/api/comment/:id` | Update a comment |
| DELETE | `/api/comment/:id` | Delete a comment |

---

### **Project Routes**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/project` | Get all projects (public) |
| GET | `/api/project/:slug` | Get project by slug (public) |
| POST | `/api/project` | Create a project (Owner only) |
| PATCH | `/api/project/:id` | Update a project (Owner only) |
| DELETE | `/api/project/:id` | Delete a project (Owner only) |

---




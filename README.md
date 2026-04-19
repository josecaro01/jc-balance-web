# 💰 JC Balance

**JC Balance** is a professional-grade web application designed for comprehensive personal finance management. It empowers users to track income and expenses, visualize financial trends through interactive charts, and manage their budget with a clean, multi-language interface.

---

## ✨ Features

* **Advanced Transaction Management:** Full CRUD capabilities for income and expenses with detailed categorization and filtering.
* **Dynamic Financial Dashboards:** Real-time data visualization using **Recharts**, featuring balance trends and category distribution.
* **Secure Authentication Flow:** Robust identity management including login, registration, and password recovery.
* **Global Localization:** Fully internationalized UI powered by **i18next** with automatic language detection.
* **Seamless UI/UX:** Responsive design with theme switching (Light/Dark mode) and high-performance state management.

---

## 🛠️ Technologies

* **React 19 & TypeScript:** Core framework and type-safe development for building a reliable UI.
* **Vite 8:** Next-generation frontend tooling for lightning-fast builds and HMR.
* **TanStack Query (v5):** Powerful asynchronous state management for server-state caching and synchronization.
* **Zustand:** Minimalist and scalable store for managing global UI state and user sessions.
* **Tailwind CSS (v4):** Utility-first CSS framework for rapid and consistent styling.
* **Recharts:** Composable charting library for rendering complex financial data.
* **i18next:** Comprehensive internationalization framework for multi-language support.

---

## 📂 Project Structure

The project follows a **Feature-Sliced Design (FSD)** inspired approach, promoting high cohesion and low coupling. This architecture ensures that each domain logic is encapsulated and easily maintainable.

* **src/app**: Application layer. Contains entry points, global providers (QueryClient, Auth), and the main router configuration.
* **src/features**: Domain-driven modules. Each folder (auth, dashboard, financial, transactions) contains its own API calls, UI components, custom hooks, and TypeScript types specific to that business logic.
* **src/shared**: Reusable infrastructure. Includes the Axios client, the common UI Kit (Buttons, Inputs, Icons), global hooks (Theme, Snackbar), and formatting utilities.
* **src/assets**: Static resources like logos and icons.

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** (Version 20.x or higher)
* **npm** (Standard package manager)

### Installation

1. **Clone the repository:**
   git clone https://github.com/JoseCaro01/JC-Balance.git
   cd jc-balance

2. **Install dependencies:**
   npm install

3. **Run the application:**
   npm run dev

4. **Build for production:**
   npm run build

---

## 📌 Roadmap

* [ ] Financial reports exportation (PDF/CSV).
* [ ] Implementation of Unit Tests and Integration Tests.

---

## 🤝 Contributions

Contributions are welcome! Feel free to open **issues** to suggest new features or improvements, and send **pull requests** with your code.

---

## ⚖️ License

This project has no license. All rights are reserved by the author.
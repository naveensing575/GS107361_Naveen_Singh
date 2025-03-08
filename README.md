# GSynergy Typescript React Challenge – Progressive Web App

## 🚀 Project Overview

I developed this Progressive Web App (PWA) using **React (TypeScript)** to manage **stores, SKUs, and sales planning**. It includes an interactive **AG-Grid**, dynamic **Recharts visualizations**, **drag-and-drop functionality**, and a modern **Redux-based state management system**.

### 🌐 Live Demo:

🔗 [GSynergy App](https://gsynergy-navi.netlify.app)

---

## 📁 Project Structure

```
└── 📁GS107361_Naveen_Singh
    ├── 📁dist
    ├── 📁public
    │   └── logo.svg
    ├── 📁src
    │   ├── App.tsx
    │   ├── 📁assets
    │   │   └── logo.svg
    │   ├── 📁components
    │   │   ├── GMChart.tsx
    │   │   ├── Layout.tsx
    │   │   ├── PlanningGrid.tsx
    │   │   ├── Sidebar.tsx
    │   │   ├── SKUForm.tsx
    │   │   ├── SKUList.tsx
    │   │   ├── SKUTable.tsx
    │   │   ├── StoreForm.tsx
    │   │   ├── StoreList.tsx
    │   │   ├── TopNav.tsx
    │   ├── 📁data
    │   │   └── demoData.ts
    │   ├── 📁hooks
    │   │   └── useLoadSampleData.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   ├── 📁pages
    │   │   ├── ChartPage.tsx
    │   │   ├── LoginPage.tsx
    │   │   ├── PlanningPage.tsx
    │   │   ├── SKUPage.tsx
    │   │   ├── StorePage.tsx
    │   │   ├── StoreTable.tsx
    │   ├── 📁store
    │   │   ├── planningSlice.ts
    │   │   ├── skuSlice.ts
    │   │   ├── store.ts
    │   │   ├── storesSlice.ts
    │   ├── 📁tests
    │   │   ├── 📁components
    │   │   │   ├── GMChart.test.tsx
    │   │   │   ├── Layout.test.tsx
    │   │   │   ├── PlanningGrid.test.tsx
    │   │   │   ├── Sidebar.test.tsx
    │   │   │   ├── SKUForm.test.tsx
    │   │   │   ├── SKUList.test.tsx
    │   │   │   ├── SKUTable.test.tsx
    │   │   │   ├── StoreForm.test.tsx
    │   │   │   ├── StoreList.test.tsx
    │   │   │   ├── TopNav.test.tsx
    │   │   ├── 📁pages
    │   │   │   ├── ChartPage.test.tsx
    │   │   │   ├── LoginPage.test.tsx
    │   │   │   ├── PlanningPage.test.tsx
    │   │   │   ├── SKUPage.test.tsx
    │   │   │   ├── StorePage.test.tsx
    │   │   │   ├── StoreTable.test.tsx
    │   ├── vite-env.d.ts
    ├── .env
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── jest.config.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── README.md
    ├── tailwind.config.js
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
```

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the repository**

```sh
git clone https://github.com/yourusername/GS107361_Naveen_Singh.git
cd GS107361_Naveen_Singh
```

### **2️⃣ Setup Environment Variables**

Create a `.env` file in the root directory and add the following variables:

```sh
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
```

### **3️⃣ Install dependencies**

```sh
npm install
```

If you face peer dependency errors, run:

```sh
npm install --legacy-peer-deps
```

### **4️⃣ Run the development server**

```sh
npm run dev
```

### **5️⃣ Run tests**

```sh
npm test
```

---

## 🔑 Test User Account

- **Email:** user@test.com
- **Password:** Secret@123

---

## ✅ Features Implemented

- **Authentication with Auth0**
- **Redux-based state management**
- **Drag-and-drop store reordering**
- **AG-Grid with inline editable fields**
- **Recharts-based dynamic charting**
- **TypeScript with strong typing**
- **TailwindCSS for styling**
- **Jest unit tests with React Testing Library**

---

Thank you for reviewing my work! 🚀

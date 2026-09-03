# Spell Decipher 🧙‍♂️🔥

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-272C33?style=for-the-badge&logo=vitest&logoColor=FCC72B)
![Clean Architecture](https://img.shields.io/badge/Architecture-Clean-success?style=for-the-badge)

A production-ready, mobile-first Word Guessing RPG built with React and TypeScript. 

This project demonstrates software engineering practices, including strictly decoupled logic (Clean Architecture), Test-Driven Development (TDD), and an agile documentation-as-code approach.

## 🌟 Key Features

* **Platform-Agnostic Core Engine:** The game logic (`SpellDecipherGame`) is written in pure OOP TypeScript, completely isolated from the React UI.
* **Smart Keyboard UI:** Dynamic visual feedback for guessed letters (correct/wrong) with physical button disabling to enforce business rules natively.
* **Resilient Data Layer:** Implements a Repository Pattern with an offline fallback mechanism to ensure the game remains playable even without network connectivity.
* **Mobile-First Responsive Design:** Advanced CSS techniques (`clamp()`, `white-space: nowrap`, and custom scrollbars) guarantee a seamless experience across all device sizes.

## 🏗️ Architecture & Documentation

The project strictly follows a documented framework. You can explore the architectural decisions and business rules in the `/docs` directory:

* [DOC-001: Business Rules & Game Design](./docs/01-business/DOC-001-business-rules.md)
* [DOC-002: Data Dictionary](./docs/02-architecture/DOC-002-data-dictionary.md)
* [DOC-003: System Architecture](./docs/02-architecture/DOC-003-system-architecture.md)
                                 

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/devmourao/SpellDecipher.git
   ```

2. Navigate to the project directory:
   ```bash
   cd SpellDecipher
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🧪 Testing

The Core Engine and Repository layers are built using Test-Driven Development (TDD). To run the test suite via Vitest:

```bash
npm run test
```

## 👨‍💻 Author

**Marcos Ferreira Mourão**
* Portfolio: [dev.mourao.info](https://dev.mourao.info)
* Role: Developer
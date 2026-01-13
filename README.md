# resume-rx

A modern, intelligent resume management and optimization platform designed to help job seekers create, manage, and tailor their resumes for maximum impact.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
  - [Code Standards](#code-standards)
  - [Commit Conventions](#commit-conventions)
  - [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Support](#support)

## Overview

resume-rx is a comprehensive solution for resume management that combines modern web technologies with intelligent features to help users:

- Create professional resumes from scratch or import existing ones
- Optimize resume content based on job descriptions
- Tailor resumes for specific job applications
- Track resume versions and manage multiple variants
- Generate insights on resume effectiveness

## Features

- 📝 **Resume Builder**: Intuitive interface for creating and editing resumes
- 🎯 **Job Matching**: AI-powered resume optimization for job descriptions
- 📊 **Analytics**: Track resume performance and application metrics
- 🔄 **Version Control**: Maintain multiple resume versions
- 🎨 **Templates**: Professional resume templates with customization options
- 📱 **Responsive Design**: Fully responsive across all devices
- 🔐 **Secure Storage**: Safe credential and resume data management
- ⚡ **Fast Performance**: Optimized for speed and efficiency

## Project Structure

```
resume-rx/
├── frontend/                 # React/Vue/Angular frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page-level components
│   │   ├── services/        # API service calls
│   │   ├── hooks/           # Custom React hooks
│   │   ├── styles/          # Global and component styles
│   │   ├── utils/           # Utility functions
│   │   ├── App.tsx          # Main App component
│   │   └── index.tsx        # Application entry point
│   ├── package.json         # Dependencies and scripts
│   └── tsconfig.json        # TypeScript configuration
│
├── backend/                 # Node.js/Express backend API
│   ├── src/
│   │   ├── routes/          # API route definitions
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # Database models/schemas
│   │   ├── middleware/      # Authentication, validation middleware
│   │   ├── services/        # Business services
│   │   ├── utils/           # Helper functions
│   │   ├── config/          # Configuration files
│   │   └── app.ts           # Express app setup
│   ├── tests/               # Test files
│   ├── package.json         # Dependencies and scripts
│   └── .env.example         # Environment variables template
│
├── docs/                    # Documentation
│   ├── API.md               # API documentation
│   ├── ARCHITECTURE.md      # System architecture
│   └── SETUP.md             # Detailed setup guide
│
├── .github/
│   ├── workflows/           # CI/CD pipeline configurations
│   ├── ISSUE_TEMPLATE/      # Issue templates
│   └── PULL_REQUEST_TEMPLATE/
│
├── docker-compose.yml       # Docker compose for local development
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## Tech Stack

### Frontend

- **Framework**: React 18+ / TypeScript
- **State Management**: Redux Toolkit or Context API
- **Styling**: Tailwind CSS / Styled Components
- **HTTP Client**: Axios
- **Build Tool**: Vite / Webpack
- **Package Manager**: npm / yarn
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint, Prettier

### Backend

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB / PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Joi / Zod
- **Testing**: Jest, Supertest
- **Logging**: Winston / Pino
- **Environment**: dotenv

### DevOps & Tools

- **Containerization**: Docker
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Code Quality**: SonarQube, Codecov
- **Package Registry**: npm

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher (or yarn v3.0.0+)
- **Git**: Latest version
- **Docker**: v20.0.0+ (optional, for containerized development)
- **MongoDB**: v4.4+ (if using local database)
- **PostgreSQL**: v12+ (if using local database)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Gxgxn/resume-rx.git
cd resume-rx
```

2. **Install dependencies**

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Setup

1. **Backend configuration**

```bash
cd backend
cp .env.example .env
```

Edit `.env` and configure:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=mongodb://localhost:27017/resume-rx
# or for PostgreSQL
# DATABASE_URL=postgresql://user:password@localhost:5432/resume_rx

# Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# External APIs (if applicable)
OPENAI_API_KEY=your_api_key_here

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Application
APP_NAME=resume-rx
APP_URL=http://localhost:3000
```

2. **Frontend configuration**

```bash
cd ../frontend
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=resume-rx
```

### Running the Application

#### Option 1: Manual Setup

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Server runs on http://localhost:5000

# Terminal 2 - Frontend
cd frontend
npm run dev
# Application runs on http://localhost:3000
```

#### Option 2: Docker Compose

```bash
docker-compose up -d
# Backend: http://localhost:5000
# Frontend: http://localhost:3000
# MongoDB: localhost:27017
```

#### Building for Production

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
# Output in dist/ directory
```

## Usage

### Creating a Resume

1. Navigate to the resume builder
2. Choose a template or start from scratch
3. Fill in your information section by section
4. Preview your resume in real-time
5. Save or export your resume

### Optimizing for Job Applications

1. Import or paste a job description
2. Click "Optimize" to get recommendations
3. Review and apply suggested changes
4. Generate a tailored version
5. Track application metrics

### Managing Versions

1. Access your resume history
2. Compare different versions
3. Restore or delete old versions
4. Create branches from any version

## API Documentation

Full API documentation is available at `/api/docs` when the server is running (Swagger UI).

Key endpoints:

- `GET /api/auth/me` - Get current user
- `POST /api/resumes` - Create resume
- `GET /api/resumes` - List resumes
- `GET /api/resumes/:id` - Get resume details
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `POST /api/resumes/:id/optimize` - Optimize resume

See [API Documentation](./docs/API.md) for complete reference.

## Contributing

We welcome contributions to resume-rx! Here's how to get started:

### Code Standards

- **Language**: TypeScript for type safety
- **Formatting**: Use Prettier for code formatting
  ```bash
  npm run format
  ```
- **Linting**: Follow ESLint rules
  ```bash
  npm run lint
  ```
- **Comments**: Write clear comments for complex logic
- **Naming**: Use descriptive, camelCase names for variables and functions

### Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, etc.

Examples:
```
feat(resume): add AI-powered optimization feature
fix(auth): resolve JWT token expiration issue
docs(readme): update setup instructions
```

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, well-documented code
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm run test
   npm run lint
   ```

4. **Commit with conventional messages**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Reference any related issues (#123)
   - Describe your changes in detail
   - Include screenshots/demos if applicable
   - Ensure all CI/CD checks pass

7. **Code Review**
   - Address reviewer feedback
   - Make requested changes in new commits
   - Ensure PR is approved before merging

## Testing

### Running Tests

```bash
# Backend tests
cd backend
npm run test              # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report

# Frontend tests
cd frontend
npm run test              # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

### Writing Tests

- Write unit tests for utilities and services
- Write integration tests for API endpoints
- Write component tests for UI components
- Aim for >80% code coverage

## Troubleshooting

### Common Issues

**Port already in use**
```bash
# Find and kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

**Database connection failed**
- Verify MongoDB/PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure credentials are correct

**CORS errors**
- Verify frontend URL in backend CORS config
- Check API_URL in frontend .env

**Module not found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**
```bash
npm run type-check
```

For more help, check [GitHub Issues](https://github.com/Gxgxn/resume-rx/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 **Email**: support@resume-rx.com
- 💬 **Discord**: [Join our community](https://discord.gg/resume-rx)
- 🐛 **Issues**: [GitHub Issues](https://github.com/Gxgxn/resume-rx/issues)
- 📚 **Documentation**: [Full Docs](./docs)

---

**Made with ❤️ by the resume-rx team**

# Contributing to Spark

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/spark.git
   cd spark
   ```
3. **Set up the development environment**:
   ```bash
   make setup
   ```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Use prefixes:
- `feature/` for new features
- `fix/` for bug fixes
- `docs/` for documentation
- `refactor/` for refactoring
- `test/` for test improvements

### 2. Install Pre-commit Hooks

```bash
make install-hooks
```

This ensures code quality checks run before each commit.

### 3. Make Your Changes

Follow the coding standards for each component:

#### Backend (Python/Flask)
- Use Black for formatting (line length: 100)
- Use flake8 for linting
- Use type hints where appropriate
- Write docstrings for functions and classes
- Maintain test coverage ≥85%

#### Frontend (TypeScript/Angular)
- Use Prettier for formatting
- Use ESLint for linting
- Follow Angular style guide
- Write unit tests for components and services
- Maintain test coverage ≥85%

#### Spark Jobs (Scala)
- Use scalafmt for formatting
- Follow Scala best practices
- Write ScalaTest tests
- Keep line length ≤100 characters

### 4. Write Tests

All new features must include tests:

```bash
# Backend tests
cd backend && pytest tests/

# Frontend tests
cd frontend && npm test

# Spark tests
cd spark-jobs && sbt test
```

### 5. Run Linters

```bash
make lint
```

Or for specific components:
```bash
# Backend
cd backend && flake8 app tests && black --check app tests

# Frontend
cd frontend && npm run lint

# Spark
cd spark-jobs && sbt scalafmtCheck
```

### 6. Commit Your Changes

Write clear, descriptive commit messages:

```bash
git commit -m "feat: add user authentication endpoint"
git commit -m "fix: resolve datetime serialization issue"
git commit -m "docs: update API documentation"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` test additions or changes
- `chore:` maintenance tasks

### 7. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 8. Create a Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill in the PR template:
   - Description of changes
   - Related issues
   - Testing performed
   - Screenshots (if applicable)

## Pull Request Guidelines

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Tests added/updated and passing
- [ ] Linting passes (`make lint`)
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow conventions
- [ ] No merge conflicts
- [ ] PR description is clear and complete

### PR Review Process

1. Automated CI checks must pass
2. At least one maintainer review required
3. Address review feedback
4. Maintainer will merge when approved

## Testing Requirements

### Minimum Coverage

- Backend: ≥85%
- Frontend: ≥85%
- New features: 100% coverage

### Running Tests

```bash
# All tests
make test

# Specific component
make test-backend
make test-frontend
make test-spark
```

## Documentation

Update documentation for:
- New features
- API changes
- Configuration changes
- Deployment procedures

Documentation locations:
- `README.md`: Main project documentation
- `docs/docs/`: MkDocs documentation
- API docs: OpenAPI/Swagger (inline in code)
- Code comments: For complex logic

## Code Review

### What Reviewers Look For

- Code quality and readability
- Test coverage
- Documentation
- Performance implications
- Security considerations
- Breaking changes

### Responding to Feedback

- Be open to suggestions
- Ask questions if unclear
- Make requested changes
- Update PR description if scope changes

## Issue Reporting

### Bug Reports

Include:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots/logs (if applicable)

### Feature Requests

Include:
- Use case description
- Proposed solution
- Alternatives considered
- Potential impact

## Development Tips

### Hot Reload

All services support hot reload in development:
```bash
make dev
```

### Debugging

```bash
# Backend shell
make shell-backend

# Frontend shell
make shell-frontend

# Database shell
make shell-postgres
```

### View Logs

```bash
make logs
```

## Getting Help

- Check existing documentation
- Search closed issues
- Ask in pull request discussions
- Open a new issue for bugs or questions

## Recognition

Contributors are recognized in:
- GitHub contributors page
- Release notes
- Special thanks in documentation

Thank you for contributing! 🎉

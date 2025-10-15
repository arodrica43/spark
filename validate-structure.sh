#!/bin/bash
# Project Structure Validation Script
# Verifies that all required components are present

echo "🔍 Validating Spark Project Structure..."
echo ""

ERRORS=0

# Function to check if file exists
check_file() {
    if [ -f "$1" ]; then
        echo "✅ $1"
    else
        echo "❌ MISSING: $1"
        ((ERRORS++))
    fi
}

# Function to check if directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo "✅ $1/"
    else
        echo "❌ MISSING: $1/"
        ((ERRORS++))
    fi
}

echo "📁 Root Files:"
check_file "README.md"
check_file "SUMMARY.md"
check_file "CONTRIBUTING.md"
check_file "12-FACTOR.md"
check_file "LICENSE"
check_file "Makefile"
check_file "docker-compose.yml"
check_file ".env.example"
check_file ".gitignore"
check_file ".pre-commit-config.yaml"
echo ""

echo "🐍 Backend (Flask):"
check_dir "backend"
check_file "backend/Dockerfile"
check_file "backend/requirements.txt"
check_file "backend/requirements-dev.txt"
check_file "backend/pyproject.toml"
check_file "backend/alembic.ini"
check_dir "backend/app"
check_file "backend/app/main.py"
check_file "backend/app/config.py"
check_dir "backend/tests"
echo ""

echo "⚛️  Frontend (Angular):"
check_dir "frontend"
check_file "frontend/Dockerfile"
check_file "frontend/package.json"
check_file "frontend/angular.json"
check_file "frontend/tsconfig.json"
check_file "frontend/karma.conf.js"
check_dir "frontend/src"
check_file "frontend/src/index.html"
check_file "frontend/src/main.ts"
echo ""

echo "⚡ Spark Jobs (Scala):"
check_dir "spark-jobs"
check_file "spark-jobs/Dockerfile"
check_file "spark-jobs/build.sbt"
check_dir "spark-jobs/src/main/scala"
check_dir "spark-jobs/src/test/scala"
echo ""

echo "📚 Documentation:"
check_dir "docs"
check_file "docs/mkdocs.yml"
check_dir "docs/docs"
check_file "docs/docs/index.md"
echo ""

echo "🏗️  Infrastructure:"
check_dir "infra"
check_file "infra/render.yaml"
check_file "infra/postgres.Dockerfile"
check_file "infra/redis.Dockerfile"
echo ""

echo "🔧 CI/CD:"
check_dir ".github/workflows"
check_file ".github/workflows/ci.yml"
echo ""

echo "🐳 Dev Container:"
check_dir ".devcontainer"
check_file ".devcontainer/devcontainer.json"
echo ""

# Count files
echo "📊 Statistics:"
echo "   Python files: $(find backend/app backend/tests -name '*.py' 2>/dev/null | wc -l)"
echo "   TypeScript files: $(find frontend/src -name '*.ts' 2>/dev/null | wc -l)"
echo "   Scala files: $(find spark-jobs/src -name '*.scala' 2>/dev/null | wc -l)"
echo "   Test files: $(find . -name '*test*.py' -o -name '*.spec.ts' 2>/dev/null | wc -l)"
echo "   Documentation files: $(find docs/docs -name '*.md' 2>/dev/null | wc -l)"
echo ""

if [ $ERRORS -eq 0 ]; then
    echo "✨ All checks passed! Project structure is complete."
    exit 0
else
    echo "⚠️  Found $ERRORS missing files/directories."
    exit 1
fi

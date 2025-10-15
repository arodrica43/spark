# Testing Guide

## Overview

The project maintains ≥85% test coverage across all components.

## Running Tests

### All Tests

```bash
make test
```

### Backend Tests

```bash
make test-backend
# or
cd backend && pytest
```

### Frontend Tests

```bash
make test-frontend
# or
cd frontend && npm test
```

### Spark Tests

```bash
make test-spark
# or
cd spark-jobs && sbt test
```

## Backend Testing

### Framework

- **pytest**: Test framework
- **pytest-cov**: Coverage reporting
- **pytest-flask**: Flask testing utilities
- **factory-boy**: Test data generation

### Running Specific Tests

```bash
cd backend
pytest tests/test_items.py
pytest tests/test_items.py::test_create_item
pytest -k "test_create"
```

### Coverage Report

```bash
cd backend
pytest --cov=app --cov-report=html
open htmlcov/index.html
```

## Frontend Testing

### Framework

- **Jasmine**: Test framework
- **Karma**: Test runner
- **Chrome Headless**: Browser for testing

### Running Tests in Watch Mode

```bash
cd frontend
npm run test:watch
```

### Coverage Report

```bash
cd frontend
npm test
open coverage/index.html
```

## Spark Testing

### Framework

- **ScalaTest**: Test framework

### Running Tests

```bash
cd spark-jobs
sbt test
sbt "testOnly com.spark.jobs.DataProcessorSpec"
```

## Continuous Integration

Tests run automatically on:
- Every push to main/develop
- Every pull request

See `.github/workflows/ci.yml` for CI configuration.

## Writing Tests

### Backend Test Example

```python
def test_create_item(client, app):
    """Test creating a new item."""
    item_data = {"name": "Test Item", "description": "Test"}
    response = client.post(
        "/api/items/",
        data=json.dumps(item_data),
        content_type="application/json",
    )
    assert response.status_code == 201
    assert response.get_json()["name"] == "Test Item"
```

### Frontend Test Example

```typescript
it('should create a new item', () => {
  const newItem: Item = { name: 'Test', description: 'Test' };
  service.createItem(newItem).subscribe(item => {
    expect(item).toEqual(jasmine.objectContaining(newItem));
  });
});
```

### Spark Test Example

```scala
it should "process data correctly" in {
  val spark = SparkSession.builder()
    .master("local[*]")
    .getOrCreate()
    
  val data = Seq((1, "Item1")).toDF("id", "name")
  data.count() shouldBe 1
}
```

# Spark Jobs Architecture

## Technology Stack

- **Language**: Scala 2.12
- **Framework**: Apache Spark 3.5
- **Build Tool**: SBT
- **Testing**: ScalaTest
- **Container**: Bitnami Spark

## Project Structure

```
spark-jobs/
├── src/
│   ├── main/
│   │   └── scala/
│   │       └── com/
│   │           └── spark/
│   │               └── jobs/
│   │                   └── DataProcessor.scala
│   └── test/
│       └── scala/
│           └── com/
│               └── spark/
│                   └── jobs/
│                       └── DataProcessorSpec.scala
├── project/
│   ├── build.properties        # SBT version
│   └── plugins.sbt             # SBT plugins
├── build.sbt                   # Build configuration
├── .scalafmt.conf              # Code formatting
└── Dockerfile                  # Container definition
```

## Key Components

### DataProcessor

Main Spark application:
- Connects to PostgreSQL
- Reads data with JDBC
- Processes with DataFrame API
- Calculates statistics
- Writes results back

### Spark Session

Configurable entry point:
```scala
val spark = SparkSession
  .builder()
  .appName("Data Processor")
  .getOrCreate()
```

### JDBC Connection

Read from PostgreSQL:
```scala
val df = spark.read
  .jdbc(dbUrl, "items", connectionProperties)
```

## Data Processing

### DataFrame Operations

- **Select**: Choose columns
- **Filter**: Apply conditions
- **GroupBy**: Aggregate data
- **Join**: Combine datasets
- **Window**: Compute over partitions

### Example Job

```scala
val processedDF = itemsDF
  .select("id", "name", "description")
  .filter($"name".isNotNull)
  .groupBy($"name")
  .count()
```

## Build Configuration

### build.sbt

Dependencies:
- Spark Core
- Spark SQL
- PostgreSQL JDBC driver
- ScalaTest

Assembly plugin for fat JAR:
```scala
assembly / assemblyJarName := "spark-jobs-1.0.0.jar"
```

### Merge Strategy

Handle conflicting files:
- Discard META-INF
- Concatenate reference.conf
- Use first for others

## Testing

### ScalaTest

Unit tests with local Spark:
```scala
class DataProcessorSpec extends AnyFlatSpec {
  it should "process data" in {
    val spark = SparkSession
      .builder()
      .master("local[*]")
      .getOrCreate()
    // Test logic
  }
}
```

### Test Coverage

- DataFrame operations
- Null handling
- Edge cases
- Empty datasets

## Deployment

### Local Execution

```bash
sbt run
```

### Cluster Submission

```bash
spark-submit \
  --class com.spark.jobs.DataProcessor \
  --master spark://spark-master:7077 \
  target/scala-2.12/spark-jobs-1.0.0.jar
```

### Docker

Multi-stage build:
1. Install SBT
2. Download dependencies
3. Compile code
4. Create assembly JAR

## Configuration

### Environment Variables

- `DATABASE_URL`: JDBC connection string
- `POSTGRES_USER`: Database user
- `POSTGRES_PASSWORD`: Database password
- `SPARK_MASTER_URL`: Cluster master

### Spark Config

- `spark.executor.memory`: Worker memory
- `spark.executor.cores`: Worker cores
- `spark.driver.memory`: Driver memory

## Monitoring

### Spark UI

Available at http://localhost:8080:
- Job progress
- Stage details
- Executor status
- Storage usage

### Logs

- Application logs
- Executor logs
- Driver logs

## Performance

### Optimization

- Partition data appropriately
- Cache frequently used DataFrames
- Broadcast small tables
- Avoid shuffles when possible

### Best Practices

- Use DataFrame API
- Avoid UDFs when possible
- Persist intermediate results
- Monitor memory usage

## Error Handling

Try-catch for resilience:
```scala
try {
  processData(spark, dbUrl, user, pass)
} catch {
  case e: Exception =>
    logger.error("Processing failed", e)
    sys.exit(1)
} finally {
  spark.stop()
}
```

## Code Quality

### Scalafmt

Automatic formatting:
```bash
sbt scalafmt
sbt scalafmtCheck
```

### Style Guide

- 100 character line limit
- 2-space indentation
- Scala 2.12 dialect

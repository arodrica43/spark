package com.spark.jobs

import org.apache.spark.sql.{DataFrame, SparkSession}
import java.util.Properties

object DataProcessor {

  def main(args: Array[String]): Unit = {
    val spark = SparkSession
      .builder()
      .appName("Spark Data Processor")
      .getOrCreate()

    try {
      val dbUrl = sys.env.getOrElse("DATABASE_URL", 
        "jdbc:postgresql://postgres:5432/sparkdb")
      val dbUser = sys.env.getOrElse("POSTGRES_USER", "sparkuser")
      val dbPassword = sys.env.getOrElse("POSTGRES_PASSWORD", "sparkpass")

      println("Starting data processing job...")
      processData(spark, dbUrl, dbUser, dbPassword)
      println("Data processing job completed successfully")
    } catch {
      case e: Exception =>
        println(s"Error processing data: ${e.getMessage}")
        e.printStackTrace()
        sys.exit(1)
    } finally {
      spark.stop()
    }
  }

  def processData(
    spark: SparkSession,
    dbUrl: String,
    dbUser: String,
    dbPassword: String
  ): Unit = {
    import spark.implicits._

    val connectionProperties = new Properties()
    connectionProperties.put("user", dbUser)
    connectionProperties.put("password", dbPassword)
    connectionProperties.put("driver", "org.postgresql.Driver")

    // Read data from PostgreSQL
    val itemsDF = spark.read
      .jdbc(dbUrl, "items", connectionProperties)

    println(s"Loaded ${itemsDF.count()} items from database")

    // Perform some data processing
    val processedDF = itemsDF
      .select("id", "name", "description", "created_at")
      .filter($"name".isNotNull)

    processedDF.show(10, truncate = false)

    // Calculate statistics
    val stats = processedDF
      .groupBy()
      .count()
      .as[Long]
      .head()

    println(s"Total items processed: $stats")
  }
}

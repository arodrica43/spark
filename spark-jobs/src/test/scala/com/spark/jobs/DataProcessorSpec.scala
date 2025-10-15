package com.spark.jobs

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import org.apache.spark.sql.SparkSession

class DataProcessorSpec extends AnyFlatSpec with Matchers {

  "DataProcessor" should "create SparkSession" in {
    val spark = SparkSession
      .builder()
      .appName("Test")
      .master("local[*]")
      .getOrCreate()

    spark should not be null
    spark.sparkContext.appName shouldBe "Test"

    spark.stop()
  }

  it should "process data correctly" in {
    val spark = SparkSession
      .builder()
      .appName("Test Data Processing")
      .master("local[*]")
      .getOrCreate()

    import spark.implicits._

    val testData = Seq(
      (1, "Item1", "Description1"),
      (2, "Item2", "Description2"),
      (3, "Item3", null)
    ).toDF("id", "name", "description")

    val filtered = testData.filter($"name".isNotNull)
    filtered.count() shouldBe 3

    val withNullDesc = testData.filter($"description".isNull)
    withNullDesc.count() shouldBe 1

    spark.stop()
  }

  it should "handle empty datasets" in {
    val spark = SparkSession
      .builder()
      .appName("Test Empty")
      .master("local[*]")
      .getOrCreate()

    import spark.implicits._

    val emptyData = Seq.empty[(Int, String, String)]
      .toDF("id", "name", "description")

    emptyData.count() shouldBe 0

    spark.stop()
  }
}

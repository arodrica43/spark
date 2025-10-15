error id: file://<WORKSPACE>/src/main/scala/App.scala:`<none>`.
file://<WORKSPACE>/src/main/scala/App.scala
empty definition using pc, found symbol in pc: `<none>`.
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -spark/implicits.
	 -spark/implicits#
	 -spark/implicits().
	 -scala/Predef.
	 -scala/Predef#
	 -scala/Predef().
offset: 273
uri: file://<WORKSPACE>/src/main/scala/App.scala
text:
```scala
import org.apache.spark.sql.SparkSession

object App {
  def main(args: Array[String]): Unit = {
    val spark = SparkSession.builder()
      .appName("Codespaces Spark Hello")
      .master("local[*]")
      .config("spark.ui.showConsoleProgress", "false")
      .getOrCre@@ate()

    spark.sparkContext.setLogLevel("WARN")

    import spark.implicits._

    val df = Seq(
      ("Alice", 34),
      ("Bob", 28),
      ("Carol", 41)
    ).toDF("name", "age")

    df.show()

    // Keep job alive briefly so you can view the Spark UI on port 4040
    println("Open the Spark UI on port 4040 (Ports panel). Sleeping 10s...")
    Thread.sleep(10000)

    spark.stop()
  }
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.
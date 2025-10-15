error id: file:///C:/Users/oscar/OneDrive/Documentos/feina/IVEAEMPA/infra/spark/src/main/scala/App.scala:`<none>`.
file:///C:/Users/oscar/OneDrive/Documentos/feina/IVEAEMPA/infra/spark/src/main/scala/App.scala
empty definition using pc, found symbol in pc: `<none>`.
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -spark/implicits/Thread.sleep.
	 -spark/implicits/Thread.sleep#
	 -spark/implicits/Thread.sleep().
	 -Thread.sleep.
	 -Thread.sleep#
	 -Thread.sleep().
	 -scala/Predef.Thread.sleep.
	 -scala/Predef.Thread.sleep#
	 -scala/Predef.Thread.sleep().
offset: 560
uri: file:///C:/Users/oscar/OneDrive/Documentos/feina/IVEAEMPA/infra/spark/src/main/scala/App.scala
text:
```scala
import org.apache.spark.sql.SparkSession

object App {
  def main(args: Array[String]): Unit = {
    val spark = SparkSession.builder()
      .appName("Codespaces Spark Hello")
      .master("local[*]")
      .getOrCreate()

    import spark.implicits._

    val df = Seq(
      ("Alice", 34),
      ("Bob", 28),
      ("Carol", 41)
    ).toDF("name", "age")

    df.show()

    // Keep job alive briefly so you can view the Spark UI on port 4040
    println("Open the Spark UI on port 4040 (Ports panel). Sleeping 10s...")
    Thread.slee@@p(10000)

    spark.stop()
  }
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.
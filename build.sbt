ThisBuild / scalaVersion := "2.12.18"      // Spark 3.5.x uses Scala 2.12
lazy val root = (project in file("."))
  .settings(
    name := "codespaces-spark",
    version := "0.1.0",
    libraryDependencies ++= Seq(
      "org.apache.spark" %% "spark-core" % "3.5.1",
      "org.apache.spark" %% "spark-sql"  % "3.5.1"
    )
  )

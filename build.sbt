// Run main app in a separate JVM with the right flags
Compile / run / fork := true
Compile / run / javaOptions ++= Seq(
  "--add-exports=java.base/sun.nio.ch=ALL-UNNAMED",
  "--add-opens=java.base/java.nio=ALL-UNNAMED",
  "--add-opens=java.base/sun.nio.ch=ALL-UNNAMED"
)

// (Optional) helps avoid classloader edge-cases mentioned in the error
//Compile / run / classLoaderLayeringStrategy := ClassLoaderLayeringStrategy.Flat

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

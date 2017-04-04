name := "akka-date-devoxx"

version := "1.0"

scalaVersion := "2.12.1"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-http" % "10.0.5",
  "de.heikoseeberger" %% "akka-http-json4s" % "1.14.0",
  "org.json4s" %% "json4s-ext" % "3.5.1",
  "org.json4s" %% "json4s-jackson" % "3.5.1"
)
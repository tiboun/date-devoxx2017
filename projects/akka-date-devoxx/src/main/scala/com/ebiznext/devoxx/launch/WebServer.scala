package com.ebiznext.devoxx.launch

import java.time.{LocalDateTime, ZoneId}

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import com.ebiznext.devoxx.json4s.JavaTimeSerializers
import de.heikoseeberger.akkahttpjson4s.Json4sSupport
import org.json4s.{DefaultFormats, Formats, Serialization, jackson}

object WebServer extends Json4sSupport {
  def main(args: Array[String]) {

    implicit val system = ActorSystem("date-system")
    implicit val materializer = ActorMaterializer()
    implicit val executionContext = system.dispatcher

    implicit val serialization: Serialization = jackson.Serialization
    implicit val formats: Formats = DefaultFormats ++ JavaTimeSerializers.all

    val route =
      pathPrefix("api") {
        path("my-form") {
          pathEnd {
            post {
              entity(as[MyForm]) { myForm =>
                complete(myForm)
              }
            }
          }
        }
      }
    Http().bindAndHandle(route, "localhost", 8080)
  }
}

case class MyForm(email: String, password: String, birthdate: LocalDateTime)
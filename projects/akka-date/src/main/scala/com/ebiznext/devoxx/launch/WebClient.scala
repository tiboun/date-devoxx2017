package com.ebiznext.devoxx.launch

import java.time.temporal.{ChronoUnit, TemporalUnit}
import java.time.{LocalDateTime, ZonedDateTime}

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.marshalling.Marshal
import akka.http.scaladsl.model._
import akka.stream.ActorMaterializer
import akka.util.ByteString
import com.ebiznext.devoxx.json4s.JavaTimeSerializers
import com.ebiznext.devoxx.model.MyForm
import de.heikoseeberger.akkahttpjson4s.Json4sSupport
import org.json4s.{DefaultFormats, Formats, Serialization, jackson}

import scala.concurrent.Future
import scala.util.{Failure, Success}

object WebClient extends App with Json4sSupport {
  implicit val system = ActorSystem()
  implicit val materializer = ActorMaterializer()

  implicit val serialization: Serialization = jackson.Serialization
  implicit val formats: Formats = DefaultFormats ++ JavaTimeSerializers.all

  import scala.concurrent.ExecutionContext.Implicits._

  private val pastDate = ZonedDateTime.now().withDayOfMonth(1).withMonth(8).withYear(1970).truncatedTo(ChronoUnit.DAYS)
  val responseFuture: Future[HttpResponse] = Marshal(MyForm("e@mail.com", "password", pastDate)).to[RequestEntity].flatMap { re =>
    Http().singleRequest(HttpRequest(uri = "http://localhost/apijs/my-form", method = HttpMethods.POST, entity = re))
  }

  responseFuture onComplete {
    case Success(r) =>
      r.entity.dataBytes.runFold(ByteString(""))(_ ++ _).foreach { body =>
        println("Got response, body: " + body.utf8String)
      }
      system.terminate()
    case Failure(e) =>
      e.printStackTrace()
      system.terminate()
  }
}

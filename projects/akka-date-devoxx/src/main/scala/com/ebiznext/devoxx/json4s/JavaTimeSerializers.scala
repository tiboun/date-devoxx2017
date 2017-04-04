package com.ebiznext.devoxx.json4s

import java.time.ZoneId
import java.{time => jt}

import org.json4s.CustomSerializer
import org.json4s.JsonAST.JString

import scala.util.Try


object JavaTimeSerializers {

  def all = Seq(LocalDateTimeISOSerializer, LocalDateISOSerializer)
}

case object LocalDateTimeISOSerializer
  extends {
  } with CustomSerializer[jt.LocalDateTime](_ => {

    val isoFormat = jt.format.DateTimeFormatter.ISO_DATE_TIME

    def isValidDateTime(str: String): Boolean = Try(isoFormat.parse(str)).isSuccess

    ( {
      case JString(value) if isValidDateTime(value) =>
        val time = jt.ZonedDateTime.parse(value)
        time.toInstant.atZone(ZoneId.systemDefault()).toLocalDateTime
    }, {
      case ldt: jt.LocalDateTime => JString(ldt.format(isoFormat))
    }
    )
  })

case object LocalDateISOSerializer
  extends CustomSerializer[jt.LocalDate](_ => {

    val isoFormat = jt.format.DateTimeFormatter.ISO_DATE

    def isValidDate(str: String): Boolean = Try(isoFormat.parse(str)).isSuccess

    ( {
      case JString(value) if isValidDate(value) =>
        val time = jt.ZonedDateTime.parse(value)
        time.toInstant.atZone(ZoneId.systemDefault()).toLocalDate
    }, {
      case ldt: jt.LocalDate => JString(ldt.format(isoFormat))
    }
    )
  })

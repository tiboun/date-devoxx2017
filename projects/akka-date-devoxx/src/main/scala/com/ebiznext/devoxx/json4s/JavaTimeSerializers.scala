package com.ebiznext.devoxx.json4s

import java.time.ZoneId
import java.{time => jt}

import org.json4s.CustomSerializer
import org.json4s.JsonAST.JString

import scala.util.Try


object JavaTimeSerializers {

  def all = Seq(LocalDateTimeISOSerializer, LocalDateISOSerializer, ZonedDateTimeISOSerializer)
}

case object LocalDateTimeISOSerializer
  extends {
  } with CustomSerializer[jt.LocalDateTime](_ => {

    val isoFormat = jt.format.DateTimeFormatter.ISO_OFFSET_DATE_TIME

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

    val isoFormat = jt.format.DateTimeFormatter.ISO_OFFSET_DATE_TIME

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

case object ZonedDateTimeISOSerializer
  extends {
  } with CustomSerializer[jt.ZonedDateTime](_ => {

    val isoFormat = jt.format.DateTimeFormatter.ISO_OFFSET_DATE_TIME

    def isValidDateTime(str: String): Boolean = Try(isoFormat.parse(str)).isSuccess

    ( {
      case JString(value) if isValidDateTime(value) =>
        jt.ZonedDateTime.parse(value).withZoneSameInstant(ZoneId.systemDefault())
    }, {
      case ldt: jt.ZonedDateTime => JString(ldt.format(jt.format.DateTimeFormatter.ISO_OFFSET_DATE_TIME))
    }
    )
  })
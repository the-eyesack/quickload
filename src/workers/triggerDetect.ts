import moment from "moment"

import openLinks from "~helpers/openLinks"

import setLocalStorage from "./localStorage"
import notification from "./notification"

export default function triggerDetect(name, triggerTime, urlArray, frequency) {
  moment().format()

  let now = moment()
  console.log(
    `detection started: ${name}, ${triggerTime}, ${urlArray}, ${frequency}`
  )

  var interval = setInterval(() => {
    now = moment()
    for (let e in triggerTime) {
      if (now.isSameOrAfter(triggerTime[e])) {
        openLinks(urlArray)
        triggerTime.push(
          moment()
            .day(new Date().getDay() + 7)
            .toISOString()
        )
        triggerTime.splice(parseInt(e), 1)

        setLocalStorage(name, urlArray, frequency, triggerTime)

        notification(
          "basic",
          "Loaded out!",
          `${name} success! Rescheduled for ${moment(
            triggerTime[triggerTime.length - 1]
          ).format(
            "dddd, MMMM Do YYYY, h:mm:ss a"
          )}. It is now ${now}. Next trigger at ${moment(triggerTime[e]).format(
            "dddd, MMMM Do YYYY, h:mm:ss a"
          )}. Will check again in ${frequency}ms.`,
          "https://t4.ftcdn.net/jpg/01/89/83/87/360_F_189838722_kX2hOMITZEg0spM9tgEpfJBVJoWb70kh.jpg"
        )
      }
    }
    console.log(now)
  }, frequency || 25000)
}

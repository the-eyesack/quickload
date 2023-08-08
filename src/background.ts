import moment from "moment"

import setLocalStorage from "~workers/localStorage"
import notification from "~workers/notification"
import triggerDetect from "~workers/triggerDetect"

moment().format()
let triggerTime = []
let name: string
let urlArray: Array<string> = []
let frequency: number

//startup
chrome.runtime.onStartup.addListener(() => {
  notification(
    "basic",
    "Startup",
    "Quickload started",
    "https://t4.ftcdn.net/jpg/01/89/83/87/360_F_189838722_kX2hOMITZEg0spM9tgEpfJBVJoWb70kh.jpg"
  )
  chrome.storage.local.get().then((result) => {
    console.log(result)
    for (let i in result) {
      triggerDetect(
        i,
        result[i].triggerTime,
        result[i].urls,
        result[i].frequency
      )
    }
  })
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //get time and url array
  if (request.greeting === "sewer") {
    urlArray = request.urlArray
    frequency = request.frequency
    name = request.name
    console.log(name)

    for (let i in request.time) {
      if (request.time[i].active) {
        const timeBreakdown: Array<number> = request.time[i].time.split(":")

        triggerTime.push(
          moment()
            .day(i)
            .set({
              hour: timeBreakdown[0],
              minute: timeBreakdown[1],
              second: 0,
              millisecond: 0
            })
            .toISOString()
        )
      }
    }

    triggerDetect(name, triggerTime, urlArray, frequency)
    setLocalStorage(name, urlArray, frequency, triggerTime)
    console.log(triggerTime)
    notification(
      "basic",
      "Loadout set!",
      "Your loadout will go off at " +
        moment(triggerTime[0]).format("dddd, MMMM Do YYYY, h:mm:ss a" + "."),
      "https://t4.ftcdn.net/jpg/01/89/83/87/360_F_189838722_kX2hOMITZEg0spM9tgEpfJBVJoWb70kh.jpg"
    )
  }
})

let serviceEnabled: boolean = true

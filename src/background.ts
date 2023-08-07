import moment from 'moment';
import openLinks from '~helpers';
moment().format();
let triggerTime : any
let urlArray : Array<string> = []
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting === "hello")
      {
        let options = {
          type: 'basic',
          title: 'Basic Notification',
          message: 'This is a Basic Notification',
          iconUrl: 'https://static.wikia.nocookie.net/leagueoflegends/images/7/74/Flash.png/revision/latest?cb=20180514003149'
        };
        // @ts-ignore
        chrome.notifications.create(options);
    
        sendResponse({farewell: "goodbye"})
      }
    if (request.greeting === "sewer") {
      // console.log(request.time)
      urlArray = request.urlArray
      for(let i in request.time) {
        if(request.time[i].active) {
          const timeBreakdown: Array<number> = request.time[i].time.split(':')

          triggerTime = moment().day(i).set({'hour': timeBreakdown[0], 'minute': timeBreakdown[1], 'second': 0, 'millisecond': 0})
          interval;

        }
      }

      chrome.alarms.create('demo-default-alarm', {
        delayInMinutes: 0.1
      });

        sendResponse({farewell: "goodbye"})
    }
  }
);

chrome.alarms.onAlarm.addListener((alarm) => {
  let options = {
    type: 'basic',
    title: 'ALARM WENT OFF',
    message: 'This is a Basic Notification',
    iconUrl: 'https://static.wikia.nocookie.net/leagueoflegends/images/7/74/Flash.png/revision/latest?cb=20180514003149'
  };
  // @ts-ignore
  chrome.notifications.create(options);
});

let serviceEnabled : boolean = true

let now = moment()


var interval = setInterval(()=> {
  if(now.isSameOrAfter(triggerTime)) {
    console.log('triggered')
    openLinks(urlArray)
    triggerTime = moment().day(7)
    now = moment()
  } else
    now = moment()
    // console.log(now)
}, 1000);
export default function setLocalStorage(name, urlArray, frequency, triggerTime) {
    let loadoutObj : object = { [name] : {
        urls: urlArray,
        frequency: frequency,
        triggerTime: triggerTime,
      }}
      

      chrome.storage.local.set( loadoutObj )
      console.log(loadoutObj)
}
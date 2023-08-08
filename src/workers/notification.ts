export default function notification(type, title, message, iconUrl) {
    let options = {
        type: type,
        title: title,
        message: message,
        iconUrl: iconUrl
    };
    chrome.notifications.create(options);
}
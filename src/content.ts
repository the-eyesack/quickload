export {}
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	console.log('cutie patootie')
		if (request.greeting === "sendURL") {
			let options = {
				type: 'basic',
				title: 'Basic Notification',
				message: 'This is a Basic Notification',
				iconUrl: 'https://static.wikia.nocookie.net/leagueoflegends/images/7/74/Flash.png/revision/latest?cb=20180514003149'
			};
			// @ts-ignore
			chrome.notifications.create(options);
			sendResponse({farewell: 'eat ass'});
		}
	}
)
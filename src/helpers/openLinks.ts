export default function openLinks(arr) {
	for (let i = 0;  i < arr.length; i++) {
		chrome.tabs.create({url: arr[i], active: false, index: i})
	}

}
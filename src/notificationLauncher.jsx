import { useEffect } from "react"

export const NotificationLauncher = () => {
    useEffect(() => {
        document.getElementById('b').addEventListener('click', async () => {
            console.log('clicked')
            const response = await chrome.runtime.sendMessage({greeting: "hello"});
            console.log(response);
        })
    })
    return (
        <button type='button' id="b">NOTIFICATION</button>
    )
}
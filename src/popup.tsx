import { NotificationLauncher } from "~notificationLauncher"
import Home from "./home"
import "./style.css"
import Store from '~store';

function IndexPopup() {
  return (
    <body className="p-4 w-96">
    <Store>
      <Home/>
      <NotificationLauncher/>
    </Store>
    </body>
  )
}

export default IndexPopup

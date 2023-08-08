import Home from "./components/home"

import "./style.css"

import Store from "~helpers/store"

function IndexPopup() {
  return (
    <body className="p-4 w-fit">
      <Store>
        <Home />
      </Store>
    </body>
  )
}

export default IndexPopup

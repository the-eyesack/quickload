import React, { useState } from "react"

import openLinks from "~helpers/openLinks"

const LinkSelect = (props) => {
  const [url, setURL] = useState("")
  function handleURLadd(e) {
    e.preventDefault()

    try {
      new URL(url)
      props.setURLArray([...props.urlArray, url])
    } catch {
      console.log("Careful! This is an invalid URL.")
    }
  }

  function removeURL(index) {
    props.setURLArray(props.urlArray.filter((url, i) => i !== index))
  }

  return (
    <section className={"my-10"}>
      <h1>Links</h1>
      <form onSubmit={handleURLadd} className={"flex"}>
        <input
          autoComplete="off"
          id="link"
          className="m-0 border-2 mr-4"
          placeholder="Add URL here"
          value={url}
          onChange={(e) => setURL(e.target.value)}></input>
        <button>Add</button>
      </form>
      <h3 className={"border-t-2 mt-4 border-primary"}>Added Links</h3>
      <ul className={"overflow-clip block"}>
        {props.urlArray.map((url: string, index: number) => {
          return (
            <li
              key={index}
              id={url}
              className="flex justify-between p-1 m-2 h-12 group mx-4">
              <a
                href={url}
                target={"_blank"}
                className={"overflow-ellipsis hover:text-blue-700"}>
                {url}
              </a>
              <button
                onClick={() => removeURL(index)}
                className="group-hover:block hidden h-10">
                Delete
              </button>
            </li>
          )
        })}
      </ul>
      <button className="border-2" onClick={() => openLinks(props.urlArray)}>
        Test Links
      </button>
    </section>
  )
}

export default LinkSelect

import "../style.css"

import is from "@sindresorhus/is"
import moment from "moment"
import React, { useContext, useEffect, useState } from "react"

import LinkSelect from "~components/linkSelect"
import LoadoutInfo from "~components/loadoutInfo"
import TimeSelect from "~components/timeSelect"
import { Context } from "~helpers/store"

import number = is.number

export default function Home() {
  moment().format()

  const [prevQuickload, setPrevQuickload] = useState({})
  const [triggerTime, setTriggerTime] = useState([])
  //receieve data from storage
  chrome.storage.local.get().then((res) => {
    setPrevQuickload(structuredClone(res))
  })

  const [showDelete, setShowDelete] = useState(false)
  const [urlArray, setURLArray] = useState([])
  const [loadout, setLoadout] = useState("")
  const [frequency, setFrequency] = useState(15000)
  const [state, dispatch] = useContext(Context)

  const [creatingNewLoadout, setCreatingNewLoadout] = useState(true)

  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)

  async function handleSubmit(e) {
    e.preventDefault()
    if (loadout !== "") {
      const response = await chrome.runtime.sendMessage({
        greeting: "sewer",
        urlArray: urlArray,
        time: state,
        name: loadout,
        frequency: frequency
      })
      setLoadout("")
    } else {
      alert("Please select an activation type and enter a name.")
    }
  }
  async function loadLoadout(e) {
    e.preventDefault()
    setShowDelete(true)
    setLoadout(e.target.loadLoadout.value)
    setURLArray(prevQuickload[e.target.loadLoadout.value].urls)
    console.log(prevQuickload[e.target.loadLoadout.value])
    setTriggerTime(prevQuickload[e.target.loadLoadout.value].triggerTime)
    setCreatingNewLoadout(false)
  }

  function createNewLoadout(e) {
    e.preventDefault()
    setCreatingNewLoadout(true)
    setLoadout("")
    setURLArray([])
    setTriggerTime([])
  }

  return (
    <main className={"bg-background"}>
      <h1 className={"font-bold"}>Quickload</h1>
      <button
        onClick={(e) => {
          e.preventDefault()
          chrome.permissions.request(
            {
              permissions: ["geolocation"]
            },
            (res) => {
              console.log(res)
            }
          )
        }}>
        location
      </button>
      {/* get old loadouts */}
      {Object.keys(prevQuickload).length !== 0 ? (
        <section>
          <h2>Previous Loadouts</h2>
          <form className="flex justify-between" onSubmit={loadLoadout}>
            <ul className={"flex"}>
              {Object.keys(prevQuickload).map((item, index) => {
                return (
                  <li key={index}>
                    <input
                      type={"radio"}
                      name={"loadLoadout"}
                      value={item}
                      id={item}
                      className="fixed opacity-0 w-max peer"
                    />
                    <label
                      htmlFor={item}
                      className={
                        "peer-checked:bg-primary peer-checked:border-accent peer-focused:border-accent inline-block bg-white border-2 mr-2 my-1 hover:bg-secondary rounded-md px-2"
                      }>
                      {item}
                    </label>
                  </li>
                )
              })}
            </ul>

            <button>Load</button>
          </form>
        </section>
      ) : null}

      {creatingNewLoadout ? (
        <section>
          <h2>Create New Loadout</h2>
          <form>
            <label htmlFor="loadoutName">Loadout Name</label>
            <input
              autoComplete="off"
              id="loadoutName"
              value={loadout}
              required
              onChange={(e) => setLoadout(e.target.value)}
              className="border-2"></input>
            <br />
            <label className={"mt-2"}>Period (ms)</label>
            <input
              type={"number"}
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="border-2"
            />

            <div>
              <h2>Activation Technique</h2>
              <input
                name={"activation"}
                type={"radio"}
                value={"time"}
                className={"peer/time"}
                defaultChecked
              />
              <label htmlFor={"time"}>Time</label>

              <input
                name={"activation"}
                type={"radio"}
                value={"location"}
                className={"peer/location"}
              />
              <label htmlFor={"location"}>Location</label>

              <div className={"peer-checked/location:block hidden"}>
                <h3>Select Location</h3>
                <div>
                  <input
                    value={longitude}
                    type={"number"}
                    placeholder={"longitude"}
                    onChange={(e) => setLongitude(parseInt(e.target.value))}
                  />
                  <input
                    value={latitude}
                    type={"number"}
                    placeholder={"latitude"}
                    onChange={(e) => setLatitude(parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className={"peer-checked/time:block hidden"}>
                <h3>Select Time</h3>

                <div className="border-2 border-primary rounded-xl">
                  <TimeSelect />
                </div>
              </div>
            </div>
          </form>
        </section>
      ) : (
        <button onClick={createNewLoadout}>Create New Loadout</button>
      )}

      {Object.keys(prevQuickload).length !== 0 && showDelete ? (
        <button
          onClick={(e) => {
            e.preventDefault()
            chrome.storage.local.remove(loadout)
            setShowDelete(false)
          }}>
          Delete Loadout
        </button>
      ) : null}

      <LinkSelect urlArray={urlArray} setURLArray={setURLArray} />
      <button
        id="submitForm"
        onClick={handleSubmit}
        className="border-2 text-lg font-semibold ml-auto mr-auto block w-24 h-10">
        Create!
      </button>

      <LoadoutInfo loadout={loadout} triggerTime={triggerTime} />
      <a
        href={"https://github.com/the-eyesack/quickload"}
        className={"hover:text-accent"}>
        GitHub
      </a>
    </main>
  )
}

import { useContext } from "react"

import { ACTIONS } from "~helpers/reducer"
import { Context } from "~helpers/store"

export default function TimeSelect() {
  const [state, dispatch] = useContext(Context)

  const daysOfTheWeek: Array<string> = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  return (
    <div>
      {daysOfTheWeek.map((item, index) => (
        <div className={"flex p-2 h-12"} key={index}>
          <div className={"inline-block"}>
            <input
              type="checkbox"
              id={item}
              name={item}
              onChange={() => dispatch({ type: ACTIONS.DAY, day: item })}
              className={"peer align-middle"}
            />
            <label htmlFor={item} className={"pl-1 align-middle"}>
              {item}
            </label>

            <input
              type={"time"}
              className={"hidden peer-checked:inline"}
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.TIME,
                  time: e.target.value,
                  day: item
                })
              }
            />
          </div>
        </div>
      ))}
    </div>
  )
}

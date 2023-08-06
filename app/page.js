'use client'
import React, { useEffect, useState } from 'react'

export default function Home() {
  const [submit, setSubmit] = useState(false)
  const [urlArray, setURLarray] = useState([])
  const [url, setURL] = useState('')


  // useEffect(() => {
  //   window.open('http://www.google.com','_blank')
  //   setSubmit(false)
  // }, [submit])

  function handleURLadd(e) {
    e.preventDefault()
    console.log('submit')
    setURLarray([...urlArray, url])
    try {
      new URL(url)
    }
    catch {
      console.log('Careful! This is an invalid URL.')
    }
  }

  function removeURL(index) {
    setURLarray(urlArray.filter((url, i) => i !== index))
  }

  function handleSubmit() {
    alert(`Submitted! ${loadout} is loaded with URLs: ${urlArray}.`)
  }

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const [loadout, setLoadout] = useState('')

  return (
    <main>
      <h1>Quickload</h1>
      <form>
        <label htmlFor='loadoutName'>Loadout Name</label>
        <input id='loadoutName' value={loadout} onChange={e => setLoadout(e.target.value)} className='border-2'></input>
        <div>
          <p>Activation Style</p>
          <input name='activationType' type='radio' id='location' value='location'/>
          <label htmlFor='Location'>Location</label>
          <input name='activationType' type='radio' id='time' value='time' className='peer'/>
          <label htmlFor='time'>Time</label>

          <div className='hidden peer-checked:block border-2'>
            <h1>TIME</h1>
            <ul>
              {days.map((day, index) => {return (
                <li key={index}>
                  <input id='day' type='checkbox' className='peer'/>
                  <label htmlFor='day' >{day}</label>
                  <input type='time' className='hidden peer-checked:inline ml-2'/>
                </li>
              )})}

            </ul>

          </div>
        </div>
      </form>

      <form onSubmit={handleURLadd}>
        <label htmlFor='link'>Link</label>
        <input id='link' className='border-2' placeholder='Add URL here' value={url} onChange={e => setURL(e.target.value)}></input>
        <button>Add</button>
      </form>

      <section>
        <h1>added links</h1>
        <ul>
          {urlArray.map((url, index) => {return (
            <li key={index} id={url} className='hover:bg-gray-400 flex justify-between p-2 group mx-4'>
              {url}
              <button onClick={()=>removeURL(index)} className='group-hover:block hidden'>Delete</button>
            </li>)})}
        </ul>
        <button className='border-2'>Test Links</button>
      </section>

      <button onClick={handleSubmit}>Submit</button>
      {/* <input type='time'></input>
      <button onClick={handleSubmit} className='border-2'>Button (TEMPORARY)</button> */}
    </main>
  )
}

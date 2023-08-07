import './style.css'
import React, {useContext, useEffect, useState} from 'react';
import TimeSelect from '~components/timeSelect';
import LinkSelect from '~components/linkSelect';
import {Context} from '~store';

export default function Home() {
   const [urlArray, setURLArray] = useState([])

  const days: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const [loadout, setLoadout] = useState('')

  const [state, dispatch] = useContext(Context);


   async function handleSubmit() {
      // alert(`${loadout} is ready to go! It will launch ${urlArray} on ${JSON.stringify(state)}`)
       console.log('clicked')
       const response = await chrome.runtime.sendMessage({greeting: "sewer"});
       console.log(response);

  }

  return (
    <main>
      <h1>Quickload Plasmo</h1>
      <form>
        <label htmlFor='loadoutName'>Loadout Name</label>
        <input id='loadoutName' value={loadout} required onChange={e => setLoadout(e.target.value)} className='border-2'></input>
        <div>
          <p>Activation Style</p>
          <input name='activationType' type='radio' id='location' value='location'/>
          <label htmlFor='Location'>Location</label>
          <input name='activationType' type='radio' id='time' value='time' className='peer'/>
          <label htmlFor='time'>Time</label>

          <div className='hidden peer-checked:block border-2'>
            <TimeSelect days={days}/>
          </div>
        </div>
      </form>
        <LinkSelect urlArray={urlArray} setURLArray={setURLArray}/>
      <button id='submitForm' type={'button'} onClick={handleSubmit} className='border-2'>Button (TEMPORARY)</button>
    </main>
  )
}
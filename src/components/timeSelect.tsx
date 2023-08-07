import {Context} from '~store';
import { useContext } from 'react';
import {ACTIONS} from '~reducer';
export default function TimeSelect() {

	const [state, dispatch] = useContext(Context);

	const daysOfTheWeek: Array<string> = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

	return (
		<div>

			{daysOfTheWeek.map((item, index) => (
				<div>
					<input type="checkbox" id={item} name={item} onChange={()=> dispatch({ type: ACTIONS.DAY, day: item })} className={'peer'}/>
					<label htmlFor={item}>{item}</label>
					<input type={'time'} className={'hidden peer-checked:inline'} onChange={ (e)=> dispatch({ type: ACTIONS.TIME, time: e.target.value, day: item } )}/>
				</div>
			))}
		</div>
	)
}
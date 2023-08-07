export const ACTIONS = {TIME: 'timeEdit', DAY: 'dayEdit'}
function Reducer(state: any, action: any) {
	let newState: object
	switch (action.type) {
		case ACTIONS.TIME:
			newState = {...state, [action.day]: {active: state[action.day].active, time: action.time}}
			break;
		case ACTIONS.DAY:
			newState = {...state, [action.day]: {active: !state[action.day].active, time: state[action.day].time}}
			break;
		default:
			alert('Something went wrong!')
			return state
	}
	console.log(newState)
	return newState

}

export default Reducer
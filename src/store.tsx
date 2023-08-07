import React, { createContext, useReducer} from 'react';
import Reducer from '~reducer';
const initialState = {
	Sunday: {active: false, time: undefined},
	Monday: {active: false, time: undefined},
	Tuesday: {active: false, time: undefined},
	Wednesday: {active: false, time: undefined},
	Thursday: {active: false, time: undefined},
	Friday: {active: false, time: undefined},
	Saturday: {active: false, time: undefined}
}
const Store = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, initialState);
	return (
		<Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
	);
};

export const Context = createContext(initialState)
export default Store;

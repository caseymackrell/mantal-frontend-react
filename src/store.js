import { createStore } from 'redux'

const initialState = {
	phoneNumber: '+1',
	token: '',
	userId: '6390014286398787de94b09d',
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_PHONE_NUMBER':
			return { ...state, phoneNumber: action.phoneNumber }
		case 'SET_TOKEN':
			return { ...state, token: action.token }
		case 'SET_WORKOUT':
			return { ...state, workoutId: action.payload }
		case 'SET_ID':
			return { ...state, userId: action.payload }
		default:
			return state
	}
}

export default createStore(reducer)

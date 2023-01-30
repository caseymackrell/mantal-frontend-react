/* eslint-disable no-case-declarations */
import { createStore } from 'redux'

const initialState = {
	phoneNumber: '+1',
	token: '',
	userId: '6390014286398787de94b09d',
	sets: [],
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
		case 'ADD_SET':
			return { ...state, sets: [...state.sets, action.set] }
		case 'UPDATE_SET':
			const updatedSets = state.sets.map((set, i) => {
				if (i === action.index) {
					return action.set
				}
				return set
			})
			return { ...state, sets: updatedSets }
		default:
			return state
	}
}

export default createStore(reducer)

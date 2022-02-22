import {
  PROGRESSION,
  PROGRESSION_RESET,
} from '../constants/progressionConstants'

export const progressionReducer = (state = { progression: 10 }, action) => {
  switch (action.type) {
    case PROGRESSION:
      return { progression: action.payload }
    case PROGRESSION_RESET:
      return { progression: 0 }
    default:
      return state
  }
}

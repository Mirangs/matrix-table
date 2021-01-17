import { combineReducers } from 'redux'
import table from './table/reducer'

export const rootReducer = combineReducers({
  table,
})

export type RootState = ReturnType<typeof rootReducer>

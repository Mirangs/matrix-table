import { SET_CLOSEST_AMOUNT_CELLS, SET_TABLE_COLS, SET_TABLE_ROWS, TableActionTypes } from './types'

const initialState = {
  tableRows: 3,
  tableCols: 3,
  closestCellsAmount: 3,
}

export default function (state = initialState, action: TableActionTypes): typeof initialState {
  switch (action.type) {
    case SET_TABLE_COLS:
      return {
        ...state,
        tableCols: action.payload,
      }
    case SET_TABLE_ROWS:
      return {
        ...state,
        tableRows: action.payload,
      }
    case SET_CLOSEST_AMOUNT_CELLS:
      return {
        ...state,
        closestCellsAmount: action.payload,
      }
    default:
      return state
  }
}

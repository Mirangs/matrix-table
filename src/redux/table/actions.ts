import { SET_CLOSEST_AMOUNT_CELLS, SET_TABLE_ROWS, SET_TABLE_COLS, TableActionTypes } from './types'

export const setTableRows = (tableRows: number): TableActionTypes => ({
  type: SET_TABLE_ROWS,
  payload: tableRows,
})

export const setTableCols = (tableCols: number): TableActionTypes => ({
  type: SET_TABLE_COLS,
  payload: tableCols,
})

export const setClosestAmountCells = (amount: number): TableActionTypes => ({
  type: SET_CLOSEST_AMOUNT_CELLS,
  payload: amount,
})

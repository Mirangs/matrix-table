export const SET_TABLE_ROWS = 'SET_TABLE_ROWS'
export const SET_TABLE_COLS = 'SET_TABLE_COLS'
export const SET_CLOSEST_AMOUNT_CELLS = 'SET_CLOSEST_AMOUNT_CELLS'

interface defaultAction {
  payload: number
}

interface SetTableRowsAction extends defaultAction {
  type: typeof SET_TABLE_ROWS
}

interface SetTableColsAction extends defaultAction {
  type: typeof SET_TABLE_COLS
}

interface SetClosestAmountCells extends defaultAction {
  type: typeof SET_CLOSEST_AMOUNT_CELLS
}

export type TableActionTypes = SetTableRowsAction | SetTableColsAction | SetClosestAmountCells

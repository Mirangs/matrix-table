import { setClosestAmountCells, setTableCols, setTableRows } from '../../redux/table/actions'
import React, { SyntheticEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import Styles from './Styles.style'

interface TableControlsProps {
  maxClosestCellsAmount: number
}

const TableControls: React.FC<TableControlsProps> = ({ maxClosestCellsAmount }) => {
  const dispatch = useDispatch()
  const {
    table: { tableRows, tableCols, closestCellsAmount },
  } = useSelector((state: RootState) => ({
    table: state.table,
  }))
  const [closestCells, setClosestCells] = useState(`${closestCellsAmount}`)

  const handleClosestCellsChange = (evt: { target: HTMLInputElement }) => {
    const value = evt.target.value.replace(/\D/g, '')
    setClosestCells(value)
  }

  const handleClosestCellsBlur = () => {
    let value = +closestCells || 1
    if (value <= 0) {
      value = 1
    }
    if (value >= 11) {
      value = 10
    }

    if (value >= maxClosestCellsAmount) {
      value = maxClosestCellsAmount
    }

    setClosestCells(`${value}`)
  }

  const handleClosestCellsSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault()
    handleClosestCellsBlur()
    dispatch(setClosestAmountCells(+closestCells))
  }

  return (
    <Styles>
      <section className="row">
        <button onClick={() => dispatch(setTableRows(tableRows + 1))} disabled={tableRows >= 10}>
          Add new row
        </button>
        <button onClick={() => dispatch(setTableRows(tableRows - 1))} disabled={tableRows <= 1}>
          Remove row
        </button>
        <button onClick={() => dispatch(setTableCols(tableCols + 1))} disabled={tableCols >= 10}>
          Add new col
        </button>
        <button onClick={() => dispatch(setTableCols(tableCols - 1))} disabled={tableCols <= 1}>
          Remove col
        </button>
      </section>
      <form onSubmit={handleClosestCellsSubmit}>
        <input type="text" value={closestCells} onChange={handleClosestCellsChange} onBlur={handleClosestCellsBlur} />
        <button type="submit">Set closest cells amount</button>
      </form>
    </Styles>
  )
}

export default TableControls

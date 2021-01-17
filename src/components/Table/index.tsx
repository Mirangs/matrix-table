import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import TableControls from '../TableControls'
import Styles from './Styles.style'

import { generateTableCell } from '../../helpers/generateTableCell'
import { CELL_HEIGHT } from './constants'

const Table: React.FC = () => {
  const { tableColsAmount, tableRowsAmount, closestCellsAmount } = useSelector((state: RootState) => ({
    tableColsAmount: state.table.tableCols,
    tableRowsAmount: state.table.tableRows,
    closestCellsAmount: state.table.closestCellsAmount,
  }))

  const [tableData, setTableData] = useState<[][]>([])

  const [sumRows, setSumRows] = useState<number[]>([])
  const [averageCols, setAverageCols] = useState<number[]>([])
  const [cellsToHighlight, setCellsToHighlight] = useState<any[]>([])
  const [shouldHighlightCells, setShouldHighlightCells] = useState(false)
  const [percentageCells, setPercentageCells] = useState<any[]>([])

  useEffect(() => {
    setSumRows([])
    const tableDataTemp: any[] = []
    let tempSumRows: number[] = []
    let tempAverageCols: number[] = []

    for (let i = 0; i < tableRowsAmount; i++) {
      tableDataTemp[i] = []
      let tempSumRow = 0
      for (let j = 0; j < tableColsAmount; j++) {
        tableDataTemp[i][j] = generateTableCell()
        tempSumRow += tableDataTemp[i][j].value
      }

      tempSumRows = [...tempSumRows, tempSumRow]
    }

    for (let i = 0; i < tableColsAmount; i++) {
      let currentColSum = 0
      for (let j = 0; j < tableRowsAmount; j++) {
        currentColSum += tableDataTemp[j][i].value
      }
      tempAverageCols = [...tempAverageCols, Number((currentColSum / tableColsAmount).toFixed(2))]
    }

    setSumRows(tempSumRows)
    setAverageCols(tempAverageCols)
    setTableData(tableDataTemp)
  }, [tableColsAmount, tableRowsAmount])

  const handleCellClick = (id: string, col: number, row: number) => {
    setTableData(
      tableData.map((tableCol) =>
        tableCol.map((tableCell: { id: string; value: number }) => {
          if (tableCell.id === id) {
            return {
              ...tableCell,
              value: tableCell.value + 1,
            }
          }

          return tableCell
        })
      ) as any
    )

    const averageColsTemp = [...averageCols]
    const sumRowsTemp = [...sumRows]

    sumRowsTemp[row] = sumRowsTemp[row] + 1
    averageColsTemp[col] = Number(((averageColsTemp[col] * tableColsAmount + 1) / tableColsAmount).toFixed(2))

    setAverageCols(averageColsTemp)
    setSumRows(sumRowsTemp)
  }

  const handleCellMouseEnter = (id: string, value: number) => {
    let tableDataFlat = tableData.flat().filter((item: { id: string }) => item.id !== id)
    let resValues: any[] = []

    for (let i = 0; i < closestCellsAmount; i++) {
      let currentDiff = Infinity
      let closestCandidate = { id: null }

      for (let j = 0; j < tableDataFlat.length; j++) {
        const currentTableItem = tableDataFlat[j] as any
        if (Math.abs(value - currentTableItem.value) <= currentDiff) {
          closestCandidate = currentTableItem as any
          currentDiff = Math.abs(value - currentTableItem.value)
        }
      }

      tableDataFlat = tableDataFlat.filter((item: { id: string }) => item.id !== closestCandidate.id)
      resValues = [...resValues, closestCandidate.id]
    }

    setShouldHighlightCells(true)
    setCellsToHighlight(resValues)
  }

  const handleCellMouseLeave = () => {
    setShouldHighlightCells(false)
    setCellsToHighlight([])
  }

  const handleSumMouseEnter = (row: number) => {
    let res: number[] = []

    for (let i = 0; i < tableColsAmount; i++) {
      const currentItem = tableData[row][i] as any
      res = [...res, { ...currentItem, value: Number((currentItem.value / sumRows[row]).toFixed(4)) }]
    }

    setPercentageCells(res)
  }

  const handleSumMouseLeave = () => {
    setPercentageCells([])
  }

  return (
    <Styles>
      <TableControls maxClosestCellsAmount={tableData.flat().length - 1} />
      <table>
        <tbody>
          {tableData.map((tableItem, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {tableItem.map(({ value, id }: { value: number; id: string }, colIndex) => {
                  let classes: string[] = []
                  let percentageHeight = 0
                  if (cellsToHighlight.includes(id) && shouldHighlightCells) {
                    classes = [...classes, 'highlighted']
                  }
                  const percentageItem = percentageCells.find(
                    ({ id: percentageId }: { id: string }) => percentageId === id
                  )
                  let percentageValue = 0
                  if (percentageItem) {
                    classes = [...classes, 'percentage']
                    percentageHeight = Math.round(CELL_HEIGHT * percentageItem.value)
                    percentageValue = Number((percentageItem.value * 100).toFixed(2))
                  }

                  return (
                    <td
                      key={id}
                      onMouseEnter={() => handleCellMouseEnter(id, value)}
                      onMouseLeave={handleCellMouseLeave}
                      onClick={() => handleCellClick(id, colIndex, rowIndex)}
                      className={classes.join(' ')}
                    >
                      {!!percentageHeight && <div className="fill-block" style={{ height: `${percentageHeight}px` }} />}
                      {!!percentageHeight ? `${percentageValue}%` : value}
                    </td>
                  )
                })}
                <td
                  className="sum"
                  onMouseEnter={() => handleSumMouseEnter(rowIndex)}
                  onMouseLeave={handleSumMouseLeave}
                >
                  {sumRows[rowIndex]}
                </td>
              </tr>
            )
          })}

          <tr>
            {averageCols.map((col, index) => (
              <td key={index}>{col}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </Styles>
  )
}

export default Table

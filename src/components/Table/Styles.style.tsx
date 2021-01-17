import styled from 'styled-components'
import { CELL_HEIGHT } from './constants'

const Styles = styled.section`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    border-collapse: collapse;

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      width: 75px;
      height: ${CELL_HEIGHT}px;
      box-sizing: border-box;
    }

    .highlighted {
      background-color: #c24a6a;
    }

    .percentage {
      position: relative;

      .fill-block {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #e697aa;
        z-index: -1;
      }
    }
  }
`

export default Styles

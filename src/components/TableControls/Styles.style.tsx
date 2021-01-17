import styled from 'styled-components'

const Styles = styled.section`
  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    button {
      margin-right: 20px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    max-width: 200px;
    margin: 20px auto;

    input {
      margin-bottom: 10px;
      padding: 10px;
    }
  }

  button {
    margin: 0;

    border: 2px solid rgb(118, 118, 118);
    border-radius: 3px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #ffffff;

    &:hover {
      background-color: #4caf50;
      color: white;
    }
  }
`

export default Styles

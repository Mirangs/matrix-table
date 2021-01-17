import { v4 as uuidv4 } from 'uuid'

const generateRandomNumber = (min = 100, max = 1000) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export const generateTableCell = () => ({
  id: uuidv4(),
  value: generateRandomNumber(),
})

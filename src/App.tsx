import { useState, MouseEvent } from 'react'
import './App.css'

function App() {
  type coordinateArrayType = {
    x: number
    y: number
    id: number
  }

  const [coordinateArray, setCoordinateArray] = useState<coordinateArrayType[]>(
    [],
  )

  const [redoStack, setRedoStack] = useState<coordinateArrayType[]>([])

  const handleCanvasClick = (e: MouseEvent) => {
    const x = Math.max(0, e.clientX - 15)
    const y = Math.max(0, e.clientY - 15)
    const id = coordinateArray.length + 1
    setCoordinateArray((oldArr) => [...oldArr, { x, y, id }])
    setRedoStack((oldArr) => [])
  }

  const handleUndo = () => {
    if (coordinateArray.length > 0) {
      const lastItem = coordinateArray.pop()!
      setCoordinateArray((oldArray) =>
        oldArray.filter((item) => item !== lastItem),
      )
      setRedoStack((oldArr) => [...oldArr, lastItem])
    }
  }

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const lastItem = redoStack.pop()!
      setRedoStack((oldArray) => oldArray.filter((item) => item !== lastItem))
      setCoordinateArray((oldArr) => [
        ...oldArr,
        { x: lastItem.x, y: lastItem.y, id: oldArr.length + 1 },
      ])
    }
  }
  return (
    <>
      <div className="buttons">
        <button onClick={handleUndo} disabled={coordinateArray.length == 0}>
          Undo
        </button>
        <button onClick={handleRedo} disabled={redoStack.length == 0}>
          Redo
        </button>
      </div>
      <div className="canvas" onClick={handleCanvasClick}>
        {coordinateArray.map((coordinate) => {
          return (
            <div
              key={coordinate.id}
              className="dot"
              style={{ left: coordinate.x, top: coordinate.y }}
            />
          )
        })}
      </div>
    </>
  )
}

export default App

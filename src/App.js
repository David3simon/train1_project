import React from "react";
import { useState } from "react";

const App = () => {
  const [left,setLeft] = useState(0)
  const [right,setRight] = useState(0)
  const [all,setAll] = useState([])

  const handleLeftClick = () => {
    setLeft(left+1)
    setAll(all.concat('L'))
  }
  const handleRightClick = () => {
    setRight(right+1)
    setAll(all.concat('R'))
  }

  return (
    <>
      <button onClick={handleLeftClick}>left:{left}</button>
      <button onClick={handleRightClick}>right:{right}</button>
      <p>{all.join(' ')}</p>
    </>
  )
}

export default App
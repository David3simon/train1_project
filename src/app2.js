import React from "react";
import { useState } from "react"; 

const App = () => {
  const [good,goodCount] = useState(0)
  const [netural,neturalCount] = useState(0)
  const [bad,badCount] = useState(0)

  const handleGoodChange = () => {
    goodCount( good + 1)
  }
  const handleNeturalChange = () => {
    neturalCount( netural + 1)
  }
  const handleBadChange = () => {
    badCount( bad + 1)
  }


  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGoodChange} name="good" />
      <Button onClick={handleNeturalChange} name="netural" />
      <Button onClick={handleBadChange} name="bad" />
      <table>
        <caption><h1>statistic</h1></caption>
        <thead></thead>
        <tbody>
          <Statistics 
          good={good} 
          netural={netural}
          bad={bad}
          />
        </tbody>
      </table>
      
    </>
  )
}
// 二级组件--- 数据显示模块组件
const Statistics = (props) => {
  let all = props.good + props.netural + props.bad
  if(all === 0) {
    return (
      <h3>No feedback given</h3>
    )
  }
  let average = ((props.good - props.bad)/all).toFixed(1)
  let postive = (props.good/all*100).toFixed(1)
  return (
    <>
      <StatisticsLine text="good" value={props.good} />
      <StatisticsLine text="netural" value={props.netural} />
      <StatisticsLine text="bad" value={props.bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={postive + "%"} />
    </>
  )
}
// 二级组件--- 数据提交按钮模块组件
const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.name}</button>
  )
}

// 三级组件 --- 数据渲染模块组件
const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

export default App
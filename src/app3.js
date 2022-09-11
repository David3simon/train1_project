import React from "react";
import { useState } from "react";

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const length = anecdotes.length

  const arrayVotes = Array(length).fill(0)
  
  // 储存名言状态值
  const [selected,setSelected] = useState(0)
  // 储存名言投票状态列表
  const [VoteList,setVoteList] = useState(arrayVotes)
  // 储存当前名言投票数量
  const [vote,setVote] = useState(0)
  // 储存投票量最大的名言序号 多名言只显示第一条
  const [maxVotes,setMax] = useState(0)

  const copy = [...VoteList]

  const handleSelectedChange = () => {
    const num = Math.floor(Math.random()*length + 1) - 1
    setSelected(num)
    setVote(copy[num])
  }

  const handleVoteChange = () => {
    copy[selected] += 1
    // 获得最大值
    const max = Math.max(...copy)
    // 获得最大值下标
    const index = copy.indexOf(max)
    // 更新序号状态值
    setMax(index)
    // 更新votelist
    setVoteList(copy)
    // 更新当前页面投票值
    setVote(copy[selected])
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{ anecdotes[selected] }</p>
      <p>has {vote} notes</p>
      <button onClick={handleVoteChange}>vote</button>
      <button onClick={handleSelectedChange}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{ anecdotes[maxVotes] }</p>
      <p>has {VoteList[maxVotes]} notes</p>
    </div>
  )
}

export default App
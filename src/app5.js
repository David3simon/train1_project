import React from "react";
import { useState,useEffect } from "react";

import { getAll,update,create } from './services/note.js'

import Note from './components/note.js'
import Notification from './components/notification.js'
import  Footer from './components/Footer.js'

const App = () => {
  // 储存笔记数据
  const [notes, setNotes] = useState([])

  // 储存用户提交的新笔记
  const [ newNote, setNewNote ] = useState('')

  // 储存笔记显示状态
  const [ showAll, setShowAll ] = useState(true)

  // 储存错误信息
  const [ msg, setMsg] = useState('')
  const [ status, setStatus] = useState(0)

  useEffect(()=>{
    getAll().then( initialNotes => {
      setNotes(initialNotes)
    })
  },[])

  const noteToShow = showAll?notes:notes.filter(note => note.important)

  // 创建新笔记对象
  const addNote = (e) => {
    e.preventDefault();
    
    const newObj = {
      content: newNote,
      data: new Date(),
      important: Math.random()>0.5
    }
    create(newObj)
    .then(returnedNote => {
      // console.log(res);
      setNotes(notes.concat(returnedNote))
      setNewNote('')
      handleMsgChange(`add note ${returnedNote.content} success!`)
    })
    
  }

  const handleNoteChange = (e) => {
    let value = e.target.value.trimLeft()
    setNewNote(value)
  }
  // msg显示处理函数
  const handleMsgChange = (m,s=0) => {
    setMsg(m)
    setStatus(s)
    // 设定显示时间
    setTimeout(() => {
      setMsg(null)
    },5000)
  }
  // 更改note important属性值
  const toggleImportanceOf = (id) => {
    // console.log(id);
    // 确认查询值
    // const url = `http://localhost:3001/notes/${id}`
    // 获取更改笔记对象
    const note = notes.find(note => note.id === id)
    // 更改对象重要属性
    const changeNote = {...note,important: !note.important}
    // 通过put替换服务器上的笔记,再获取数据对本地数据修改
    update(id,changeNote).then(returnedNote => {
      setNotes(notes.map( note => note.id !== id? note : returnedNote))
      handleMsgChange(`update note ${returnedNote.content} success!`)
    }).catch(err => {
      handleMsgChange(`the note ${note.content} was already delete from server`,1)
      setNotes(notes.filter(note => note.id !== id))
    })
  }

  return (
    <>
      <h1>notes</h1>
      <Notification msg={ msg } status={status} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>show { showAll?'important':'all' }</button>
      </div>
      <ul>
        { noteToShow.map(note => (
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <form onSubmit={ addNote }>
        <input value={ newNote } onChange={ handleNoteChange } placeholder="add a new note ..." />
        <button type="submit">提交</button>
      </form>
      <Footer />
    </>
  )
}


export default App
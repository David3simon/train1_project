import axios from "axios";
// 服务器响应数据模块 直接返回数据

const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const req = axios.get(baseUrl)
  // 用于测试客户端数据与服务端数据不同步的错误捕捉
  // const obj = {
  //   content: 'a note for test',
  //   data: new Date(),
  //   important: false,
  //   id: 10000
  // }
  // return req.then(res => res.data.concat(obj))
  return req.then(res => res.data)
}

const create = newObj => {
  const req = axios.post(baseUrl,newObj)
  return req.then(res => res.data)
}

const update = (id, newObj) => {
  const req = axios.put(`${baseUrl}/${id}`,newObj)
  
  return req.then(res => res.data)
}

export {
  getAll,
  create,
  update
}
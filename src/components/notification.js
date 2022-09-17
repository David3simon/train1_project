// 信息提示模块
const Notification = ({ msg,status }) => {
  if(!msg) return null
  return (
    <div className="msg" style={status===1?{color:'red'}:{color:'green'}}>
      { msg }
    </div>
  )
}

export default Notification
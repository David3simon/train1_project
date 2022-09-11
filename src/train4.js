import React from "react";
import ReactDOM  from "react-dom/client";

class MouseMove extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: '',
      y: ''
    }
    this.mouseMove = this.mouseMove.bind(this)
  }

  mouseMove(e) {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  render() {
    return (
      <div style={{ backgroundColor: 'skyblue', height: '200vh' }} onMouseMove={this.mouseMove}>
        <p>鼠标当前x位置: {this.state.x}</p>
        <p>鼠标当前y位置: {this.state.y}</p>
      </div>
    )
  }
}

const app = ReactDOM.createRoot(document.getElementById('root'))
app.render(<MouseMove />)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/* class Square extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
  }
  render() {
    return (
      // 点击btn触发父组件Board传递过来的onClick函数
      <button 
      className="square" 
      onClick={() => { this.props.onClick() }}>  
        { this.props.value }
      </button>
    );
  }
} */
// 不需要state时,简化为函数组件
function Square(props) {
  return (
    // 点击btn触发父组件Board传递过来的onClick函数
    <button 
    className="square" 
    onClick={ props.onClick }>  
      { props.value }
    </button>
  )
}

class Board extends React.Component {
  /* constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }
  // 改变state属性值    ------ 提升到顶级组件 实现history功能
  handleClick(i) {
    const squares = this.state.squares.slice()
    // 判断是否有胜者或者点击的格子上是否有棋子
    if(calculateWinner(squares) || squares[i]) return
    squares[i] = this.state.xIsNext? 'X':'O'
    this.setState({ 
      squares:squares,
      xIsNext: !this.state.xIsNext
     })
  } */

  // 搭配对象组件
  renderSquare(i) {
    return (
      // 监听onClick事件,调用自定义函数
      <Square 
        value={ this.props.squares[i] }
        onClick={ () => (this.props.onClick(i)) } 
      />
    )
  }

  /* // 搭配函数组件
  renderSquare(i) {
    return (
      Square({
        value: this.props.squares[i],
        onClick: () => (this.props.onClick(i))
      })
    )
  } */

  render() {
    /* 移除,渲染游戏状态结构移到game组件
    
    // 判断是否三子连线,返回相应棋子
    const winner = calculateWinner(this.state.squares)
    let status
    if(winner) {
      status = 'Winner' + winner
    } else {
      status = 'Next player: '+ (this.state.xIsNext? 'X':'O')
    }
 */
    return (
      <div>
        {/* <div className="status">{status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber+1)
    const current = history[history.length-1]
    const squares = current.squares.slice()
    // 判断是否有胜者或者点击的格子上是否有棋子
    if(calculateWinner(squares) || squares[i]) return
    squares[i] = this.state.xIsNext? 'X':'O'
    this.setState({ 
      history:history.concat([{
        squares:squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
     })
  }

  jumpTo(step) {
    this.setState({
      xIsNext: (step%2) === 0,
      stepNumber: step
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)
    // 实现历史跳转功能,点击按钮跳转
    const moves = history.map((step,move) => {
      console.log(step);
      const desc = move?
      "Go to move #" + move:
      "Go to game start"
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{ desc }</button>
        </li>
      )
    })
    let status
    if(winner) {
      status = 'Winner ' + winner
      // console.log(this.state.history);
    } else {
      status = 'Next player: '+ (this.state.xIsNext? 'X':'O')
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
          squares={current.squares}
          onClick={ (i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
// 判断胜者的方法
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

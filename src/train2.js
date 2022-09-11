import React from "react";
import ReactDOM  from "react-dom/client";
import './index.css'

function BoilingVerdict(props) { 
  if(props.celsius >= 100 ) {
    return (<p>the water would boil.</p>)
  }
  return (<p>the water would not boil.</p>)
}

class Calculater extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: '',
      scale: 'c'
    }
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
  }

  handleCelsiusChange(temperature) {
    this.setState({
      temperature,
      scale: 'c'
    })
  }
  handleFahrenheitChange(temperature) {
    this.setState({
      temperature,
      scale: 'f'
    })
  }

  render() {
    const temperature = this.state.temperature
    const scale = this.state.scale
    const celsius = (scale==='f') ? tryConvert(temperature,toCelsius):temperature
    const fahrenheit = (scale==='c')? tryConvert(temperature,toFahrenheit):temperature
    return (
      <div>
        <TemperatureInput
           scale='c'
           temperature={celsius}
           onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput 
          scale='f'
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
          <BoilingVerdict 
            celsius={parseFloat(celsius)} />
      </div>
    )
  }
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit' 
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props)
    /* this.state = {
      temperature: ''
    } */
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    /* this.setState({
      temperature: e.target.value
    }) */
    this.props.onTemperatureChange(e.target.value)
  }

  render() {
    const temperature = this.props.temperature
    const scale = this.props.scale
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input
          value={temperature}
          onChange={this.handleChange}
        />
      </fieldset>
    )
  }
}

// 温度转换函数 --- 数值转换
function toCelsius(fahrenheit) { 
  return (fahrenheit-32)*5/9
 }
function toFahrenheit(celsius) { 
  return (celsius*9/5) + 32
 }
// 判断是否为空,不为空则保留三位小数并四舍五入
function tryConvert(temperature ,convert) { 
  const input = parseFloat(temperature)
  if(Number.isNaN(input)) {
    return ''
  }
  const output = convert(input)
  const rounded = Math.round(output * 1000)/1000
  return rounded.toString()
 }


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Calculater />)
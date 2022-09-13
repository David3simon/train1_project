import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import debounce1 from './search.js'
// import cors from 'cors'

const App = () => {
  // 储存服务器返回的数据
  const [ countries, setCountries ] = useState([])
  // 储存用户输入值
  const [ iptValue, setIptValue ] = useState('')
  // 储存请求状态
  const [ msg, setMsg ] = useState('')

  // 设置防抖器
  const handleValueChange = (e) => {
    debounce1(function(){
      setIptValue(e.target.value)
    },1000)()

  }

  const handleCountryView = (e) => {
    let list = []
    list = list.concat(countries[e.target.id])
    console.log(list);
    setCountries(list)
    
  }

  // 从服务器获取国家数据函数
  const dataInit = () => {
    if(iptValue) {
      // console.log(iptValue);
      let url = 'https://restcountries.com/v3.1/name/'
      setMsg('')
      try {
        axios.get(url.concat(iptValue))
        .then((res)=>{
          let copy = []
          copy = res.data.map(item => {
            let name = item.name.common
            let obj = {}
            obj[name] = item
            return obj
          })
          console.log(copy);
          setCountries(copy)
        })
        .catch((error)=>{
            setMsg(error.message)
        })
      }catch(e) {
        console.log(e);
      }
    }
  }

  useEffect(dataInit,[iptValue])

  // 储存首都天气数据
  const [weatherList,setWeatherList] = useState([])
  let capital = null
  if(countries.length===1) {
    let list
    list = Object.values(countries[0])[0]
    capital = list.capital?list.capital[0]:list.name.common
  }
  
  // 从服务器获取数据函数
  const weatherDateInit = () => {
    
    if(capital) {
      
      // 专用key
      const api_key =process.env.REACT_APP_API_KEY
      let url = `https://openweathermap.org/data/2.5/find?q=${capital}&appid=${api_key}&units=metric`
      
      try {
        axios.get(url)
        .then((res)=>{
          setWeatherList(res.data.list[0])
        })
        .catch((error)=>{
            console.log(error);
        })
      }catch(e) {
        console.log(e);
      }
    }
  }
  
  useEffect(weatherDateInit,[capital])
  

  return (
    <div>
      <span>find countries</span>
      <input type="text" placeholder="enter..." onChange={handleValueChange}></input>
      <Statistic countryList={countries} msg={msg} onClick={handleCountryView} weatherList={weatherList}/>
    </div>
  )
}
// 二级组件 --- 搜索结果视图区域
const Statistic = (props) => {
  const list = props.countryList
  // 判断是否出错
  if(props.msg) return(<h2>{ props.msg }</h2>)
  // 判断是否为空
  if(!list) return (<></>)
  // 数据只有一条
  if(list.length === 1) {
    // console.log(list);
    if(props.weatherList.length===0) return (<></>)
    let newlist = Object.values(list[0])
    return (
      <CountryView list={newlist[0]}  weatherList={props.weatherList} />
    )
  }
  // 数据在10条以内
  if(list.length<=10) {
    let i = -1
    return (
      <ul>
        { list.map(
          item => {
            // 将对象数组化
            let list = Object.values(item)[0]
            i++
            return (<li key={list.ccn3}>
              <span>{ list.name.common }</span>
              <button onClick={props.onClick} id={i}>show</button>
            </li>)
          }
            )}
      </ul>
    )
  }
  // 数据过多
  return (
    <h2>Too many matches,specify anthor filter!</h2>
  )
}

// 三级组件 --- 单一国家视图区域
const CountryView = (props) => {
  
  let lanList = []
  for (let k in props.list.languages) {
      lanList=lanList.concat(props.list.languages[k])
  }

  return (
    <>
      <h2>{props.list.name.common}</h2>
      <p><span>captial </span>{}</p>
      <p><span>area </span>{props.list.area}</p>
      <h3>Languages:</h3>
      <ol>
        {lanList.map((value,index)=><li key={index}>{value}</li>)}
      </ol>
      <img src={props.list.flags.png} alt=""/>
      <Weather list={props.weatherList}/>
    </>
  )
}
// 四级组件 -- weather组件
const Weather = (props) => {
  // console.log(props.list);
// 转换为摄氏度
  function changeToCelcius(k) {
    return (k-273.15).toFixed(2) + ' Celcius'
  }

  return (
    <>
      <h2>Weather in { props.list.name }</h2>
      <p>temperature { changeToCelcius(props.list.main.temp) }</p>
      <p>wind { props.list.wind.speed } m/s</p>
    </>
  )
}

export default App
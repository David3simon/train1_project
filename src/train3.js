import React from "react";
import  ReactDOM  from "react-dom/client";
import './index.css'
// 创建顶级组件
class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterText: '',
      inStockOnly: false
    }
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleInstockOnlyChange = this.handleInstockOnlyChange.bind(this)
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    })
  }
  handleInstockOnlyChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar 
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInstockOnlyChange={this.handleInstockOnlyChange}
        />
        <ProductTable data={DATA} 
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    )
  }
}

// 创建二级子组件 --- 搜索区域
class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleInstockOnlyChange = this.handleInstockOnlyChange.bind(this)
    this.textIpt = React.createRef()
  }

  componentDidMount() {
    this.textIpt.current.focus()
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value)
  }
  handleInstockOnlyChange(e) {
    this.props.onInstockOnlyChange(e.target.checked)
  }

  render() {
    return (
      <form>
        <input type={'text'} placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
          ref={this.textIpt}
        />
        <p>
          <input type={'checkbox'} 
            checked={this.props.inStockOnly}
            onChange={this.handleInstockOnlyChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    )
  }
}

// 创建二级组件 --- 内容区域
class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText
    const inStockOnly = this.props.inStockOnly

    const rows = []
    let lastCategory = null
    this.props.data.forEach(item => {
      // 筛选非搜索项商品
      if(item.name.indexOf(filterText) === -1) return
      // 当单选框选中时,筛选无库存商品
      if(inStockOnly && !item.stocked) return
      if(item.category!==lastCategory) {
        rows.push(
          <ProductCategoryRow 
            category={item.category}
            key={item.category}
          />
        )
      }
      rows.push(
        <ProductRow 
          product={item}
          key={item.name}
        />
      )
      lastCategory = item.category
    })

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

// 创建三级组件 --- 内容标题区域
class ProductCategoryRow extends React.Component {
  render() {
    return (
      <tr>
        <th colSpan={2}>{this.props.category}</th>
      </tr>
    )
  }
}

// 创建三级组件 --- 内容产品区域
class ProductRow extends React.Component {
  render() {
    const product = this.props.product
    // 判断是否无库存,特殊标记
    const name = product.stocked?product.name:
    <span style={{color:'red'}}>{product.name}</span>

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    )
  }
}

const DATA = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]


const app = ReactDOM.createRoot(document.getElementById('root'))
app.render(<FilterableProductTable />)
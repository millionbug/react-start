import React from 'react'
import './TestDiff.css'

interface GrandParentProps {};
interface GrandParentState {
  parentArr: {value: number, key: string}[]
};

class TestDiff extends React.Component{
  render(){
    return (
      <GrandParent></GrandParent>
    )
  }
}
export default TestDiff;

class GrandParent extends React.Component<GrandParentProps, GrandParentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      parentArr: [{value: 1, key: 'one'}, {value: 2, key: 'two'},{value: 3, key: 'three'}]
    }
  }

  itemValueAdd = (index: number) => {
    const item = this.state.parentArr[index];
    this.state.parentArr[index] = {
      ...item,
      value: item.value + 1
    }
    this.setState({
      parentArr: [...this.state.parentArr]
    })
  }

  render() {
    return (
      <div>
        {
          this.state.parentArr.map((item, index) => {
            return (
              <Parent key={item.key} value={item.value}></Parent>
            )
          })
        }
        <button onClick={() => this.itemValueAdd(1)}>点击该Parent的Value+1</button>
      </div>
    )
  }
}

class Parent extends React.Component<{value: number}> {
  render() {
    return (
      <div>
        {this.props.value}
        <Child></Child>
      </div>
    )
  }
}

class Child extends React.PureComponent {
  render() {
    return (
      <div>{new Date().toString()}</div>
    )
  }
}
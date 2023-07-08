// 类组件形式
import React, { PureComponent } from 'react'

interface IStore {
  color: string
}

interface IProps {
  username: string
  level?: number
}

// interface ISnapshot {
//   address: string
// }

// 这里的泛型有三个参数
class Demo extends PureComponent<IProps, IStore> {
  sex = '男' // 这里直接类型推断
  // 可以省略 IStore
  state: IStore = {
    color: 'red'
  }

  // 使用泛型第三个参数ISnapshot
  // getSnapshotBeforeUpdate() {
  //   return { address: '庐山' }
  // }
  // 使用泛型第三个参数ISnapshot
  // componentDidUpdate(
  //   prevProps: Readonly<IProps>,
  //   prevState: Readonly<IState>,
  //   snapshot?: ISnapshot | undefined
  // ): void {}

  // 一般不写构造函数
  // constructor(props: IProps) {
  //   super(props)
  //   this.state = {
  //     color: 'red'
  //   }
  // }

  render(): React.ReactNode {
    return (
      <>
        <div>username: {this.props.username}</div>
        <div>level: {this.props.level}</div>
        <div>state-color: {this.state.color}</div>
      </>
    )
  }
}

export default Demo

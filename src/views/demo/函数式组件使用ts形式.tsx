// 使用函数式组件形式
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  name: string
  age: number
  height?: number
}

const Demo: FC<IProps> = (props) => {
  return (
    <div>
      <div>name: {props.name}</div>
      <div>age: {props.age}</div>
      <div>height: {props.height}</div>
      <div>{props.children}</div>
    </div>
  )
}

// 默认值
Demo.defaultProps = {
  name: 'www',
  height: 1.88
}

// Demo.displayName 提示方便

// 第一种：直接对props进行类型约束
// const Demo = (props: IProps) => {
//   return (
//     <div>
//       <div>name: {props.name}</div>
//       <div>age: {props.age}</div>
//       <div>height: {props.height}</div>
//     </div>
//   )
// }
// Dome.displayName // 没有提示

export default memo(Demo)

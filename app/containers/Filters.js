import React from 'react'
import {Input} from 'antd'

export const Filters = (props) => {
  return(
    <>
      Name: <Input value={props.nameFilter} onChange={props.nameFilterChange}/>
    </>
  )
}
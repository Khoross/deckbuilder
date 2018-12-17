// @flow

import React from 'react'
import {Card} from 'antd'


export const MTGCardTemplate = (props) => {
  return (
      <Card title={props.name}>
        {props.oracle_text}
      </Card>
    )
}
// @flow

import React, {useState} from 'react'
import {Card, Popover} from 'antd'
import {CardPopover} from '.'
import cards from '../data/parsed_arena_cards.json'


const {Meta} = Card
const cardImages = require.context('../data/images/', true)

export const MTGCardTemplate = (props) => {
  const [backFace, setFace] = useState(false)
  const card = cards[props.id]

  const toggleFace = () => {
    if(cardImages.keys().includes(`./${props.id}b.jpg`)){
      setFace(~backFace)
    }
  }

  return (
      <Popover content={<CardPopover id={props.id} />} title={card.name} mouseLeaveDelay={0.3} style={{width: '50%'}}>
        <Card onClick={toggleFace}>
          <img src={cardImages(`./${props.id}${backFace?'b':''}.jpg`)} />
        </Card>
      </Popover>
    )
}
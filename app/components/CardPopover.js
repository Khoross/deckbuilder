// @flow

import React, {useState} from 'react'
import {Card} from 'antd'
import cards from '../data/parsed_arena_cards.json'

const {Meta} = Card

const Content = (props) => {
  return (
    <>
      <h5>{props.type_line}<span style={{float: 'right'}}>{props.mana_cost}</span></h5>
      {props.power ? <p>{`${props.power}/${props.toughness}`}</p> : null}
      {props.oracle_text ? <p>{props.oracle_text}</p> : null}
    </>
  )
}

const buildTypeLine = (card) => {
  console.log(card.supertype)
  console.log(card.type)
  console.log(card.subtype)
  const supertype = card.supertype.filter(tp => tp != 'Historic').join(' ')
  const type = card.type.join(' ')
  const subtype = card.subtype.join(' ')
  return `${supertype}${supertype !== '' ? ' ' : ''}${type} - ${subtype}`
}

export const CardPopover = (props) => {
  const card = cards[props.id]
  const [tab, setTab] = useState(card.card_faces ? card.card_faces[0].name : '')

  const faces = card.card_faces ? true : false
  const contentList = card.card_faces ?
    card.card_faces.reduce(
      (acc, cur) => ({[cur.name]: <Content type_line={cur.type_line} mana_cost={cur.mana_cost} power={cur.power} toughness={cur.toughness} oracle_text={cur.oracle_text}/>, ...acc}), {}) :
    false
  const tabList = card.card_faces ?
    card.card_faces.map(
      (face) => ({tab: face.name, key: face.name})) :
    false

  return (
    <>
      {
      card.card_faces ?
        <Card
          tabList={tabList}
          activeTabKey={tab}
          onTabChange={(key) => { setTab(key) }}
        >
          {contentList[tab]}
        </Card> :
        <Card>
          <Content type_line={card.type_line} mana_cost={card.mana_cost} power={card.power} toughness={card.toughness} oracle_text={card.oracle_text}/>
        </Card>
      }
    </>
  )
}
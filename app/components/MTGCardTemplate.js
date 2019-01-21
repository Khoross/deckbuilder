// @flow

import React, {useCallback} from 'react'
import {Card, Popover} from 'antd'
import {useDispatch} from 'redux-react-hook';
import {addCard, removeCard} from '../actions'
import {CardPopover} from '.'
import cards from '../data/parsed_arena_cards.json'


const {Meta} = Card
const cardImages = require.context('../data/images/', true)

export const MTGCardTemplate = ({id}) => {
  const card = cards[id]
  const dispatch = useDispatch()
  const addToDeck = useCallback(() => dispatch(addCard(id)), [id])
  const removeFromDeck = useCallback(
    (event) => {
      console.log(+Date.now())
      event.preventDefault()
      dispatch(removeCard(id))},
    [id])

  return (
      <Popover content={<CardPopover id={id} />} title={card.name} mouseLeaveDelay={0.3} style={{width: '50%'}}>
        <Card onClick={addToDeck} onContextMenu={removeFromDeck}>
          <img src={cardImages(`./${id}.jpg`)} />
        </Card>
      </Popover>
    )
}
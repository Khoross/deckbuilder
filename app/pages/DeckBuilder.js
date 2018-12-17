// @flow

import React from 'react';
import {Layout, Card} from 'antd';
import {MTGCardTemplate} from '../components'
import cards from '../data/scryfall-arena-cards-map.json'

export const DeckBuilder = () => {
  return (
      <Layout style={{height: "100vh"}}>
        <Layout.Header>Layout.HEADER</Layout.Header>
        <Layout>
          <Layout.Sider collapsible={true} collapsedWidth={0}>FILTERS</Layout.Sider>
          <Layout.Content>
            {Object.values(cards).map(card => <MTGCardTemplate name={card.name} oracle_text={card.oracle_text} key={card.id}/>)}
          </Layout.Content>
            
          <Layout.Sider>DECK SO FAR</Layout.Sider>
        </Layout>
      </Layout>
    )
}
import React, {useState} from 'react';
import {Menu, Icon} from 'antd';
import App from './containers/App';
import {DeckBuilder} from './pages';

export default () => {
  const [page, setPage] = useState('deck')
  return (
    <App>
      <Menu
        selectedKeys = {[page]}
        onClick = {(e) => setPage(e.key)}
        mode="horizontal"
      >
        <Menu.Item key='deck'>
          <Icon type='appstore' />Decklist
        </Menu.Item>
        <Menu.Item key='filter'>
          <Icon type='filter' />Filter
        </Menu.Item>
      </Menu>
      {
        page === 'deck' ? <DeckBuilder /> :
        page === 'filter' ? <DeckBuilder /> :
        null
      }
    </App>
  )
};

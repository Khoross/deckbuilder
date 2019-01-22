import React, {useState, useCallback, useRef, useEffect} from 'react';
import {Menu, Icon, Layout, Input, Row, Col} from 'antd';
import {fromEvent, of} from 'rxjs'
import {debounceTime, merge, filter} from'rxjs/operators'
import {useDispatch} from 'redux-react-hook'
import App from './containers/App';
import {DeckBuilder} from './pages';
import {setFilter} from './reducers';

const {Header, Content, Sider} = Layout

export default () => {
  const [page, setPage] = useState('deck')
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const setSearchString = (str) => dispatch(setFilter(str))

  //Only submit a search string after we finish typing, the input loses focus, or we press enter
  useEffect(() => {
    const sub = fromEvent(inputRef.current, 'change')
      .pipe(
        debounceTime(1),
        merge(fromEvent(inputRef.current, 'blur')),
        merge(
          fromEvent(inputRef.current, 'keyup').pipe(filter((ev) => ev.key === 'Enter'))
        )
      )
      .subscribe(()=>setSearchString(inputRef.current.value))
    return () => sub.unsubscribe()
  }, [])
  return (
    <App>
      <Layout>
        <Header className="header">
          <Row gutter={16}>
            <Col span={8}>
              <input className="ant-input" type="text" placeholder="Scryfall format search string" ref={inputRef}/>
            </Col>
            <Col span={16}>
              <Menu
                selectedKeys = {[page]}
                onClick = {(e) => setPage(e.key)}
                mode="horizontal"
                theme="dark"
                style={{lineHeight: '64px'}}
              >
                <Menu.Item key='deck'>
                  <Icon type='appstore' />Decklist
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Content>
            {
              page === 'deck' ? <DeckBuilder /> :
              null
            }
          </Content>
          <Sider width={200} style={{ background: '#fff' }}>
          </Sider>
        </Layout>
      </Layout>
    </App>
  )
};

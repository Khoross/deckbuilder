import React, {useState, useEffect} from 'react'
import {Pagination, Row, Col, List, Layout} from 'antd'
import {useMappedState} from 'redux-react-hook';
import {MTGCardTemplate} from '../components'
//import {useWindowSize} from '../hooks'
import cards from '../data/parsed_arena_cards_list.json'

const {Content, Sider} = Layout;

const applyFilters = (state) => {
  console.log('called')
  return cards.filter(
      card=>Object.values(state.filters).every(
        filterSet => filterSet.every(
          filter => filter.values.some(
            val => filter.comp(card[filter.key], val)
            )
          )
        )
      ).map(card=>card.arena_id)
}

const getSize = () => {
  return {
    columns: Math.floor((window.innerWidth-220) / 194),
    rows: Math.floor((window.innerHeight-100) / 248)
  };
}

const useWindowSize = () => {
  let [windowSize, setWindowSize] = useState(getSize());

  function handleResize() {
    setWindowSize(getSize());
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}

export const CardArray = (props) => {
  const [pageIdx, setPage] = useState(1)
  const {columns, rows} = useWindowSize()
  const ids = useMappedState(applyFilters)

  const startIdx = Math.ceil((pageIdx + 1)/(columns*rows))

  return(
    <Layout>
      <Content>
        {[...Array(rows)].map((_, idx) => (
            <Row type="flex" key={`p${pageIdx}r${rows}c${columns}i${idx}`}>
              {ids.slice((startIdx-1)*columns*rows+idx*columns, (startIdx-1)*columns*rows+idx*columns+columns).map(
                (id) => <Col key={id}><MTGCardTemplate id={id} /></Col>
                )
              }
            </Row>
          ))
        }
{/*        <List 
          grid={{column: columns}}
          dataSource={ids}
          renderItem={id => <List.Item><MTGCardTemplate id={id} /></List.Item>}
          pagination={{
            pageSize: columns*rows
          }}
        />*/}
        <Row type="flex" justify="center">
          <Pagination current={startIdx} onChange={(p) => setPage((p-1)*columns*rows)} total={ids.length} pageSize={columns*rows}/>
        </Row>
      </Content>
      <Sider width={200} style={{ background: '#fff' }}>
      </Sider>
    </Layout>
  )
}
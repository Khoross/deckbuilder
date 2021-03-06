import React, {useState, useEffect, useMemo} from 'react'
import {Pagination, Row, Col} from 'antd'
import {useMappedState} from 'redux-react-hook';
import {MTGCardTemplate} from '../components'
import cards from '../data/parsed_arena_cards_list.json'

const extractResults = (state) => state.filters.results

const getSize = () => {
  return {
    columns: Math.floor((window.innerWidth-220) / 194),
    rows: Math.floor((window.innerHeight-164) / 248)
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
  const ids = useMappedState(extractResults)

  const startIdx = Math.ceil((pageIdx + 1)/(columns*rows))
  console.log(+Date.now())

  return(
    !cards.loading ?
      <>
        {[...Array(rows)].map((_, idx) => (
            <Row type="flex" justify="center" key={`p${pageIdx}r${rows}c${columns}i${idx}`}>
              {ids.slice((startIdx-1)*columns*rows+idx*columns, (startIdx-1)*columns*rows+idx*columns+columns).map(
                (id) => <Col key={id}><MTGCardTemplate id={id} /></Col>
                )
              }
            </Row>
          ))
        }
        <Row type="flex" justify="center">
          <Pagination current={startIdx} onChange={(p) => setPage((p-1)*columns*rows)} total={ids.length} pageSize={columns*rows}/>
        </Row>
      </> :
      null
  )
}
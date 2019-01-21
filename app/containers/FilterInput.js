import React, {useState, useEffect, useMemo} from 'react'
import {Form, Layout, Select, Input, Button} from 'antd'
import {useMappedState, useDispatch} from 'redux-react-hook';
import {MTGCardTemplate} from '../components'
import {updateFilter} from '../actions'

const {Content, Sider} = Layout;
const {Item} = Form
const {Option} = Select

const extractFilters = (state) => state.filters

export const FilterInput = (props) => {
  const filters = useMappedState(extractFilters)
  const dispatch = useDispatch()

  return(
    <Layout>
      <Content>
        <Form onSubmit={(e)=>{e.preventDefault();console.log(e)}}>
          <Item label="Colours">
            <Select mode="multiple">
              <Option key="W">White</Option>
              <Option key="U">Blue</Option>
              <Option key="B">Black</Option>
              <Option key="R">Red</Option>
              <Option key="G">Green</Option>
            </Select>
          </Item>
          <Item label="Colour match type">
            <Select>
              <Option key="GTE">Contains all these colours and possibly more</Option>
              <Option key="EQ">Is exactly these colours</Option>
              <Option key="LTE">Contains only these colours, not necessarily all of them</Option>
            </Select>
          </Item>
          <Item label="Oracle text">
            <Input />
          </Item>
          <Item>
            <Button htmlType="submit">Apply</Button>
          </Item>
        </Form>
      </Content>
      <Sider width={200} style={{ background: '#fff' }}>
      </Sider>
    </Layout>
  )
}
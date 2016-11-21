import React from 'react';
import {
  Row,
  Col,
  Menu,
  Icon
} from 'antd';
import {
  hashHistory
} from "react-router";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Series extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Series';
    this.state = {
      current: "addComm"
    }
  }

  handleClick(e) {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
    hashHistory.push(`/info/series/${e.key}`)
  }


  render() {
    return (
      <Row>
        <Col span={4}>
            <Menu onClick={(e)=>this.handleClick(e)}
              selectedKeys={[this.state.current]}
              mode="inline">
              <MenuItemGroup title="新增">
                <Menu.Item key="addSeries"><Icon type="plus" />新增系列</Menu.Item>      
                <Menu.Item key="addDetail"><Icon type="plus-circle-o" />添加系列内容</Menu.Item>      
              </MenuItemGroup>                  
              <MenuItemGroup title="查询">
                <Menu.Item key="getCommBySeries"><Icon type="search" />查询系列</Menu.Item>      
              </MenuItemGroup>          
            </Menu>
        </Col>
        <Col span={20}>{this.props.children}</Col>
      </Row>
    );
  }
}

export default Series;
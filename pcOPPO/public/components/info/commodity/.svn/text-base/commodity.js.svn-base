
import React from 'react';
import { Row, Col,Menu, Icon } from 'antd';
import{hashHistory} from "react-router";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Commodity extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'commodity';
        this.state={
            current:"addComm"
        }
    }

     handleClick(e) {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
    hashHistory.push(`/info/commodity/${e.key}`)
  }


  render() {      
    return (
      <Row>
        <Col span={4}>
            <Menu onClick={(e)=>this.handleClick(e)}
              selectedKeys={[this.state.current]}
              mode="inline">
                <Menu.Item key="addComm"><Icon type="appstore" />新增产品</Menu.Item>
                
                <Menu.Item key="allComm"><Icon type="mail" />查询产品</Menu.Item>
              </Menu>
        </Col>
        <Col span={20}>{this.props.children}</Col>
      </Row>           
    );        
  }
}

export default Commodity;
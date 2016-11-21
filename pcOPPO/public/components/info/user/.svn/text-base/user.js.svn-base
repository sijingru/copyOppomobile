import React from 'react';
import { Row, Col,Menu, Icon } from 'antd';
import{hashHistory} from "react-router";
class User extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'User';
         this.state={
            current:"addComm"
        }
    }

    handleClick(e) {
    this.setState({
      current: e.key,
    });
    hashHistory.push(`/info/user/${e.key}`)
  }

    render() {
        
        return (
            <Row>
              <Col span={4}>
                <Menu onClick={(e)=>this.handleClick(e)}
                    selectedKeys={[this.state.current]}
                    mode="inline">
                <Menu.Item key="addUsers">
                    <Icon type="plus-circle" />添加管理员
                </Menu.Item>
                <Menu.Item key="getUsers">
                    <Icon type="search" />查询管理员
                </Menu.Item>
                <Menu.Item key="editUsers">
                    <Icon type="edit" />修改管理员
                </Menu.Item>
              </Menu>
              </Col>
              <Col span={20}>{this.props.children}</Col>
            </Row>
            );
    }
}

export default User;
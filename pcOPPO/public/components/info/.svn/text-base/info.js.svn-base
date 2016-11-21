import React from 'react';
import{hashHistory} from "react-router";
import { Menu, Icon,Tag,Row,Col,Button } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Info';
        this.state={
            current:"",
        }
    }



 handleClick(e) {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
    hashHistory.push(`/info/${e.key}`)
  }

  setCookie(c_name,value,expiredays){
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
  }

 quitClick() {
    // console.log('click ', e);
    
    this.setCookie("isLogin",false);
    this.setCookie("userType",'');
    localStorage.username='';
    hashHistory.push("/");
  }

    render() {
    return (
      <div>
        <Row align="middle">
            <Col span={8}><Menu onClick={(e) => this.handleClick(e)}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >


       
          <Menu.Item key="commodity">
            <Icon type="tags" />商品管理
          </Menu.Item>
          <Menu.Item key="order">
            <Icon type="user" />订单管理
          </Menu.Item>
             <Menu.Item key="series">
            <Icon type="tags" />系列管理
          </Menu.Item>
          <Menu.Item key="user">
            <Icon type="user" />用户管理
          </Menu.Item>
        </Menu></Col>
      <Col span={3} offset={11} style={{lineHeight:"48px"}}>欢迎你: <Tag closable={false} color="blue">{localStorage.username}</Tag></Col>
      <Col span={2} style={{lineHeight:"48px"}}>  <Button size="small" onClick={ () => this.quitClick() } type="primary">登出</Button>
</Col>
      </Row>
        
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Info;

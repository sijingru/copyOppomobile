import React from 'react';
import {Input, Button,Row, Col,Menu, Icon,Table,message } from 'antd';
import{hashHistory} from "react-router";
import classNames from 'classnames';
const InputGroup = Input.Group;


class GetUsers extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'GetUsers';
        this.state={
            loading:false,
            selectedRowKeys:[],
            user:[],
            value:""

        }
       
    }


//表格部分的函数
    searchClick(type){
        this.state.user=[];
        fetch("/users/getUsers", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
             body: `userType=${type}`,
            credentials: 'include'
        })
        .then(function(response) {
            return response.json();
        }).then((data)=> {
            data.map((item,index)=>{
                this.state.user.push({
                    key: index,
                    id: item._id,
                    username:item.username,
                    password: item.password,
                    usertype: item.userType
                });
            })
            this.forceUpdate();
        })
    }
    //删除点击事件
    delclick(record){
        fetch("/users/delUsers", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
             body: `userId=${record.id}`,
            credentials: 'include'
        })
        .then(function(response) {
            return response.json();
        }).then((data)=> {
            this.searchClick(record.usertype)
        })
    }
    //修改点击事件
    editclick(record){
        var id=record.id; 
        hashHistory.push(`/info/user/editUsers/${id}`)
    }

    start() {
        this.setState({ loading: true });
        // 模拟 ajax 请求，完成后清空
        setTimeout(() => {
          this.setState({
            selectedRowKeys: [],
            loading: false,
          });
        }, 1000);
    }
    onSelectChange(selectedRowKeys) {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys:userdata });
    }
    //搜索框部分的函数
    
      handleInputChange(e) {
        this.setState({
          value: e.target.value,
        });
      }
     
      handleSearch() {
        fetch("/users/searchUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `username=${this.state.value}`,
            credentials: 'include'
        })
        .then(function(response) {
            return response.json();
        }).then((data)=> {
            if(data.length==0){
                message.info('没有该管理员');
                this.state.user=[];
            }else{
                this.state.user=[];
                data.map((item,index)=>{
                    this.state.user.push({
                        key: item._id,
                        id: item._id,
                        username: item.username,
                        password: item.password,
                        usertype: item.userType
                    });
                }) 
            }
            this.forceUpdate();
        })
      
      }

    render() {
        //表格常量的设定
        const columns = [{
            title: '管理员编号',
            dataIndex: 'id',
            width:250
        }, {
            title: '管理员账号',
            dataIndex: 'username',
        },{
            title: '密码',
            dataIndex: 'password',
        }, {
            title: '账号类型',
            dataIndex: 'usertype',
        },{ 
            title: '操作',
            dataIndex: '', 
            key: 'index', 
            render: (record) =>
            <span>
                <a style={{marginRight:10}} onClick={()=> this.delclick(record)}  href="javascript:void(0)">删除</a> 
                <a onClick={()=> this.editclick(record)}  href="javascript:void(0)">修改</a> 
            </span>
        }];
        const {  loading,selectedRowKeys } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        //搜索框常量的设定
        const { style, size, placeholder } = this.props;
        const btnCls = classNames({
          'ant-search-btn': true,
          'ant-search-btn-noempty': !!this.state.value.trim(),
        });
        const searchCls = classNames({
          'ant-search-input': true,
          'ant-search-input-focus': this.state.focus,
        });

        return (
            //搜索框部分
            <div>
                <div className="ant-search-input-wrapper" style={{width:300}}>
                    <InputGroup className={searchCls}>
                      <Input  placeholder="please enter username" value={this.state.value} onChange={(e)=>this.handleInputChange(e)}/>
                      <div className="ant-input-group-wrap">
                        <Button icon="search" className={btnCls} size={size} onClick={()=>this.handleSearch()} />
                      </div>
                    </InputGroup>
                    <div style={{marginTop:10}} >
                        <Button onClick={()=>this.searchClick('0')} type="primary">卖家查询</Button>
                        <Button onClick={()=>this.searchClick('2')} style={{marginLeft:20}} type="primary">买家查询</Button>
                    </div>
                </div>
                
                <div>
                    <div style={{ marginBottom: 16 }}>
                      
                      <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
                    </div>
                    <Table columns={columns} dataSource={this.state.user} />
                </div>
            </div>
            );
    }
}

export default GetUsers;
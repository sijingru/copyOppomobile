import React from 'react';
import { Button, Form, Input  ,message} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

class AddUsers extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'AddUsers';
        this.state={
            user:{
            userName:"",
            userPassword:"",
            userType:0
        },
            value:"",
            addBtnState:true
        }
    }

    //点击增加按钮向后台传数据
    addUsers() {
        fetch("/users/addUsers", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `data=${JSON.stringify(this.state.user)}`,
            credentials: 'include'
        })
        .then(function(response) {
            return response.json();
        }).then((data)=> {
            this.reset();
            message.info('添加管理员成功');
        })

    }

    //失去焦点判断用户名是否可用
    checkeUsername(e){
        if(e.target.value==""){
            this.setState({
                    value:"用户名不可以为空",
                    addBtnState:true
                })
        }else{
            fetch("/users/checkeUsername", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `username=${e.target.value}`,
                credentials: 'include'
            })
            .then(function(response) {
                return response.json();
            }).then((data)=> {
                
                if(eval(data)){
                    this.setState({
                        value:"您可以使用该用户名",
                        addBtnState:false
                    })
                }else{
                    this.setState({
                        value:"该用户名不可用",
                        addBtnState:true
                    })
                }
            })
        }
    }
    reset() {
        this.setState({
            user:{
                userName:"",
                userPassword:"",
                userType:0
            },
            value:""
        });   
    }

    userName(e){
        this.state.user.userName=e.target.value
        this.forceUpdate();
    }
    userPassword(e){
        this.state.user.userPassword=e.target.value
        this.forceUpdate();
    }


    render() {
        const formItemLayout = {
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 12
            },
        };
    return (
        <Form horizontal style={{width: 800}}>
                
            <FormItem
                {...formItemLayout}
                label="管理员账号" 
            >
                <Input onBlur={(e)=>this.checkeUsername(e)} value={this.state.user.userName} type="text" onChange={(e)=>this.userName(e)} />
                <i style={{color:"red"}}>{this.state.value}</i>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="密码" 
            >
                <Input value={this.state.user.userPassword} type="password" onChange={(e)=>this.userPassword(e)} />
            </FormItem>
            
            <FormItem
                {...formItemLayout}
                label="管理员类型" 
            >
                <Input value={this.state.user.userType} type="text" />
                <i>管理员类型默认为0，0代表二级管理员</i>
            </FormItem>

            <FormItem wrapperCol={{ span: 12, offset: 7 }}>
              <Button type="primary" disabled={this.state.addBtnState} onClick={() => this.addUsers()}>添加</Button>
              &nbsp;&nbsp;&nbsp;
              <Button type="ghost" onClick={() => this.reset() }>重置</Button>
            </FormItem>
        </Form>
      );
   } 
}
export default createForm()(AddUsers);
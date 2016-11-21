/* 
* @Author: anchen
* @Date:   2016-10-13 16:13:50
* @Last Modified by:   anchen
* @Last Modified time: 2016-10-27 17:45:01
*/

import React from 'react';
import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Checkbox
} from 'antd';
import { hashHistory } from "react-router";
const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Login';
    }
    
    setCookie(c_name,value,expiredays){
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
  }

   getCookie(c_name){
    if (document.cookie.length>0)
      {
      var c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1)
        {
        c_start=c_start + c_name.length+1
        var c_end=document.cookie.indexOf(";",c_start)
        if (c_end==-1) c_end=document.cookie.length
        return unescape(document.cookie.substring(c_start,c_end))
        }
      }
    return ""
  }


     componentWillMount(){
        var getUsername = this.getCookie('username');
        var getPassword = this.getCookie('password');
        if(getUsername.length){
        this.props.form.setFieldsValue({
            username:getUsername,
            password:getPassword
        })
        }
     }

     
    loginClick() {
        var agreement = this.props.form.getFieldValue("agreement");
        var username = this.props.form.getFieldValue("username");
        var password = this.props.form.getFieldValue("password");
        if(username){
        if( username.length<=5||(password.length<=5)){
            
            
            alert("输入的用户名和密码不能小于6位")
        }else{
            fetch("/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `username=${this.props.form.getFieldValue("username")}&password=${this.props.form.getFieldValue("password")}`,
            credentials: 'include'
            }).then(function(response) {
                return response.json();
            }).then((data)=> {
                if(data==true){        
                        localStorage.username= this.props.form.getFieldValue("username");
                  if(agreement == true) {
                    this.setCookie('username', this.props.form.getFieldValue("username"), 7);
                    this.setCookie('password', this.props.form.getFieldValue("password"), 7);
                    }
                    hashHistory.push("/info")         
                   
                }else{
                    alert('请输入正确的用户名和密码')
                }
                return data;
            })
            }
         }
    }



    render() {
        // console.log(this.props.form)
        let {getFieldDecorator} = this.props.form;
        const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
        return (       
            <div>
                <Row>
             
                <Form horizontal onSubmit={this.handleSubmit} style={{marginTop:20}}>
                    <FormItem
                {...formItemLayout}
                    label="用户名" 
                    >
                      {getFieldDecorator('username')(
                        <Input placeholder="请输入用户名" style={{ width: 200 }} />
                      )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                      label="密码"
                    >
                      {getFieldDecorator('password')(
                        <Input type="password" placeholder="请输入密码" style={{ width: 200 }} />
                      )}
                    </FormItem>
                    <FormItem 
                    wrapperCol={{ span: 12, offset: 7 }}
                    >
                      {getFieldDecorator('agreement')(
                        <Checkbox >记住我</Checkbox>
                      )}
                    </FormItem>

                    <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                    <Button onClick={ () => this.loginClick() } style={{marginRight: 10}} type="primary">登录</Button>
                    
                    </FormItem>
                </Form>
              
            </Row>
            </div>
        );
    }
}

export default Form.create()(Login);
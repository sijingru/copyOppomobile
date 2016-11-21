import React from 'react';
import { Row, Col,Menu, Icon,Modal, Button,Form,Input,message} from 'antd';
import{hashHistory} from "react-router";
const createForm = Form.create;
const FormItem = Form.Item;
class EditUsers extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EditUsers';
        this.state={
          visible: false,
          username:"",
          password:""
        }
    }

    showModal() {
      this.setState({
        visible: true,
      });
    }

    handleOk() {
      let editusers={
        id:this.props.params.id,
        username:this.state.username,
        password:this.state.password
      }
      fetch("/users/editUsers", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
             body: `users=${JSON.stringify(editusers)}`,
            credentials: 'include'
        })
        .then(function(response) {
            return response.json();
        }).then((data)=> {
            if(data){
              message.info('修改成功');
              this.setState({
                visible: false
              });
            }else{
              message.info('修改失败');
            }
        })
    }

    handleCancel() {
      this.setState({ visible: false });
    }

    changeUsername(e){
      this.setState({
        username:e.target.value,
      })
    }

    changePassword(e){
      this.setState({
        password:e.target.value,
      })
    }

    render() {
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 6
            },
        };
        return (
            <div>
              <Button type="primary" onClick={()=>this.showModal()}>
                点击修改信息
              </Button>
              <Modal
                visible={this.state.visible}
                title="人员信息修改"
                onOk={()=>this.handleOk()}
                onCancel={()=>this.handleCancel()}
                footer={[
                  <Button key="back" type="ghost" size="large" onClick={()=>this.handleCancel()}>返回</Button>,
                  <Button key="submit" type="primary" size="large" onClick={()=>this.handleOk()}>
                    确认修改
                  </Button>,
                ]}>
                  <Form horizontal style={{width: 800}}>
                      <FormItem
                          {...formItemLayout}
                          label="管理员账号" >
                          <Input value={this.state.username} onChange={(e)=>this.changeUsername(e)}  type="text" /> 
                      </FormItem>
                      <FormItem
                          {...formItemLayout}
                          label="密码" >
                          <Input value={this.state.password} onChange={(e)=>this.changePassword(e)} type="password"  />
                      </FormItem>
                  </Form>
              </Modal>
            </div>
            );
    }
}

export default EditUsers;
import React from 'react';
import {
    Button,
    Form,
    Input,
    Modal,
    Icon,
    message
} from 'antd';
import {
    hashHistory
} from "react-router";

const createForm = Form.create;
const FormItem = Form.Item;

class AddSeries extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'AddSeries';
        this.state = {
            commSeries: ""
        }
    }

    commSeries(e) {
        this.setState({
            commSeries: e.target.value
        })
    }


    resetAll() {
        this.setState({
            commSeries: ""
        })
    }



    addSeries() {
        if (this.state.commSeries.length !== 0) {
            fetch("/series/addSeries", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `commSeries=${ this.state.commSeries}`,
                    credentials: 'include'
                })
                .then(function(response) {
                    return response.json();
                }).then((data) => {
                    if (eval(data)) {
                        message.info('新增系列成功');
                        hashHistory.push("/info/series/addDetail")
                    } else {
                        message.info('此系列已添加');
                    }
                })
        } else {
            message.info('系列名称不能为空');
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 10
            },
        };
        return (
            <Form horizontal>
                <FormItem
                    label="添加商品系列"
                    {...formItemLayout}
                    style={{marginTop: 30}}
                >
                    <Input size="small" value={this.state.commSeries} placeholder="请输入商品系列" onChange={ (e) => this.commSeries(e) }  />
                </FormItem>
               
                <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                    <Button size="small" onClick={ () => this.addSeries() } style={{marginRight: 10}} type="primary">添加</Button>
                    <Button size="small" onClick={ () => this.resetAll() } type="primary">重置</Button>
                </FormItem>
            </Form>
        );
    }
}

export default AddSeries;
import React from 'react';
import {
    Button,
    Form,
    Input,
    Modal,
    Icon,
    message,
    Select
} from 'antd';
import {
    hashHistory
} from "react-router";

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

class AddDetail extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'AddDetail';
        this.state = {
            data: {
                commSeries: "",
                commName: "",
                seriesAdv: "",
                seriesColor: "",
                seriesCapacity: "",
                seriesNet: "",
                seriesService: "",
                allSeries: []
            },
            validateStatus: "",
            help: "",
        }
    }

    setCommSeries(value) {

        this.state.data.commSeries = value;
        this.forceUpdate()
    }

    commName(e) {
        this.state.data.commName = e.target.value
        this.forceUpdate()
    }

    isNameUse(e) {

        fetch("/series/isNameUse", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `commName=${ this.state.data.commName }&commSeries=${ this.state.data.commSeries }`,
            credentials: 'include'
        }).then(function(response) {
            return response.json();
        }).then((data) => {
            if (!eval(data)) {
                this.state.validateStatus = "success"
                this.forceUpdate()
            } else {
                this.state.validateStatus = "warning"
                this.state.help = "此款产品已添加"
                this.state.data.commName = ""
                this.forceUpdate()
            }
        });
    }

    reInputName(e) {
        this.state.validateStatus = ""
        this.state.help = ""
        this.forceUpdate()
    }

    seriesAdv(e) {
        this.state.data.seriesAdv = e.target.value
        this.forceUpdate()
    }

    seriesColor(e) {
        this.state.data.seriesColor = e.target.value
        this.forceUpdate()
    }

    seriesCapacity(e) {
        this.state.data.seriesCapacity = e.target.value
        this.forceUpdate()
    }

    seriesNet(e) {
        this.state.data.seriesNet = e.target.value
        this.forceUpdate()
    }

    seriesService(e) {
        this.state.data.seriesService = e.target.value
        this.forceUpdate()
    }

    reset() {
        this.state.data.commName = ""
        this.state.data.seriesAdv = ""
        this.state.data.seriesColor = ""
        this.state.data.seriesCapacity = ""
        this.state.data.seriesNet = ""
        this.state.data.seriesService = ""
        this.state.validateStatus = ""
        this.state.help = ""
        this.forceUpdate()
    }

    addSeriesDetail() {
        fetch("/series/addSeriesDetail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `seriesDetail=${JSON.stringify(this.state.data)}`,
                credentials: 'include'
            })
            .then(function(response) {
                return response.json();
            }).then((data) => {
                if (eval(data)) {
                    message.info('新增系列内容成功');
                    this.reset();
                } else {
                    message.info('新增系列内容失败，请重试！');
                }
            })
    }


    componentWillMount() {
        this.getALLSeries();
    }

    getALLSeries() {
        fetch("/series/getAllSeries", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: 'include'
        }).then(function(response) {
            return response.json();
        }).then((data) => {
            this.state.data.allSeries = data;
            this.forceUpdate()
        });
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

        var allSeries = this.state.data.allSeries

        let allSeriesArr = []
        for (let i = 0; i < allSeries.length; i++) {
            allSeriesArr.push(<Option  key={allSeries[i]}>{allSeries[i]}</Option>)
        }
        return (
            <Form horizontal>
                <FormItem
                    label="商品所属系列"
                    {...formItemLayout}
                    style={{marginTop: 15}}
                >
                    <Select
                        size="small"
                        style={{ width: '100%' }}
                        placeholder="Please select Series"                        
                        onChange={(value) => this.setCommSeries(value)}
                    >
                        {allSeriesArr}
                    </Select>
                </FormItem>
                <FormItem
                    label="商品名称"
                    validateStatus={this.state.validateStatus}
                    help={this.state.help}
                    hasFeedback
                    {...formItemLayout}
                >
                  <Input size="small"
                        value={this.state.data.commName} 
                        placeholder="请输入商品名称" 
                        onChange={ (e) => this.commName(e) }
                        onBlur={ (e) => this.isNameUse(e) }
                        onFocus={ (e) => this.reInputName(e) }
                   />
                </FormItem>
           
                <FormItem
                    label="系列广告"
                    {...formItemLayout}
                >
                  <Input size="small" value={this.state.data.seriesAdv} placeholder="请输入商品系列广告"  onChange={ (e) => this.seriesAdv(e) }/>
                </FormItem>
                <FormItem
                    label="系列颜色"
                    {...formItemLayout}
                >
                  <Input size="small" value={this.state.data.seriesColor} placeholder="请输入商品系列颜色"  onChange={ (e) => this.seriesColor(e) }/>
                </FormItem>
                <FormItem
                    label="系列容量"
                    {...formItemLayout}
                >
                  <Input size="small" value={this.state.data.seriesCapacity} placeholder="请输入商品系列容量"  onChange={ (e) => this.seriesCapacity(e) }/>
                </FormItem>
                <FormItem
                    label="系列网络"
                    {...formItemLayout}
                >
                  <Input size="small" value={this.state.data.seriesNet} placeholder="请输入商品系列网络"  onChange={ (e) => this.seriesNet(e) }/>
                </FormItem>
                <FormItem
                    label="系列服务"
                    {...formItemLayout}
                >
                  <Input size="small" value={this.state.data.seriesService} placeholder="请输入商品系列服务"  onChange={ (e) => this.seriesService(e) }/>
                </FormItem>

                <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                    <Button size="small" onClick={ () => this.addSeriesDetail() } style={{marginRight: 10}} type="primary">保存</Button>
                    <Button size="small" onClick={ () => this.reset() } type="primary">重置</Button>
                </FormItem>
            </Form>
        );
    }
}

export default AddDetail;
import React from 'react';
import {
    Table,
    Icon,
    Pagination,
    Form,
    Modal,
    Button,
    message,
    Tag,
    Input,
} from 'antd';

import {
    hashHistory
} from "react-router";

const FormItem = Form.Item;

class GetcommBySeries extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = "GetcommBySeries";
        this.state = {
            data: [],
            curPage: 1,
            eachPage: 10,
            count: 0,
            commWindowVisible: false,
            editSeriesWindowVisible: false,
            selectComm: "",
            singleData: {
                commSeries: "",
                commName: "",
                commNet: [],
                commColor: [],
                commPrice: "",
                commService: [],
                commAdv: "",
                commAdv2:"",
                commSeller: ""
            },
            needEditData: {
                commSeries: "",
                commName: [],
                seriesAdv: "",
                seriesColor: [],
                seriesCapacity: [],
                seriesNet: [],
                seriesService: []
            },
            delTag: "",
            needAddData: {
                commSeries: "",
                commName: "",
                seriesAdv: "",
                seriesColor: "",
                seriesCapacity: "",
                seriesNet: "",
                seriesService: "",
                _id:""
            },
            validateStatus: "",
            help: "",
        };
    }

    showCommModal(e) {
        e.preventDefault();
        fetch("/commodity/getSingleComm", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `commName=${ this.state.selectComm }`,
            credentials: 'include'
        }).then(function(response) {
            return response.json();
        }).then((data) => {
            this.setState({
                singleData:data[0],
                commWindowVisible: true,
            });
        });        
    }

    handleOk() {
        this.setState({
            commWindowVisible: false,
        });
    }

    handleCancel() {
        this.setState({
            commWindowVisible: false,
            editSeriesWindowVisible: false,
        });
    }

    onCloseName(e) {
        var delIndex = ""
        this.state.needEditData.commName.forEach((item, index) => {
            if (item == e.item) {
                delIndex = index
            }
        });
        this.state.needEditData.commName.splice(delIndex, 1);
    }

    commName(e) {
        this.state.needAddData.commName = e.target.value
        this.forceUpdate()
    }

    isNameUse(e) {

        fetch("/series/isNameUse", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `commName=${ this.state.needAddData.commName }&commSeries=${ this.state.needEditData.commSeries }`,
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
                this.state.needAddData.commName = ""
                this.forceUpdate()
            }
        });
    }

    reInputName(e) {
        this.state.validateStatus = ""
        this.state.help = ""
        this.forceUpdate()
    }

    onCloseAdv() {
        this.state.needEditData.seriesAdv = ""
        this.forceUpdate()
    }

    seriesAdv(e) {
        this.state.needAddData.seriesAdv = e.target.value
        this.forceUpdate()
    }

    onCloseColor(e) {
        var delIndex = ""
        this.state.needEditData.seriesColor.forEach((item, index) => {
            if (item == e.item) {
                delIndex = index
            }
        });
        this.state.needEditData.seriesColor.splice(delIndex, 1);
    }

    seriesColor(e) {
        this.state.needAddData.seriesColor = e.target.value
        this.forceUpdate()
    }

    onCloseCapacity(e) {
        var delIndex = ""
        this.state.needEditData.seriesCapacity.forEach((item, index) => {
            if (item == e.item) {
                delIndex = index
            }
        });
        this.state.needEditData.seriesCapacity.splice(delIndex, 1);
    }

    seriesCapacity(e) {
        this.state.needAddData.seriesCapacity = e.target.value
        this.forceUpdate()
    }

    onCloseNet(e) {
        var delIndex = ""
        this.state.needEditData.seriesNet.forEach((item, index) => {
            if (item == e.item) {
                delIndex = index
            }
        });
        this.state.needEditData.seriesNet.splice(delIndex, 1);
    }

    seriesNet(e) {
        this.state.needAddData.seriesNet = e.target.value
        this.forceUpdate()
    }

    onCloseService(e) {
        var delIndex = ""
        this.state.needEditData.seriesService.forEach((item, index) => {
            if (item == e.item) {
                delIndex = index
            }
        });
        this.state.needEditData.seriesService.splice(delIndex, 1);
    }

    seriesService(e) {
        this.state.needAddData.seriesService = e.target.value
        this.forceUpdate()
    }

    componentWillMount() {
        this.getCommBySeries(this.state.eachPage, this.state.curPage);
    }

    getCommBySeries(eachPage, curPage) {
        fetch("/series/getCommBySeries", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `eachPage=${ eachPage }&curPage=${ curPage }`,
            credentials: 'include'
        }).then(function(response) {
            return response.json();
        }).then((data) => {
            this.state.data = data.data;
            this.state.count = data.count;
            this.forceUpdate()
        });
    }


    delSeries(e) {
        e.preventDefault();
        fetch("/series/delSeries", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `delSeries=${ this.state.delSeries }`,
            credentials: 'include'
        }).then(function(response) {
            return response.json();
        }).then((data) => {
            if (eval(data)) {
                message.info('删除系列成功');
                this.getCommBySeries(this.state.eachPage, this.state.curPage)
            } else {
                message.info('删除系列失败');
            }
        });
    }

    editSeries(e) {
        e.preventDefault();
        this.setState({
            editSeriesWindowVisible: true,
        });
    }
    
    editOk() {
        if(this.state.needAddData.commName.length !== 0){
            this.state.needEditData.commName.push(this.state.needAddData.commName)
        }
        if(this.state.needAddData.seriesAdv.length !== 0){
            this.state.needEditData.seriesAdv=this.state.needAddData.seriesAdv
        }
        if(this.state.needAddData.seriesColor.length !== 0){
            this.state.needEditData.seriesColor.push(this.state.needAddData.seriesColor)
        }
        if(this.state.needAddData.seriesCapacity.length !== 0){
            this.state.needEditData.seriesCapacity.push(this.state.needAddData.seriesCapacity)
        }
        if(this.state.needAddData.seriesNet.length !== 0){
            this.state.needEditData.seriesNet.push(this.state.needAddData.seriesNet)
        }
        if(this.state.needAddData.seriesService.length !== 0){
            this.state.needEditData.seriesService.push(this.state.needAddData.seriesService)
        }
        fetch("/series/editSeries", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `editSeries=${JSON.stringify(this.state.needEditData)}`,
            credentials: 'include'
        }).then(function(response) {
            return response.json();
        }).then((data) => {
            if (eval(data)) {
                message.info('修改系列内容成功');
                this.setState({
                    editSeriesWindowVisible: false,
                });
                this.getCommBySeries(this.state.eachPage, this.state.curPage)
            } else {
                message.info('修改系列内容失败，请重试！');
            }
        });
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

        const columns = [{
            title: '产品系列',
            dataIndex: 'commSeries',
            key: 'commSeries',
        }, {
            title: '产品名称',
            dataIndex: 'commName',
            key: 'commName',
            render: (text, record) => (
                text.map((item, index) => {
                    return <a href = "#"
                    key = {
                        `name${index}`
                    }
                    onClick = {
                        (e) => {
                            this.state.selectComm = item;
                            this.forceUpdate();
                            this.showCommModal(e);                            
                        }
                    } > {
                        item
                    } {
                        "/"
                    } < /a>
                })
            ),
        }, {
            title: '系列服务',
            dataIndex: 'seriesService',
            key: 'seriesService',
            render: (text, record) => (
                text.map((item, index) => {
                    return <span href="#" key={`service${index}`}>{item}{"/"}</span>
                })
            ),
        }, {
            title: '系列网络',
            dataIndex: 'seriesNet',
            key: 'seriesNet',
            render: (text, record) => (
                text.map((item, index) => {
                    return <span href="#" key={`net${index}`}>{item}{"/"}</span>
                })
            ),
        }, {
            title: '系列容量',
            dataIndex: 'seriesCapacity',
            key: 'seriesCapacity',
            render: (text, record) => (
                text.map((item, index) => {
                    return <span href="#" key={`capacity${index}`}>{item}{"/"}</span>
                })
            ),
        }, {
            title: '系列颜色',
            dataIndex: 'seriesColor',
            key: 'seriesColor',
            render: (text, record) => (
                text.map((item, index) => {
                    return <span href="#" key={`color${index}`}>{item}{"/"}</span>
                })
            ),
        }, {
            title: '系列广告词',
            dataIndex: 'seriesAdv',
            key: 'seriesAdv',
            render: (text, record) => (                
                <span href="#">{text}</span>                
            ),
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span>
                    <a href="#" onClick = {                            
                        (e) => {   
                            this.state.delSeries = record.commSeries;
                            this.forceUpdate();
                            this.delSeries(e);
                        }
                    }>删除</a>
                <span className="ant-divider" />
                    <a href="#" onClick = {                            
                        (e) => {  
                            this.forceUpdate(); 
                            this.state.needEditData = text;                            
                            this.editSeries(e)
                        }
                    }>修改</a>
                </span>
            )
        }];


        return (
            <div>
                <Table columns={columns} dataSource={this.state.data} style={{marginTop: 30}}/>
                <Modal title={this.state.selectComm} visible={this.state.commWindowVisible} 
                    onOk={ () => this.handleOk() } onCancel={() => this.handleCancel()}>
                    <FormItem
                      label="系列"
                      {...formItemLayout}
                    >
                        <p>{this.state.singleData.commSeries}</p>
                    </FormItem>
                    <FormItem
                      label="网络"
                      {...formItemLayout}
                    >
                        {this.state.singleData.commNet.map((item,index) => {
                            return <p key={`net${index}`}>{item}</p>
                        })}
                        
                    </FormItem>

                    <FormItem
                      label="颜色"
                      {...formItemLayout}
                    >                        
                        {this.state.singleData.commColor.map((item,index) => {
                            return <p key={`color${index}`}>{item}</p>
                        })}
                    </FormItem>

                    <FormItem
                      label="价格"
                      {...formItemLayout}
                    >                        
                        <p>{this.state.singleData.commPrice}</p>
                    </FormItem>
                    <FormItem
                      label="服务"
                      {...formItemLayout}
                    >                        
                        {this.state.singleData.commService.map((item,index) => {
                            return <p key={`service${index}`}>{item}</p>
                        })}
                    </FormItem>
                    <FormItem
                      label="广告"
                      {...formItemLayout}
                    >                        
                        <span>{this.state.singleData.commAdv}</span>
                        <span>{this.state.singleData.commAdv2}</span>
                    </FormItem>
                    <FormItem
                      label="热销"
                      {...formItemLayout}
                    >                        
                        <p>{this.state.singleData.commSeller ? "hot":"normal"}</p>
                    </FormItem>
                </Modal>

                <Modal title={this.state.needEditData.commSeries} visible={this.state.editSeriesWindowVisible} 
                    onOk={ () => this.editOk() } onCancel={() => this.handleCancel()}>
                    <Form horizontal>
                        
                        <FormItem
                            label="商品名称"
                            validateStatus={this.state.validateStatus}
                            help={this.state.help}
                            hasFeedback
                            {...formItemLayout}
                        >
                            <Input size="small"
                                value={this.state.needAddData.commName} 
                                placeholder="请输入商品名称" 
                                onChange={ (e) => this.commName(e) }
                                onBlur={ (e) => this.isNameUse(e) }
                                onFocus={ (e) => this.reInputName(e) }
                            />
                            {this.state.needEditData.commName.map((item,index) => {
                                return <Tag closable onClose={() => this.onCloseName({item})} key={`name${index}`}>{item}</Tag>
                            })}
                        </FormItem>
                   
                        <FormItem
                            label="系列广告"
                            {...formItemLayout}
                        >
                            <Input size="small" value={this.state.needAddData.seriesAdv} placeholder="请输入商品系列广告"  onChange={ (e) => this.seriesAdv(e) }/>
                            <Tag closable onClose={() => this.onCloseAdv()} >{this.state.needEditData.seriesAdv}</Tag>
                        </FormItem>
                        <FormItem
                            label="系列颜色"
                            {...formItemLayout}
                        >
                            <Input size="small" value={this.state.needAddData.seriesColor} placeholder="请输入商品系列颜色"  onChange={ (e) => this.seriesColor(e) }/>

                            {this.state.needEditData.seriesColor.map((item,index) => {
                                return <Tag closable onClose={() => this.onCloseColor({item})} key={`color${index}`}>{item}</Tag>
                            })}
                        </FormItem>
                        <FormItem
                            label="系列容量"
                            {...formItemLayout}
                        >
                            <Input size="small" value={this.state.needAddData.seriesCapacity} placeholder="请输入商品系列容量"  onChange={ (e) => this.seriesCapacity(e) }/>

                            {this.state.needEditData.seriesCapacity.map((item,index) => {
                                return <Tag closable onClose={() => this.onCloseCapacity({item})} key={`capacity${index}`}>{item}</Tag>
                            })}
                        </FormItem>
                        <FormItem
                            label="系列网络"
                            {...formItemLayout}
                        >
                            <Input size="small" value={this.state.needAddData.seriesNet} placeholder="请输入商品系列网络"  onChange={ (e) => this.seriesNet(e) }/>

                            {this.state.needEditData.seriesNet.map((item,index) => {
                                return <Tag closable onClose={() => this.onCloseNet({item})} key={`net${index}`}>{item}</Tag>
                            })}
                        </FormItem>
                        <FormItem
                            label="系列服务"
                            {...formItemLayout}
                        >
                            <Input size="small" value={this.state.needAddData.seriesService} placeholder="请输入商品系列服务"  onChange={ (e) => this.seriesService(e) }/>

                            {this.state.needEditData.seriesService.map((item,index) => {
                                return <Tag closable onClose={() => this.onCloseService({item})} key={`service${index}`}>{item}</Tag>
                            })}
                        </FormItem>

                    </Form>                 
                </Modal>
            </div>
        )
    }
}

export default GetcommBySeries;
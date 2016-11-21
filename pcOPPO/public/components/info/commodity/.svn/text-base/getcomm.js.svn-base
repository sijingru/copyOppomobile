
import React from 'react';

import {
    Table,
    Icon
} from 'antd';

import {
    hashHistory
} from "react-router";

const columns = [{
    title: '商品名称',
    dataIndex: 'commName',
    key: 'commName',
    render: text => <a href="#">{text}</a>,
}, {
    title: '商品类型',
    dataIndex: 'commType',
    key: 'commType',
}, {
    title: '商品价格',
    dataIndex: 'commPrice',
    key: 'commPrice',
}, {
    title: '商品尺寸',
    dataIndex: 'commSize',
    key: 'commSize',
    render: (text, record) => {
        return <span>{text.join(",")}</span>
    }
}, {
    title: '商品图片',
    dataIndex: 'commImgs',
    key: 'commImgs',
    render: (text, record) => (
        <span>
      <a href="#" onClick={(e) => {
        e.preventDefault();
        hashHistory.push(`/info/commodity/imgList/${record._id}`)
      }}>点击查看</a>
    </span>
    ),
}];

class GetComm extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'GetComm';
        this.state = {
            data: [],
            curPage: 1,
            eachPage: 10,
            count: 0,
            maxPage: 0
        }
    }

    componentWillMount() {
        this.getCommodityByPage();
    }

    getCommodityByPage() {
        fetch("/commodity/getCommodityByPage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `curPage=${this.state.curPage}&eachPage=${this.state.eachPage}`,
                credentials: 'include'
            })
            .then(function(response) {
                return response.json();
            }).then((data) => {
                this.setState(data);
            })
    }



    render() {
        const pagination = {
            total: this.state.count,
            showSizeChanger: true,
            onShowSizeChange: (current, pageSize) => {
                console.log('Current: ', current, '; PageSize: ', pageSize);
                this.state.curPage = current;
                this.state.eachPage = pageSize;
                this.getCommodityByPage();
            },
            onChange: (current) => {
                this.state.curPage = current;
                this.getCommodityByPage();
            },
        };
        return (
            <Table columns={columns} dataSource={this.state.data} pagination={pagination} />
        );
    }
}

export default GetComm;
import React from 'react';
import { Table ,Row, Col,Menu, Icon } from 'antd';
import{hashHistory} from "react-router";




const data = [
  { key: 1, name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
  { key: 2, name: '吴彦祖', age: 42, address: '西湖区湖底公园2号'},
  { key: 3, name: '李大嘴', age: 32, address: '西湖区湖底公园3号'},
];




class DelUsers extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DelUsers';
        
    }

    delclick(){
        
    }

    render() { 

        const columns = [
            { title: '姓名', dataIndex: 'name', key: 'name' },
            { title: '年龄', dataIndex: 'age', key: 'age' },
            { title: '住址', dataIndex: 'address', key: 'address' },
            { title: '操作', dataIndex: '', key: 'x', render: () => <a onClick={()=> this.delclick()}  href="javascript:void(0)">删除</a> },
        ];

        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={data}
                    className="table"/>
            </div>
        );
    }
}

export default DelUsers;
import React from 'react';

import {
    Table,
    Icon,
    Button,
    Modal,
    Form,
    Select,
    Upload,   
     message,



} from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;


class ImgList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ImgList';
        this.state = {
            data: [],
            delVisible:false,
            _id:'',
            username:localStorage.username,
            imgNameArr: new Map(),
             imgType: "commDetail",      
            imgColorArr:[],
            imgColor:'',
                //上传图片窗口状态
            imgWindowVisible: false,
            fileList:[],

        }
    }

    componentWillMount() {
        this.getImg();
         var arr=[];
                this.props.params.commColor.split(",").map((item,index)=>{arr.push(<Option key={index} value={item} >{item}</Option>)}
               )
                this.setState({
                   
                    imgColorArr:arr
                })

    }

    getImg(){
        fetch("/commodity/getAllCommImgs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `_id=${this.props.params.commId}`,
                credentials: 'include'
            })
            .then(function(response) {
                return response.json();
            }).then((data) => {
                this.setState({
                    data: data
                })
            })
    }



   showImgModal() {
        this.getCommImgs(() => {
            this.setState({
                imgWindowVisible: true
            });
        })

    }

    handleOk() {
        var arr = [];
        for (let [key, value] of this.state.imgNameArr.entries()) {
            value ? "" : arr.push(key)
        }

        fetch("/commodity/addCommImgs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `commodityImgs=${JSON.stringify({commId: this.props.params.commId,imgColor:this.state.imgColor,imgType: this.state.imgType, arr})}`,
                credentials: 'include'
            })
            .then(function(response) {
                return response.json();
            }).then((data) => {
                if (data) {
                    message.info('新增商品图片成功');
                    this.setState({
                                    imgWindowVisible: false,
                                });
                }
            })
    }

    getCommImgs(callback = function() {}) {
        fetch("/commodity/getCommImgs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `commodityImgs=${JSON.stringify({commId:this.props.params.commId, imgType: this.state.imgType})}`,
                credentials: 'include'
            })
            .then(function(response) {
                return response.json();
            }).then((data) => {
                    this.state.imgNameArr.clear();
                    data.forEach((item) => {
                        this.state.imgNameArr.set(item.name, true);
                        item.name=item.imgName;

                    })
                    this.state.fileList  = data;
                    this.forceUpdate();

                callback();
            })
    }


        getCommColorImgs(callback = function() {}) {
        fetch("/commodity/getCommColorImgs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `commodityImgs=${JSON.stringify({commId: this.props.params.commId, imgColor: this.state.imgColor})}`,
                credentials: 'include'
            })
            .then(function(response) {
                return response.json();
            }).then((data) => {
                    this.state.imgNameArr.clear();
                    data.forEach((item) => {
                        this.state.imgNameArr.set(item.name, true);
                        item.name=item.imgName;
                    });
                    this.state.fileList  = data;
                    this.forceUpdate();
                callback();
            })
    }




    handleCancel() {
        this.setState({
            imgWindowVisible: false,
        });
    }

    setImgType(value) {
        this.state.imgType = value;
        this.state.imgColor = '';
        this.getCommImgs();
    } 
    setImgColor(value) {
        this.state.imgColor = value;
        this.state.imgType = '';
        this.getCommColorImgs();
    }

   


        delCancel()
            {
                    this.setState
                    ({
                       delVisible:false
                     })
            } 

        del(record){
                    this.setState({
                        delVisible:true,
                        _id:record
                    })
               }

         delOk(){
               fetch("/commodity/delCommImg", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `_id=${this.state._id}`,
                    credentials: 'include'
                })
                .then(function(response) {
                    return response.json();
                }).then((data) => {
                           this.setState({
                                delVisible:false
                            })
                        this.getImg();
                })
         }    

    render() {
                        const columns = [{
                    title: '商品编号',
                    dataIndex: 'commId',
                    key: 'commId',
                    render: text => <a href="#">{text}</a>,
                }, {
                    title: '图片名称',
                    dataIndex: 'imgName',
                    key: 'imgName',
                }, {
                    title: '图片类型',
                    dataIndex: 'imgType',
                    key: 'imgType',
                }, {
                    title: '图片颜色',
                    dataIndex: 'imgColor',
                    key: 'imgColor',
                }, {
                    title: '图片',
                    dataIndex: 'img',
                    key: 'img',
                    render: (text, record) => {
                        return <img style={{width: 40, height: 40}} src={record.url} />
                    }
                },{
                title: '操作',
                key: 'imgId',
                render: (text, record) => (
                    <div>
                        <Button  type="primary" size="small" onClick={ () => this.del(record._id)}>删除</Button>{" "}
                                <Modal title="删除提示" visible={this.state.delVisible}
                                  onOk={()=>this.delOk()} onCancel={()=>this.delCancel()}
                                >
                                  <p>是否确认删除</p>
                                  
                                </Modal>
                                </div>     
                                )
            }
            ];


     const formItemLayout = {
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 12
            },
        };
        
        const uploadProps = {
            action: '/files/upload',
            listType: "picture",
            multiple: true,
            beforeUpload: (file) => {
                if (this.state.imgNameArr.has(file.name)) {
                    return false;
                }
                return true
            },
            onChange: (info) => {
                // if (info.file.status !== 'uploading') {
                //  console.log(info.file);
                //  console.log(info.fileList);
                // }
                // 
                if (info.file.status === 'uploading') {
                    info.file.status = "done"
                    this.setState({
                        fileList: info.fileList
                    })
                }
                if (info.file.status === 'done') {
                    this.state.imgNameArr.set(info.file.name, false);
                }
            },
            fileList: this.state.fileList,
        }
          

        return (
                <div>
            <Table columns={columns} dataSource={this.state.data} />


            <FormItem wrapperCol={{ span: 12, offset: 8 }}>
                     <Button style={{marginLeft:"48px"}} type="primary" size="small" 
            onClick={ () => this.showImgModal() }
          >上传图片</Button>
          <Modal title="添加商品图片" visible={this.state.imgWindowVisible}
                  onOk={ () => this.handleOk() } onCancel={() => this.handleCancel()}
                >
                    <FormItem
                      label="图片类型"
                      {...formItemLayout}
                    >
                      <Select size="small" value={this.state.imgType} style={{ width: 200 }} onChange={ (value) => this.setImgType(value) }>
                              <Option value="commDetail">商品详情图</Option>
                              <Option value="commParams">商品参数图</Option>
                              <Option value="commSeries">商品系列图</Option>
                            </Select>
                    </FormItem>

                          <FormItem
                      label="图片颜色"
                      {...formItemLayout}
                    >
                      <Select size="small" value={this.state.imgColor} style={{ width: 200 }} onChange={ (value) => this.setImgColor(value) }>
                      {this.state.imgColorArr}
                            </Select>
                    </FormItem>

                    <FormItem
                      label="上传图片"
                      {...formItemLayout}
                    >
                        <Upload {...uploadProps}>
                              <Button type="ghost">
                                <Icon type="upload" /> upload
                              </Button>
                            </Upload>

                        </FormItem>

                </Modal>
        </FormItem>
           
            </div>
        );
    }
}

export default ImgList;
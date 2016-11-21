
import React from 'react';
import {
    Button,
    Form,
    Input,
    Select,
    Modal,
    Upload,
    Icon,
    message
} from 'antd';

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

class AddComm extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'AddComm';
        this.state = {
            commName: "",
            commType: "male",
            commSize: ["36", "37"],
            commPrice: "149.00",
            //上传图片按钮状态
            uploadBtnState: true,
            //上传图片窗口状态
            imgWindowVisible: false,
            imgType: "indexImg",
            imgNameArr: new Map(),
            fileList: [{
                uid: -1,
                name: '1.jpg',
                status: 'done',
                url: '/images/1.jpg',
            }, {
                uid: -2,
                name: '2.jpg',
                status: 'done',
                url: '/images/2.jpg',
            }]
        }
    }

    setCommType(value) {
        console.log(value)
        this.setState({
            commType: value
        })
    }

    setCommName(e) {
        this.setState({
            commName: e.target.value
        })
    }

    setCommSize(value) {
        this.setState({
            commSize: value
        })
    }

    addComm() {
        fetch("/commodity/addComm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `commodity=${JSON.stringify(this.state)}`,
                credentials: 'include'
            })
            .then(function(response) {
                return response.json();
            }).then((data) => {
                message.info('新增商品成功');
                this.setState({
                    commId: data,
                    uploadBtnState: false
                })
            })
    }

    showImgModal() {
        this.getCommImgs(() => {
            this.setState({
                imgWindowVisible: true,
            });
        })

    }

    handleOk() {
        var arr = [];
        for (let [key, value] of this.state.imgNameArr.entries()) {
            value ? "" : arr.push(key)
        }
        console.log(arr);

        fetch("/commodity/addCommImgs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `commodityImgs=${JSON.stringify({commId: this.state.commId, imgType: this.state.imgType, arr})}`,
                credentials: 'include'
            })
            .then(function(response) {
                return response.json();
            }).then((data) => {
                if (data) {
                    message.info('新增商品成功');
                }
            })



    }

    getCommImgs(callback = function() {}) {
        fetch("/commodity/getCommImgs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `commodityImgs=${JSON.stringify({commId: this.state.commId, imgType: this.state.imgType})}`,
                credentials: 'include'
            })
            .then(function(response) {
                return response.json();
            }).then((data) => {
                console.log(data)
                    this.state.imgNameArr.clear();
                    data.forEach((item) => {
                        this.state.imgNameArr.set(item.name, true)
                    })
                    this.state.fileList = data;
                    this.forceUpdate();

                callback();
            })
    }

    handleCancel() {
        console.log("in")
        this.setState({
            imgWindowVisible: false,
        });
    }

    setImgType(value) {
        this.state.imgType = value;
        this.getCommImgs();
    }

    /*

    commName: "string",
    commType: "string",
    commSize: [],
    commPrice: "string"

 */
    render() {

        const formItemLayout = {
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 12
            },
        };

        let commSizeArr = []
        for (let i = 36; i <= 42; i++) {
            commSizeArr.push(<Option key={i}>{i}</Option>)
        }


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
                console.log(info.file.status)
                if (info.file.status === 'done') {
                    this.state.imgNameArr.set(info.file.name, false);
                }
            },
            fileList: this.state.fileList,
        }

        return (
            <Form horizontal>
        <FormItem
            label="商品名称"
            {...formItemLayout}
        >
          <Input size="small" value={this.state.commName} placeholder="请输入商品名称" onChange={ (e) => this.setCommName(e) } />
        </FormItem>
        <FormItem
          label="商品类型"
          {...formItemLayout}
        >
          <Select size="small" value={this.state.commType} style={{ width: 200 }} onChange={ (value) => this.setCommType(value) }>
                  <Option value="male">男</Option>
                  <Option value="female">女</Option>
                </Select>
        </FormItem>
        <FormItem
            label="商品价格"
            {...formItemLayout}
        >
          <Input size="small" value={this.state.commPrice} placeholder="请输入商品价格" />
        </FormItem>
        <FormItem
          label="商品大小"
          {...formItemLayout}
        >
          <Select
            size="small"
                    multiple
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    value={this.state.commSize}
                    onChange={(value) => this.setCommSize(value)}
                  >
                    {commSizeArr}
                  </Select>
        </FormItem>
        <FormItem
          label="商品图片"
          {...formItemLayout}
        >
          <Button type="primary" size="small" 
            disabled={this.state.uploadBtnState}
            onClick={ () => this.showImgModal() }
          >上传</Button>
          <Modal title="添加商品图片" visible={this.state.imgWindowVisible}
                  onOk={ () => this.handleOk() } onCancel={() => this.handleCancel()}
                >
                    <FormItem
                      label="图片类型"
                      {...formItemLayout}
                    >
                      <Select size="small" value={this.state.imgType} style={{ width: 200 }} onChange={ (value) => this.setImgType(value) }>
                              <Option value="indexImg">主页图片</Option>
                              <Option value="bigImg">轮播大图</Option>
                              <Option value="smallImg">轮播小图</Option>
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
        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
            <Button size="small" onClick={ () => this.addComm() } style={{marginRight: 10}} type="primary">保存</Button>
            <Button size="small" onClick={ () => this.regClick() } type="primary">重置</Button>
        </FormItem>
        </Form>
        );
    }
}

export default AddComm;
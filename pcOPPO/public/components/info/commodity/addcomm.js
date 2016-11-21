
import React from 'react';
import {
    Button,
    Form,
    Input,
    Select,
    Modal,
    Upload,
    Icon,
    message,
    Cascader,
    Tag 
} from 'antd';

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

class AddComm extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'AddComm';
        this.state = {
            commSeries:"",
            commName: "",
            commNet: [],
            commPrice: "1499.00",
            imgType: "commDetail",      
            commColor:[],
            commCont:[],
            commService:[],
            commAdv:"28日首销",
            commAdv2:"235s6",
            commSeller:"1",
            username:localStorage.username,
            imgNameArr: new Map(),
            imgColorArr:[],
            imgColor:'',
            //上传图片按钮状态
            uploadBtnState: true,
            //上传图片窗口状态
            imgWindowVisible: false,
            fileList:[],
            getSeries:[],
            options:[],
            commColorArr:[],
            commContArr:[],
            commNetArr:[],
            commServiceArr:[]

        }
    }

        // let colorArr=["yellow","black","red","silver"]
        //         let commColorArr = []
        //         for (let i = 0; i < 4; i++) {
        //             commColorArr.push(<Option  key={colorArr[i]}><Tag closable={false} color={colorArr[i]}>{colorArr[i]}</Tag></Option>)
        //         }

        //         let contArr=["16GB","32GB","64GB","128GB"]
        //         let commContArr = []
        //         for (let i = 0; i < 4; i++) {
        //             commContArr.push(<Option  key={contArr[i]}>{contArr[i]}</Option>)
        //         }

        //         let NetArr=["电信","移动","联通"]
        //         let commNetArr = []
        //         for (let i = 0; i < 3; i++) {
        //             commNetArr.push(<Option  key={NetArr[i]}>{NetArr[i]}</Option>)
        //         }
        //         let ServiceArr=["屏碎保一年","意外保一年","延保一年","盗抢保一年"]
        //         let commServiceArr = []
        //         for (let i = 0; i < 4; i++) {
        //             commServiceArr.push(<Option  key={ServiceArr[i]}>{ServiceArr[i]}</Option>)
        //         }


    // setCommName(e) {
    //     this.setState({
    //         commName: e.target.value
    //     })
    // }



    cascad(e){
        this.state.commSeries=e[0];
        this.state.commName=e[1]
        this.state.getSeries.map((item,index)=>{if(e[0]===item.commSeries){
                                this.state.commColorArr=[];
                this.state.commContArr=[];
                this.state.commNetArr=[];
                this.state.commServiceArr=[];

             for (let i = 0; i < item.seriesColor.length; i++) {
                    this.state.commColorArr.push(<Option  key={item.seriesColor[i]}><Tag closable={false} color={item.seriesColor[i]}>{item.seriesColor[i]}</Tag></Option>)
                }
             for (let i = 0; i < item.seriesCapacity.length; i++) {
                    this.state.commContArr.push(<Option  key={item.seriesCapacity[i]}>{item.seriesCapacity[i]}</Option>)
                }    
              for (let i = 0; i < item.seriesNet.length; i++) {
                    this.state.commNetArr.push(<Option  key={item.seriesNet[i]}>{item.seriesNet[i]}</Option>)
                }   
              for (let i = 0; i < item.seriesService.length; i++) {
                    this.state.commServiceArr.push(<Option  key={item.seriesService[i]}>{item.seriesService[i]}</Option>)
                }console.log(this.state.commServiceArr)
        }})
        this.forceUpdate();

      }

    setCommColor(value) {

        this.setState({commColor:value});
        
        
            }
    setCommPrice(e) {
        this.setState({
            commPrice:e.target.value
        })
    }

      setCommCont(value) {
        this.setState({
            commCont: value
        })
    }
    setCommNet(value) {
        this.setState({
            commNet: value
        })
    }
    setCommService(value) {
        this.setState({
            commService: value
        })
    }
    setCommAdv(e) {
        this.setState({
            commAdv: e.target.value
        })
    }
    setCommAdv2(e) {
        this.setState({
            commAdv2: e.target.value
        })
    }
    setCommSeller(value) {
        this.setState({
            commSeller: value
        })
    }  

    resetClick(){
        this.setState({
            commSeries:"",
            commName: "",
            commNet: [],
            commPrice: "",
            commColor:[],
            commCont:[],
            commService:[],
            commAdv:"",
            commAdv2:"",
            username:""
        })
    }
    componentWillMount(){
        this.getSeries();
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
                var arr=[];
                this.state.commColor.map((item,index)=>{arr.push(<Option key={index} value={item} >{item}</Option>)}
               )
                this.setState({
                    commId: data,
                    uploadBtnState: false,
                    imgColorArr:arr
                })
            })
    }



    getSeries() {
        fetch("/series/getSeries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `{}`,
                credentials: 'include'
            })
            .then(function(response) {
                return response.json();
            }).then((data) => {
                var sobj=[];
                this.state.getSeries =data;
                sobj = data.map((item,index)=>{
                    var children=[];
                    children = item.commName.map((item,index)=>{
                             var obj = {value:item,
                            label:item,
                            key:index
                        }
                        return obj;
                       
                    })
                        var ssobj={
                            value:item.commSeries,
                            label:item.commSeries,
                            children:children,
                            key:index
                        }
                        return     ssobj;
                })
                            this.setState({
                                options:sobj
                            });
               
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
                body: `commodityImgs=${JSON.stringify({commId: this.state.commId,imgColor:this.state.imgColor,imgType: this.state.imgType, arr})}`,
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
                body: `commodityImgs=${JSON.stringify({commId: this.state.commId, imgColor: this.state.imgColor})}`,
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

   

    /*

    commName: "string",
    commType: "string",
    commColor: [],
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
            <Form horizontal>
       
             <FormItem
            label="商品系列及名称"
            {...formItemLayout}
        >
          <Cascader options={this.state.options} onChange={(e)=>this.cascad(e)} placeholder="Please select" />
               </FormItem>

        <FormItem
            label="商品价格"
            {...formItemLayout}
        >
          <Input size="small" value={this.state.commPrice}  onChange={(e)=>this.setCommPrice(e)} placeholder="请输入商品价格" />
        </FormItem>

        <FormItem
            label="商品广告1"
            {...formItemLayout}
        >
          <Input size="small" value={this.state.commAdv} onChange={(e)=>this.setCommAdv(e)} placeholder="请输入商品广告1" />
        </FormItem>

        <FormItem
            label="商品广告2"
            {...formItemLayout}
        >
          <Input size="small" value={this.state.commAdv2} onChange={(e)=>this.setCommAdv2(e)} placeholder="请输入商品广告2" />
        </FormItem>


        <FormItem
          label="商品颜色"
          {...formItemLayout}
        >
          <Select
            size="large"
                    multiple
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    value={this.state.commColor}
                    onChange={(value) => this.setCommColor(value)}
                  >
                    {this.state.commColorArr}
                  </Select>
        </FormItem>

               <FormItem
          label="商品容量"
          {...formItemLayout}
        >
          <Select
            size="small"
                    multiple
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    value={this.state.commCont}
                    onChange={(value) => this.setCommCont(value)}
                  >
                    {this.state.commContArr}
                  </Select>
        </FormItem>

          <FormItem
          label="商品网络"
          {...formItemLayout}
        >
          <Select
            size="small"
                    multiple
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    value={this.state.commNet}
                    onChange={(value) => this.setCommNet(value)}
                  >
                    {this.state.commNetArr}
                  </Select>
        </FormItem>

        <FormItem
          label="商品服务"
          {...formItemLayout}
        >
          <Select
            size="small"
                    multiple
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    value={this.state.commService}
                    onChange={(value) => this.setCommService(value)}
                  >
                    {this.state.commServiceArr}
                  </Select>
        </FormItem>


            <FormItem
          label="商品热销状态"
          {...formItemLayout}
        >
          <Select size="small" value={this.state.commSeller} style={{ width: 200 }} onChange={ (value) => this.setCommSeller(value) }>
                  <Option value="0">热销</Option>
                  <Option value="1">普通</Option>
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
        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
            <Button size="small" onClick={ () => this.addComm() } style={{marginRight: 10}} type="primary">保存</Button>
            <Button size="small" onClick={ () => this.resetClick() } type="primary">重置</Button>
        </FormItem>
        </Form>
        );
    }
}

export default AddComm;
import React from 'react';
import { 
    Table, 
    Icon,
    Pagination,
    Button,
    Modal,
    Form,
    Input,
      message,      
    Cascader,
    Tag ,
        Select


} from 'antd';

import { hashHistory } from "react-router";
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

class Allcomm extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = "Allcomm";
        this.state = {
            data:[{
                username:"Elsie",
                commSeries:"R系列",
                commName:"R9",
                commNet:["联通","移动"],
                commColor:["玫瑰金","银色","黑色"],
                commCont:["16GB","32GB","64GB"],
                commPrice:"1999.00",
                commService:["一年包修","半年包换","质保延期"],
                commAdv:["大道至简","绝美外观"],
                commAdv2:["大道至简","绝美外观"],
                commSeller:"HOT",
                commId:"123"
            },{
                username:"Coco",
                commSeries:"A系列",
                commName:"A12",
                commNet:["全网通","移动","联通"],
                commCont:["16GB","32GB","64GB"],
                commColor:["玫瑰金","银色","黑色"],
                commPrice:"2999.00",
                commService:["一年包修","半年包换","质保延期"],
                commAdv:["大道至简","绝美外观"],
                commAdv2:["大道至简","绝美外观"],
                commSeller:"HOT",
                commId:"123"
            },{
                username:"Kestrel",
                commSeries:"F系列",
                commName:"F31",
                commNet:["全网通","移动"],
                commColor:["玫瑰金","银色","黑色"],
                commCont:["16GB","32GB","64GB"],
                commPrice:"1999.00",
                commService:["一年包修","半年包换","质保延期"],
                commAdv:["大道至简","绝美外观"],
                commAdv2:["大道至简","绝美外观"],
                commSeller:"Normal",
                commId:"123"
            }],
            curPage:1,
            eachPage:10,
            count:0,
            delVisible:false,
            changeVisible:false,
            _id:"",
            changeData:[],
            getSeries:[],
            options:[],
            commColorArr:[],
            commContArr:[],
            commNetArr:[],
            commServiceArr:[]
        };
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


        del(text,recd){
                    this.setState({
                        delVisible:true,
                        _id:recd._id
                    })
               }

         delOk(){
                   
                           fetch("/commodity/delComm", {
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
                                    this.getComm();
                            })
         }    

              changeOk(){
                                    console.log(this.state.changeData)
                           fetch("/commodity/changeComm", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                },
                                body: `data=${JSON.stringify(this.state.changeData)}`,
                                credentials: 'include'
                            })
                            .then(function(response) {
                                return response.json();
                            }).then((data) => {
                                       this.setState({
                                            changeVisible:false
                                        })
                                    this.getComm();
                            })
         }

         delCancel(){this.setState({
                                            delVisible:false
                                        })}    
         changeCancel(){this.setState({
                                            changeVisible:false
                                        })
            this.getComm();
     }


        change(record){
                  this.state.changeData=record;
                  this.cascad([record.commSeries,record.commName])
                 this.setState({
                        changeVisible:true,
                        changeData:record
                    })

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


       getComm() {
        if(this.getCookie('userType')!=1){
        fetch("/commodity/getCommByUsername", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `username=${localStorage.username}`,
                credentials: 'include'
            })
            .then(function(response) {
                return response.json();
            }).then((data) => {
                    this.state.data  = data;
                    this.forceUpdate();

            })
        }else{
            fetch("/commodity/getAllComm", {
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
                    this.state.data  = data;
                    this.forceUpdate();

            })
        }
    }

   cascad(e){ 
        this.state.changeData.commSeries=e[0];
        this.state.changeData.commName=e[1]
        this.state.getSeries.map((item,index)=>{if(e[0]===item.commSeries){
                this.state.changeData=[];
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
                }
        }})
        this.forceUpdate();

      }

    setCommColor(value) {

        this.state.changeData.commColor=value;
                this.forceUpdate();

                          
       }

    setCommPrice(e) {
       
        this.state.changeData.commPrice=e.target.value;
                this.forceUpdate();

     
    }

      setCommCont(value) {
        this.state.changeData.commCont=value;
                this.forceUpdate();

        
    }
    setCommNet(value) {

            this.state.changeData.commNet=value;
                    this.forceUpdate();


    }
    setCommService(value) {
         this.state.changeData.commService=value;
                 this.forceUpdate();

        
    }
    setCommAdv(e) {
          this.state.changeData.commAdv=e.target.value;
                  this.forceUpdate();

     
    }
    setCommAdv2(e) {
            this.state.changeData.commAdv2=e.target.value;
                    this.forceUpdate();

    }
    setCommSeller(value) {
           this.state.changeData.commSeller=value;
                   this.forceUpdate();

    }  


    componentWillMount(){
        this.getComm();
        this.getSeries();
    }

    render(){
          const formItemLayout = {
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 12
            },
        };
        const columns = [
            {
                title: '用户',
                dataIndex: 'username',
                key: 'username',
            }, {
                title: '系列',
                dataIndex: 'commSeries',
                key: 'commSeries',
            }, {
                title: '商品',
                dataIndex: 'commName',
                key: 'commName',
            },{
                title: '网络',
                dataIndex: 'commNet',
                key: 'commNet',
                render: (text, record) => (
                    
                    text.map((item,index) => {
                        return <span key={`net${index}`} >{item}{"/"}</span>
                    })                    
                ),
            },{
                title: '颜色',
                dataIndex: 'commColor',
                key: 'commColor',
                render: (text, record) => (
                    
                    text.map((item,index) => {
                        return <span key={`color${index}`} >{item}{"/"}</span>
                    })                    
                ),
            },{
                title: '价格',
                dataIndex: 'commPrice',
                key: 'commPrice',
            },{
                title: '服务',
                dataIndex: 'commService',
                key: 'commService',
                render: (text, record) => (
                    
                    text.map((item,index) => {
                        return <span key={`service${index}`} >{item}{"/"}</span>
                    })                    
                ),
            },{
                title: '容量',
                dataIndex: 'commCont',
                key: 'commCont',
                render: (text, record) => (
                    
                    text.map((item,index) => {
                        return <span key={`cont${index}`} >{item}{"/"}</span>
                    })                    
                ),
            },{
                title: '广告',
                dataIndex: 'commAdv',
                key: 'commAdv',
             
            },{
                title: '广告2',
                dataIndex: 'commAdv2',
                key: 'commAdv2',
                
            },{
                title: '热销状态',
                dataIndex: 'commSeller',
                key: 'commSeller',
            }, {
                    title: '商品图片',
                    dataIndex: 'commImgs',
                    key: 'commImgs',
                    render: (text, record) => (
                        <span>
                      <a href="#" onClick={(e) => {
                        e.preventDefault();
                        hashHistory.push(`/info/commodity/imgList/${record._id}/${record.commColor}`)
                      }}>点击查看</a>
                    </span>
                    ),
                },
            {
                title: '操作',
                key: 'commId',
                render: (text, record) => (
                    <div>
                        <Button  type="primary" size="small" onClick={ () => this.del(text,record)}>删除</Button>{" "}
                                <Modal title="删除提示" visible={this.state.delVisible}
                                  onOk={()=>this.delOk()} onCancel={()=>this.delCancel()}
                                >
                                  <p>是否确认删除</p>
                                  
                                </Modal>
                        <Button type="primary" size="small"   onClick={ () => this.change(text,record) }>修改</Button>
                        <Modal title="修改" visible={this.state.changeVisible}
                                  onOk={()=>this.changeOk()} onCancel={()=>this.changeCancel()}
                                >
                                  <Form horizontal>
       
             <FormItem
            label="商品系列及名称"
            {...formItemLayout}
        >
          <Cascader options={this.state.options}  onChange={(e)=>this.cascad(e)} placeholder="Please select" />
               </FormItem>

        <FormItem
            label="商品价格"
            {...formItemLayout}
        >
          <Input size="small" value={this.state.changeData.commPrice}  onChange={(e)=>this.setCommPrice(e)} placeholder="请输入商品价格" />
        </FormItem>

        <FormItem
            label="商品广告1"
            {...formItemLayout}
        >
          <Input size="small" value={this.state.changeData.commAdv} onChange={(e)=>this.setCommAdv(e)} placeholder="请输入商品广告1" />
        </FormItem>

        <FormItem
            label="商品广告2"
            {...formItemLayout}
        >
          <Input size="small" value={this.state.changeData.commAdv2} onChange={(e)=>this.setCommAdv2(e)} placeholder="请输入商品广告2" />
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
                    value={this.state.changeData.commColor}
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
                    value={this.state.changeData.commCont}
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
                    value={this.state.changeData.commNet}
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
                    value={this.state.changeData.commService}
                    onChange={(value) => this.setCommService(value)}
                  >
                    {this.state.commServiceArr}
                  </Select>
        </FormItem>


            <FormItem
          label="商品热销状态"
          {...formItemLayout}
        >
          <Select size="small" value={this.state.changeData.commSeller} style={{ width: 200 }} onChange={ (value) => this.setCommSeller(value) }>
                  <Option value="0">热销</Option>
                  <Option value="1">普通</Option>
                </Select>
        </FormItem>
                </Form>

                                </Modal>
                    </div>
                ),
            }
        ];

        return (
            <Table columns={columns} dataSource={this.state.data}/>
        )
    }
}

export default Allcomm;
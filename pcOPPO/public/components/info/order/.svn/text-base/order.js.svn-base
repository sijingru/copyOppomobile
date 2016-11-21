
import React from 'react';
import { Row, Col,Menu, Icon ,Table , Modal , Button ,Form , Select , Input , message , Cascader , Tag } from 'antd';
import{hashHistory} from "react-router";
import classNames from 'classnames';

const InputGroup = Input.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;

	class Order extends React.Component {
	    constructor(props) {
	        super(props);
	        this.displayName = 'Order';
	        this.state = {
                     id:"",
                     _id:"",
                     key:"1",
      	        		 data:[],
      	        		 data1:[],
      	        		 options:[],
                     commColor:"",
                     optionCont:[],
                     commCont:"",
                     commNet:"",
                     optionNet:[],
                     commPrice:"",
                     godId:"",
                     shoppAddress:"",
                     phone:"",
                     commData:[]
					        }
	    }

//修改事件
		  handleOk(record,value) {
                    this.setState({
                      commColor:value,
                      commNet:value,
                      commCont:value
                    })
              fetch("/order/updateComm", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `commColor=${this.state.commColor}&commNet=${this.state.commNet}&_id=${this.state._id}&commCont=${this.state.commCont}&commPrice=${this.state.commPrice}`,
                    credentials: 'include'
                })
                .then(function(response) {
                    // return response.json();
                }).then((data) => {     
                   this.getCommodity();
                   message.info("商品修改成功");
                   this.setState({
                    commCont:'',
                    commColor:"",
                    commNet:"",
                    commPrice:""
                   })
                })


		    this.setState({
		      ModalText: 'The modal dialog will be closed after two seconds',
		      confirmLoading: true,
		    });
		    setTimeout(() => {
		      this.setState({
		        visible: false,
		        confirmLoading: false,
		      });
		    }, 500);
		  }

		  handleCancel() {
		    this.setState({
		      visible: false,
		    });
		  }

//cookie
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

//渲染页面
	  componentWillMount() {
        this.getCommodity();
    }
    

//渲染页面获取数据
    getCommodity(){
            if(this.getCookie('userType')!=1){
      var username = localStorage.username;
       fetch("/order/getCommodity", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `username=`+username,
                    credentials: 'include'
                })
                .then(function(response) {
                    return response.json();
                }).then((data) => { 
                  this.state.data=data;
                  this.state.data=[];
                   data.map((item,index)=>{
                        item.key=index+1;
                        this.state.data.push(item);
                    })    
                  this.forceUpdate();
                })
              }
              else{
                   fetch("/order/getAllCommodity", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                },
                                body: `{ }`,
                                credentials: 'include'
                            })
                            .then(function(response) {
                                return response.json();
                            }).then((data) => { 
                              this.state.data=data;
                              this.state.data=[];
                               data.map((item,index)=>{
                                    item.key=index+1;
                                    this.state.data.push(item);
                                })    
                              this.forceUpdate();
                            })
              }
    }

        handleChange(value) {
          console.log(`${value}`);
        }

//点击修改时候的方法
        showModal(record) {
			    this.setState({
			      visible: true
			    })
            // 根据ID获取杨超渲染页面的哪项数据
                 fetch("/commodity/getAddCommID", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: `_id=`+record.id,
                        credentials: 'include'
                    })
                    .then(function(response) {
                        return response.json();
                    }).then((data) => {
                      this.setState({
                        _id:record._id
                      })
                        this.state.data1 = data;
                            var arrColor=[];
                            arrColor=data[0].commColor.map((item, index)=> {
                                var op='';
                                op=  <Option key={index} value={item}>{item}</Option>
                                        return   op;
                                })
                                this.setState({
                                    options:arrColor
                                })

                            var arrCont=[];
                            arrCont=data[0].commCont.map((item, index)=> {
                                var opCont='';
                                opCont=  <Option key={index} value={item}>{item}</Option>
                                        return   opCont;
                                })
                                this.setState({
                                    optionCont:arrCont
                                })

                            var arrNet=[];
                            arrNet=data[0].commNet.map((item, index)=> {
                                var opNet='';
                                opNet=  <Option key={index} value={item}>{item}</Option>
                                        return   opNet;
                                })
                                this.setState({
                                    optionNet:arrNet
                                })
                        })    
		  }

       setCommColor(value) {
        this.setState({commColor:value});
            }

         setCommCont(value) {
        this.setState({commCont:value});
            }

         setCommNet(value) {
        this.setState({commNet:value});
            }

        setCommPrice(e) {
        this.setState({commPrice:e.target.value});
            }


// record就是选择的哪一项
        del(record) {
                fetch("/order/delOrder", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: "_id="+record._id,
                        credentials: 'include'
                    })
                    .then(function(response) {
                        return response.json();
                    }).then((data) => {
                        message.info('删除成功');
                        this.getCommodity();
                    });
            }    

//搜索
        handleChangeColor(value) {
            this.setState({
                commColor:value
            })
        }

        handleChangeCont(value) {
            this.setState({
                commCont:value
            })
        }

        handleChangeNet(value) {
            this.setState({
                commNet:value
            })
        }
//搜索方法
        searchList(){
          var username = localStorage.username;
            fetch("/order/searchList", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: `username=${username}&commColor=${this.state.commColor}&commNet=${this.state.commNet}`,
                        credentials: 'include'
                    })
                    .then(function(response) {
                        return response.json();
                    }).then((data) => {
                        this.state.data=data;
                        this.state.data=[];
                         data.map((item,index)=>{
                              item.key=index+1;
                              this.state.data.push(item);
                              this.setState({
                                commNet:'',
                                commColor:"",
                                commCont:""
                               })
                          })    
                        this.forceUpdate();
                          });
        }
 //显示全部     
    all(){

      this.getCommodity();
      this.setState({
         commNet:'',
         commColor:"",
         commCont:""
      })
    }

 //显示个人信息
    information(record){
      this.setState({
        modal1Visible: true,
        shoppAddress:record.shoppAddress,
        phone:record.phone
      });
      

    }   
   
    handleOkinformation() {
      this.setState({
        modal1Visible: false,
      });
    }
    handleCancelInformation(e) {
      this.setState({
        modal1Visible: false,
      });
    }

//商品详细信息
  commInfo(record){
       fetch("/commodity/getAddCommID", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: `_id=`+record.id,
                        credentials: 'include'
                    })
                    .then(function(response) {
                        return response.json();
                    }).then((data) => {
                      this.state.commData=[];
                       for (var item in data[0]){
                        if(item =='commPrice'){
                           this.state.commData.push(<p key="1">商品价格:{data[0][item]}</p>);
                        }else if(item == 'commSeries'){
                           this.state.commData.push(<p key="2">商品系列:{data[0][item]}</p>);
                        }else if(item == 'commCont'){
                          this.state.commData.push(<p  key="3">商品容量:{data[0][item].join(" , ")}</p>);
                        }else if(item =='commColor'){
                          this.state.commData.push(<p  key="4">商品颜色:{data[0][item].join(" , ")}</p>);
                        }else if(item =='commSeries'){
                          this.state.commData.push(<p  key="5">商品系列:{data[0][item].join(" , ")}</p>);
                        }else if(item =="commName"){
                           this.state.commData.push(<p  key="6">商品名称:{data[0][item]}</p>);
                        }else if(item =="commAdv2"){
                           this.state.commData.push(<p  key="7">商品广告:{data[0][item]}</p>);
                        }else if(item =="commNet"){
                           this.state.commData.push(<p  key="8">商品网络:{data[0][item].join(" , ")}</p>);
                        }
                      }
                      this.forceUpdate();
                      })  

           this.setState({
              modal2Visible: true,
            });        

    }   
   
    handleOkcommInfo() {
      this.setState({
        modal2Visible: false,
      });
    }
    handleCancelcommInfo(e) {
      this.setState({
        modal2Visible: false,
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
		  title: '卖家姓名',
		  dataIndex: 'username',
		  key: 'username',
		}, {
		  title: '买家信息',
		  dataIndex: 'godId',
		  key: 'godId',
            render: (text, record) =>( 
              <span >
              <a href="javascript:void(0)" onClick={()=>{this.information(record)}}>{text}</a>
              <Modal title="个人信息" visible={this.state.modal1Visible } wrapClassName='info' style={{width:200}}
                onOk={()=>this.handleOkinformation()} onCancel={()=>this.handleCancelInformation() }              
              >
              {`    `}<p>客户联系地址：{this.state.shoppAddress}</p>
              {`    `}<p>客户联系电话：{this.state.phone}</p>
              </Modal>
              </span>
              )
		}, {
		  title: '商品系列',
		  dataIndex: 'commSeries',
		  key: 'commSeries',
		}, {
		  title: '商品名称',
		  dataIndex: 'commName',
		  key: 'commName',
		}, {
		  title: '颜色',
		  dataIndex: 'commColor',
		  key: 'commColor',
		}, {
		  title: '价格',
		  dataIndex: 'commPrice',
		  key: 'commPrice',
		}, {
		  title: '容量',
		  dataIndex: 'commCont',
		  key: 'commCont',
		}, {
		  title: '网络',
		  dataIndex: 'commNet',
		  key: 'commNet',
		},{
      title: '商品信息',
      dataIndex: 'commInfo',
      key: 'commInfo',
      render: (text, record) =>( 
              <span >
              <a href="javascript:void(0)" onClick={()=>{this.commInfo(record)}}>查看详细信息</a>
              <Modal title="商品详情" visible={this.state.modal2Visible } wrapClassName='info'
                onOk={()=>this.handleOkcommInfo()} onCancel={()=>this.handleCancelcommInfo() }
              >
              {this.state.commData}
              </Modal>
              </span>
              )
    },{
		  title: '操作',
		  key: 'id',
		  render: (text, record) => (
		    <span>
		    	<Button type="primary" onClick={ () => this.del(record) }>删除</Button>&nbsp;&nbsp;
				<Button type="primary" onClick={ ()=>this.showModal(record) }>修改</Button>
				 <Modal title="请选择你要修改的信息"
                  visible={this.state.visible}
                  onOk={()=>this.handleOk(record)}
                  confirmLoading={this.state.confirmLoading}
                  onCancel={()=>this.handleCancel()}
					                >
                   <span>请选择颜色</span>：{`    `}<Select  style={{ width: 245 }} onChange={(value)=>{this.setCommColor(value)}}  value={this.state.commColor}>
					      {this.state.options}
                          </Select><br /><br />

                    <span>请选择容量</span>：{`    `}<Select  style={{ width: 245 }} onChange={(value)=>{this.setCommCont(value)}}  value={this.state.commCont}>
                          {this.state.optionCont}
                        </Select><br /><br />

                    <span>请选择网络</span>：{`    `}<Select  style={{ width: 245 }} onChange={(value)=>{this.setCommNet(value)}}  value={this.state.commNet}>
                          {this.state.optionNet}
                        </Select><br /><br />
                        <span>请输入价格</span>：{`    `}
                    <Input  value = {this.state.commPrice} style={{ width: 245 }} onChange={(e)=>{this.setCommPrice(e)}} type="number"/>
                </Modal>
		    </span>
		  ),
		}];

        
    return (
        <div>
            <span>请选择商品颜色</span>:&nbsp;&nbsp;
            <Select value={this.state.commColor} style={{ width: 200 }} onChange={(value)=>{this.handleChangeColor(value)}}>
              <Option value="yellow">yellow</Option>
              <Option value="black">black</Option>
              <Option value="red">red</Option>
              <Option value="silver">silver</Option>
               <Option value="gold">gold</Option>
                <Option value="blue">blue</Option>
            </Select>&nbsp;&nbsp;
            <span>请选择商品容量</span>:&nbsp;&nbsp;
            <Select value={this.state.commCont} style={{ width: 200 }} onChange={(value)=>{this.handleChangeCont(value)}}>
              <Option value="16GB">16GB</Option>
              <Option value="32GB">32GB</Option>
              <Option value="64GB">64GB</Option>
              <Option value="128GB">128GB</Option>
            </Select>&nbsp;&nbsp;
            <span>请选择商品网络</span>:&nbsp;&nbsp;
            <Select  value={this.state.commNet} style={{ width: 200 }} onChange={(value)=>{this.handleChangeNet(value)}}>
              <Option value="移动">移动</Option>
              <Option value="联通">联通</Option>
              <Option value="电信">电信</Option>
            </Select>&nbsp;&nbsp;
            <Button type="primary" onClick={()=>{this.searchList()}}>搜索</Button>&nbsp;&nbsp;
            <Button type="primary" onClick={()=>{this.all()}}>显示全部</Button>
            <Table columns={columns} dataSource={this.state.data} />
        </div>  
    );        
  }
}

export default Order;
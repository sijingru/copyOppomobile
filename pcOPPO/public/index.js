import React from "react";
import {
    render
} from "react-dom";

import Login from "./components/login/login.js";
import Info from "./components/info/info.js";
import Commodity from "./components/info/commodity/commodity.js";
//users模块的加载路径
import User from "./components/info/user/user.js";
import AddUsers from "./components/info/user/addUsers.js";
import GetUsers from "./components/info/user/getUsers.js";
import EditUsers from "./components/info/user/editUsers.js";

import Series from "./components/info/series/series.js";
import Order from "./components/info/order/order.js";

import Addcomm from "./components/info/commodity/addComm.js";
import Addseries from "./components/info/series/addseries.js";
import AddDetail from "./components/info/series/addDetail.js";
import Allcomm from "./components/info/commodity/allcomm.js";
import ImgList from "./components/info/commodity/imgList.js";
import GetcommBySeries from "./components/info/series/getcommBySeries.js";


import {
    Router,
    Route,
    hashHistory,
    IndexRoute
} from "react-router";

import "./index.less";
import "./antd.css";

var getCookie =(c_name)=>{
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



render((
    <Router history={ hashHistory }>
        <Route path="/" component={ Login }></Route>
        <Route path="/login/:username" component={ Login }></Route>
        <Route path="/info" onEnter={(nextState,replace)=>{if(!eval(getCookie("isLogin"))){
            replace({pathname:"/"})
        }}}  component={Info}>
            <IndexRoute component={ Commodity }/>
           
            <Route path="commodity" component={ Commodity }>
                <Route path="addcomm" component={ Addcomm }/>                
                <Route path="allcomm" component={ Allcomm }/>
                <Route path="imgList/:commId/:commColor" component={ ImgList }/>
            </Route>
            <Route path="order" component={ Order }></Route>
             <Route path="series" onEnter={(nextState,replace)=>{if(getCookie("userType")!=1){alert("您不是超级管理员,没有权限查看")
            replace({pathname:"/info"})
        }}}   component={ Series }>
                <Route path="addseries" component={ Addseries }/>
                <Route path="addDetail" component={ AddDetail }/>
                <Route path="getcommBySeries" component={ GetcommBySeries }/>
            </Route>
            <Route path="user" onEnter={(nextState,replace)=>{if(getCookie("userType")!=1){alert("您不是超级管理员,没有权限查看")
            replace({pathname:"/info"})
        }}}  component={ User }>
                <Route path="addUsers" component={ AddUsers }/>
                <Route path="getUsers" component={ GetUsers }/>
                <Route path="editUsers(/:id)" component={ EditUsers }/>
            </Route>
        </Route>
    </Router>
), app);



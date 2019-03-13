<template>
  <div class="header">
    <div class="container">
      <div class="text">
        <transition name="bounceleft">
          <span v-show="title_show">一键纠错的在线协作文档</span>
        </transition>
      </div>
      <div class="logo">
        <img src="@/assets/logo1.png"/>
      </div>
      <div class="navbar">
        <ul class="nav nav_login" v-show="!loginStatus">
          <li ><router-link to="/login">登录</router-link></li>
          <li><router-link to="/register">注册</router-link></li>
          <!--<li style="font-size:40px;top:-2px;"><a>···</a></li>-->
        </ul>
        <ul class="nav navbar-nav" v-show="loginStatus">
          <li>
            <router-link :to="{name:'notice_board',path:'/notice_board/'+username,params:{username:username,notices:getNotices.notices}}" @notice_clear="notice_show"><div class="notice_icon" :class="getNotices.notice_num?'notice_after':''" :data-haorooms="getNotices.notice_num" @click="notice_show"></div></router-link>
            <img class="head_portrait" :src="getAvater" @click="hideBox()"></img>
          </li>
        </ul>
      </div>
      <!--<div class="row header">-->
      <!--<div class="logo col-lg-4 col-md-4"><img src="./assets/logo1.png"></div>-->
      <!--<div class="text col-lg-4 col-md-4">-->
      <!--<transition name="bounceleft">-->
      <!--<span class="col-lg-4 col-md-4 to_tl" v-show="title_show">一键纠错的在线协作文档</span>-->
      <!--</transition>-->
      <!--</div>-->
      <!--<nav class="navbar nav-default col-lg-4 col-md-4">-->
      <!--<ul class="nav navbar-nav" v-show="!loginStatus">-->
      <!--<li>-->
      <!--<div></div>-->
      <!--</li>-->
      <!--<li style="font-size:20px;" ><router-link to="/login">登录</router-link></li>-->
      <!--<li style="font-size:20px;" ><router-link to="/register">注册</router-link></li>-->
      <!--&lt;!&ndash;<li style="font-size:40px;top:-2px;"><a>···</a></li>&ndash;&gt;-->
      <!--</ul>-->
      <!--<ul class="nav navbar-nav" v-show="loginStatus">-->
      <!--<li>-->
      <!--<router-link :to="{name:'notice_board',path:'/notice_board/'+username,params:{username:username,notices:notices.notices}}" @notice_clear="notice_show"><div class="notice_icon" :class="notices.notice_num?'notice_after':''" :data-haorooms="notices.notice_num" @click="notice_show"></div></router-link>-->
      <!--<img class="head_portrait" :src="avater" @click="show_user=true"></img>-->
      <!--</li>-->
      <!--&lt;!&ndash;<li style="font-size:20px;cursor: pointer" @click="Cancellation"><a>注销</a></li>&ndash;&gt;-->
      <!--&lt;!&ndash;<li style="font-size:40px;top:-2px;cursor: pointer" @click="show_menus" ><a class="menus_btn" >···</a></li>&ndash;&gt;-->
      <!--</ul>-->
      <!--</nav>-->
      <div class="user_box" v-show="show_user" id="user_box">
        <ul>
          <li><span>{{getNickname}}</span></li>
          <router-link style="padding: 0;font-style: normal" :to="{name:'userinfo',params:{username:username,avater:getAvater,nickname:getNickname,email:email}}"><li><span>账户信息</span></li></router-link>
          <li @click="Cancellation"><span>退出登陆</span></li>
        </ul>
      </div>
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  import api from "@/api/api.js"
  import {delCookie,getCookie} from "@/cookie/cookie.js"
  export default {
    data(){
      return {
        username:"",
        email:"",
        nickname:"",
        title_show:false,
        notice_num:0,
        notices:{}
      }
    },
    props:['show_user'],
    methods:{
      hideBox(){//点击头像通知父组件隐藏信息box
        this.$emit('hideBox')
      },
      //显示通知框
      async notice_show(){
        let notices = [];
        console.log('notices:'+this.notices.notices);
        if(!this.notices.notices){
          return ;
        }
        this.notices.notices.forEach((item)=>{
          notices.push(item.nid);
        })
        console.log(notices);
        let params ={
          data:{
            username:this.username,
            notices:notices
          }
        };
        try{
          let result = await api.readNotice(params);
          $(".notice_icon").removeClass("notice_after"); //除掉通知左上角的提醒标识
          return result;
        }catch(err){
          throw(err);
        }
      },
      Cancellation(){
        // delCookie("username");
        // var obj = { username:""};
        // var str = JSON.stringify(obj);
        // sessionStorage.username = str;
        //登出调用接口
        // try{
        //   let result = await api.logout();
        // }catch(err){
        //   throw(err);
        // }
        delCookie("username")
        sessionStorage.clear();
        this.$store.commit('LoginOut');
        this.$router.push("/login");
      },
      //获取通知框信息
      async init_notice(){
        try{
          let result = await api.getNoticeData(this.username);
          this.notices = result.data;
          this.$store.commit('changeNotices',this.notices); //改变vuex中state中的notices状态
        }catch(err){
          throw(err);
          console.log(err);
        }
      },
    },
    created(){

    },
    mounted(){
      this.title_show = true;
      this.username = getCookie("username");
      if(typeof this.username=='string'&&this.username){//刷新页面时重新获取通知栏信息
        this.init_notice();
      }
    },
    computed: {
      loginStatus() {
        return this.$store.state.loginStatus;
      },
      getAvater(){
        return this.$store.state.avater;
      },
      getNickname(){
        return this.$store.state.nickname;
      },
      getNotices(){
        return this.$store.state.notices;
      }
    }
  }
</script>
<style scoped>
  .container{
    padding: 0;
    min-height: 100%;
    overflow: hidden;
    height: 100%;
    background-color:#eeeeee;
  }
  .header{
    width: 100%;
    height: 55px;
    min-width:980px;
    background: #eee;
  }

  .logo{
    margin-left: -100%;
    float: left;
    width: 28%;
    height: 100%;
    background-color: rgb(17,165,134);
  }

  .logo img{
    width: 136px;
    height: 16px;
    float: right;
    margin:18px 30px;
  }

  .text{
    float: left;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 55px;
  }
  .text span{
    width: auto;
    font-size: 20px;
    color: #ACADAF;
    font-family: 'Microsoft YaHei';
  }

  .navbar{
    margin-left: -28%;
    font-size:18px;
    font-family: 'Microsoft YaHei';
    color: #11A586;
    float: left;
    width: 28%;
  }
  .navbar li{
    display: inline-block;
    list-style: none;
    line-height: 50px;
    font-size: 24px;
  }
  .navbar li a {
    text-decoration: none;
  }
  .navbar li:nth-of-type(2){
    margin-left: 34px;
  }
  .navbar-nav li:first-of-type a{
    padding: 2px 10px;
    height:50px ;
  }
  .notice_icon{
    display: inline-block;
    width: 50px;
    height: 50px;
    cursor: pointer;
    background: url("/static/u33.png") no-repeat;
    background-size: cover;
    margin-bottom: 5px;
    position: relative;
  }
  .notice_after:after{
    content: attr(data-haorooms);
    font-size: 12px;
    text-align: center;
    line-height: 20px;
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    background: #ff0000;
    border-radius: 50%;
    color:white;
    left: 25px;
  }
  .head_portrait{
    display: inline-block;
    width: 50px;
    height: 50px;
    background-size: 50px 50px;
    margin-top: 2px;
    cursor: pointer;
    border-radius: 50%;
  }
  .bounceleft-enter-active{
    animation: bounce-in 2s forwards;
    -webkit-animation:bounce-in 2s forwards;
  }

  /*点击用户头像弹出*/
  .user_box{
    width: 200px;
    height: 120px;
    position: absolute;
    right: 20%;
    top:55px;
    background: white;
    z-index: 100;
  }
  .user_box ul{
    padding: 0;
  }
  .user_box ul li{
    width: 200px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    list-style: none;
  }
  .user_box ul li:nth-child(2), .user_box ul li:nth-child(3){
    cursor: pointer;
  }
  .user_box ul li:nth-child(3){
    color: #ff0000;
  }
  .user_box ul li:nth-child(3):hover{
    color: #333;
  }
  .user_box ul li span{
    display: inline-block;
    width:160px;
    height: 40px;

  }
  .user_box ul li:first-of-type span,.user_box ul li:nth-of-type(2) span{
    border-bottom: 1px solid #eee;
  }
  /*点击用户头像弹出*/

  /*协作时点击三个点弹出*/
  .teamwork_box{
    width: 200px;
    height: 160px;
    position: absolute;
    right: 300px;
    top:55px;
    background: white;
    z-index: 100;
  }
  .teamwork_box ul{
    padding: 0;
  }
  .teamwork_box ul li{
    text-align: center;
    list-style: none;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
  }
  .teamwork_box ul li span{
    display: inline-block;
    width:160px;
    height: 40px;
    border-bottom: 1px solid #eee;
  }
  .teamwork_box ul li:last-of-type span{
    border-bottom:0;
  }

  @keyframes bounce-in {
    0% {
      margin-left: -300px;
      opacity: 0;
    }
    60% {
      margin-left: 8%;
      opacity: 1;
    }
    80% {
      margin-left: 4%;
      opacity: 1;
    }
    100% {
      margin-left :6%;
      opacity :1;
    }
  }
  @-webkit-keyframes bounce-in{
    0% {
      margin-left :-300px;
      opacity :0;
    }
    60% {
      margin-left: 8%;
      opacity :1;
    }
    80% {
      margin-left :4%;
      opacity :1;
    }
    100% {
      margin-left :6%;
      opacity: 1;
    }
  }
</style>

<template>
  <div class="login">
    <img class="title" src="../../assets/logo3.png">
    <div class="content">
      <p class="login_title">登录</p>
      <form>
        <input class="username" type="text" placeholder="账号/邮箱" style="border: 0px;outline:none;cursor: pointer;" v-model="username" @keyup.enter="login" autofocus="autofocus" spellcheck="false">
        <input class="password" type="password" placeholder="密码" style="border: 0px;outline:none;cursor: pointer;" v-model="password" @keyup.enter="login" spellcheck="false">
        <input class="submit" @click="login" type="button" value="点击登录" style="border: 0px;outline:none;cursor: pointer;"/>
        <img class="remember" :src=flag?check:not_check @click="remember"></img>
      </form>
      <p class="forget">忘记密码了？ <span>找回密码</span></p>
      <div class="line"></div>
      <p class="register">还没有注册？ <span @click="register">现在来注册</span></p>
    </div>
  </div>
</template>

<script>
  import api from "@/api/api.js"
  import {setCookie} from "@/cookie/cookie.js"
    export default {
        data(){
          return {
            flag:false,
            check:"static/rem.png",
            not_check:"static/rem2.png",
            username:"",
            password:"",
            avater:"static/icon.png",
            nickname:"昵称"
          }
        },
        methods: {
          //获取通知框信息
          async init_notice(){
            // var storage = window.sessionStorage;
            // storage.setItem("notices",JSON.stringify(this.notices.notices));
            try{
              let result = await api.getNoticeData(this.username);
              this.notices = result.data;
              this.$store.commit('changeNotices',this.notices);
            }catch(err){
              throw(err);
              console.log(err);
            }
          },
          async getInfo(){//登陆以后获取用户信息用于头部显示
            try{
              let result = await api.getUserInfo(this.username);
              var response = result.data;
              if(response.avater){
                this.avater = response.avater;
                sessionStorage.setItem('avater',this.avater)//保存头像用于头部显示
              }
              this.nickname = response.nickname;
              sessionStorage.setItem('nickname',this.nickname);//保存昵称用于头部显示
              this.$store.commit('changeInfo',{avater:this.avater,nickname:this.nickname});
              this.email = response.email;
            }catch (err){
              alert("信息获取失败")
              console.log(err)
            }
          },
          register() {
            this.$router.push('/register');
          },
          remember() {
            this.flag = !this.flag;
          },
          async login(){
            if(this.username==""||this.password==""){
              alert("账号或密码不能为空");
              return;
            }
            // this.$router.push({name:'myfile',params:{username:this.username}});
            //接口请求
            try{
              let params ={
                data:{'username':this.username,'password':this.password}
              };
              let result = await api.loginIn(params);
              var res = result.data;
              console.log(res);
              if(res.code == 1){
                alert("登陆成功!")
                // if(this.flag){
                //   console.log("flag")
                //   storage.setItem("username",this.username);
                //   storage.setItem("password",this.password);
                // }else {
                //   storage.setItem("username","");
                //   storage.setItem("password","");
                // }
                // sessionStorage.setItem('username',this.username);
                setCookie("username",this.username,1);
                this.getInfo();
                this.init_notice();
                this.$store.commit('LoginIn');
                this.$router.push({name:'myfile'});
              }else{
                alert("用户不存在或密码错误!")
              }
            }catch (err){
              alert("登录失败")
              console.log(err)
            }
          }
        },
      mounted(){
      }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
.login{
  background: #fff;
  width: 300px;
  height: 400px;
  margin: 112px auto;
  text-align: center;
}
  .login .title{
    width: 135px;
    height: 26px;
    margin-top: 30px;
    /*margin-left: 50%;*/
  }
  .login .content{
    margin: 28px auto;
  }
  .login .content .login_title{
    font-family: STHeitiSC-Medium;
    font-size: 18px;
    color: #333333;
    text-align: center;
  }
  .login .content form{
    margin: 14px 0;
    position: relative;
    padding: 0 20px;
  }
  .login .content form input{
    height: 50px;
    /*margin-left: 10%;*/
    background: #f5f5f5;
    border-radius: 3px;
    font-size: 18px;
  }
  .login .content form input::-webkit-input-placeholder{
      color:#999;
  }
  .username,.password{
    padding-left: 4%;
    padding-right: 10%;
  }
  .login .content .password{
    margin-top:10px;
  }
  .login .content .submit{
    background:#13ac8c;
    margin-top: 10px;
    color: #fff;
    width: 250px;
  }
  .remember{
    width:6.25% ;
    height: 20px;
    position: absolute;
    top: 75px;
    right: 40px;
    cursor: pointer;
  }
  .forget{
    font-family: STHeitiSC-Light;
    font-size: 12px;
    color: #666;
    text-align: center;
    margin-top: 10px;
  }
  .forget span{
    color:#3f87ff;
    cursor: pointer;
  }
  .line{
    width: 100%;
    height: 3px;
    background: #eeeeee;
    margin-top: 20px;
  }
  .register{
    font-size: 16px;
    font-family: STHeitiSC-Light;
    color: #666;
    text-align: center;
    margin-top: 8px;
  }
  .register span{
    color:#3f87ff;
    cursor: pointer;
  }
</style>

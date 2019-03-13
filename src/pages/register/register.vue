<template>
  <div class="register">
    <img class="title" src="../../assets/logo3.png">
    <div class="content">
      <p class="register_title">注册</p>
      <form>
        <input class="email" type="text" placeholder="邮箱" style="border: 0px;outline:none;cursor: pointer;" v-model="email" @keyup.enter="register">
        <input class="username" type="password" placeholder="密码" style="border: 0px;outline:none;cursor: pointer;" v-model="password" @keyup.enter="register">
        <input class="password" type="password" placeholder="重复密码" style="border: 0px;outline:none;cursor: pointer;" v-model="repeat_password" @keyup.enter="register">
        <input @click="register" class="submit" type="button" value="点击注册" style="border: 0px;outline:none;cursor: pointer;"/>
      </form>
      <div class="line"></div>
      <p class="jump_register">已经有账号？ <span @click="login">现在登录</span></p>
    </div>
  </div>
</template>

<script>
  import api from "@/api/api.js"
  import {setCookie} from "@/cookie/cookie.js"
    export default {
      data(){
        return{
          repeat_password:"",
          email:"",
          password:""
        }
      },
      methods:{
        login(){
          this.$router.push('/login');
        },
        async register(){
          var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
          if(this.repeat_password==""||this.password==""||this.email==""){
            alert("密码或邮箱不能为空");
            return;
          }
          if(!myReg.test(this.email)){
            alert("邮箱格式不对");
            return;
          }
          if(this.repeat_password!=this.password){
            alert("两次密码输入不对");
          }
          try{
            let params ={
              data:{password:this.password,username:this.email}
            };
            let result = await api.register(data);
            var res = result.data;
            if(res.code == 0){
              alert("用户已存在")
            }else {
              alert("注册成功")
              // var storage = window.sessionStorage;
              setCookie("username",this.email)
              // var obj = { username:this.email };
              // var str = JSON.stringify(obj);
              // sessionStorage.username = str;
              this.$store.commit('LoginIn')
              // setCookie('username',this.username,1000*60);
              this.$router.push({name:'myfile'});
            }
          }catch (err){
            alert("注册失败")
            console.log(err)
          }

        }
      }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .register{
    background: #fff;
    width: 300px;
    height: 450px;
    margin: 112px auto;
    text-align: center;
  }
  .register .title{
    width: 135px;
    height: 26px;
    margin-top: 30px;
    /*margin-left: 27%;*/
  }
  .register .content{
    margin: 28px auto;
  }
  .register .content .register_title{
    font-family: STHeitiSC-Medium;
    font-size: 18px;
    color: #333333;
    text-align: center;
  }
  .register .content form{
    margin: 14px 0;
    padding: 0 20px;
    position: relative;
  }
  .register .content form input{
    height: 50px;
    /*margin-left: 10%;*/
    background: #f5f5f5;
    border-radius: 3px;
    font-size: 18px;
  }
  .register .content form input::-webkit-input-placeholder{
    color:#999;
  }
  .username,.password,.email{
    padding-left: 4%;
    padding-right: 10%;
  }
  .register .content .username{
    margin-top:10px;
  }
  .register .content .password{
    margin-top:10px;
  }
  .register .content .submit{
    width: 250px;
    background:#13ac8c;
    margin-top: 10px;
    color: #fff;
  }
  .line{
    width: 100%;
    height: 3px;
    background: #eeeeee;
    margin-top: 28px;
  }
  .jump_register{
    font-size: 16px;
    font-family: STHeitiSC-Light;
    color: #666;
    text-align: center;
    margin-top: 14px;
  }
  .jump_register span{
    color:#3f87ff;
    cursor: pointer;
  }
</style>

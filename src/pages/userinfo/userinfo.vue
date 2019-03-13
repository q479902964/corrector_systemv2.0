<template>
    <div class="userinfo">
        <div class="user_icon"><input  @change="updateImg()"  type="file" style="width: 80px;height: 80px;" enctype=”multipart/form-data” id="file" accept = 'image/gif,image/jpeg,image/jpg,image/png'></input></div>
        <input type="text" class="user_name" :value=nickname placeholder="昵称"></input>
        <div class="user_text">
          <span>账号</span>&nbsp;&nbsp;&nbsp;<span id="email">{{username}}</span>
        </div>
        <div class="user_text">
          <span>时间</span>&nbsp;&nbsp;&nbsp;<span>{{date}}</span>
        </div>
        <div class="btn_yes" @click="update"></div>
    </div>
</template>

<script>
  import api from "@/api/api.js"
  import {getCookie} from "@/cookie/cookie.js"
    export default {
      data(){
        return {
          username:"",
          avater:"static/icon.png",
          nickname:"",
          date:""
        }
      },
      methods:{
        async getInfo(){//登陆以后获取用户信息用于头部显示
          try{
            let result = await api.getUserInfo(this.username);
            var response = result.data;
            console.log(response)
            if(response.avater){
              this.avater = response.avater;
            }
            this.nickname = response.nickname;
            this.email = response.email;
            this.date = response.create_time;
            $(".user_icon").css("background-image","url(\""+this.avater+"\")");
            $(".user_name").attr('placeholder',this.nickname);
          }catch (err){
            alert("用户信息获取失败")
            console.log(err)
          }
        },
        updateImg(){
          var file = document.getElementById("file").files;
          for(var i = 0; i< file.length; i++) {
            var reader  = new FileReader();
            reader.readAsDataURL(file[i]);
            reader.onload=function(e){
              $(".user_icon").css("background-image","url(\""+ this.result+"\")");
            }
          }
          console.log($('#file')[0].files[0])
        },
        async update(){
          if($(".user_name").eq(0).val()==""){
            alert("请输入昵称");
            return;
          }

          try{
            let params = {
              data:{
                imgFile:$('#file')[0].files[0],
                nickname:$(".user_name").eq(0).val(),
                username:this.username,
                flag:0
              }
            }
            let result = await api.updateFile(params);//更新用户信息
            let res = result.data;
            if(res.imgUrl){
              this.avater = res.imgUrl;
            }
            sessionStorage.setItem('avater',this.avater)//保存头像用于头部显示
            sessionStorage.setItem('nickname',this.nickname);//保存昵称用于头部显示
            this.$store.commit('changeInfo',{avater:this.avater,nickname:$(".user_name").eq(0).val()});
            $(".user_icon").eq(0).css("background-image",this.avater);
            this.$router.push({name:'myfile',params:{username:this.username}});
          }catch (err){
            console.log(err)
            alert("个人信息修改失败")
          }
        }
      },
      mounted(){
        this.username = getCookie("username")
        console.log("userinfo:"+this.username)
        this.getInfo();//获取用户信息
      }
    }
</script>

<style scoped>
.userinfo{
  width: 400px;
  height: 430px;
  position: fixed;
  top:176px;
  left: 50%;
  margin-left: -250px;
  background: #fff;
  border-radius: 3px;
}
  .user_icon{
    width: 80px;
    height: 80px;
    background-size: 80px 80px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    border-radius: 50%;
  }
  input[type="file"] {
    opacity:0;
    filter:alpha(opacity=0);
    cursor: pointer;
  }
  .user_name{
    width: 100%;
    text-align: center;
    margin-top: 12px;
    margin-left: auto;
    border: 0;
    outline:none;
  }
.user_text,.user_text{
  margin-left: 26.8%;
  margin-top: 15px;
  font-family:STHeitiSC-Light;
  font-size: 18px;
  color: #333;
}
  .btn_yes{
    width: 100px;
    height: 40px;
    background-image: url("./yes.png");
    background-size: 100px 40px;
    margin-top: 80px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
  }
</style>

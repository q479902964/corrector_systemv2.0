<template>
  <div class="main_box">
    <div class="header_title">
      <h1>通知框</h1>
      <img src="./delete.png" @click="back_to_file">
    </div>
    <div class="wrapper_box">
      <div class="notice_box" v-show="!check_show">
        <ul v-for="(item,index) in notices">
          <li>
            <div class="notice">
              <img :src="item.notice_icon">
              <span class="notice_content">{{notice_text[index]}}</span>
              <div class="not_state" v-show="item.state==2">
                <div class="accept btn" @click="stateChange(item.nid,1,item,index)">同意</div>
                <div class="refuse btn" @click="stateChange(item.nid,0,item,index)">拒绝</div>
              </div>
              <div class="state0" v-show="item.state==0&&item.notice_type==0">
                <div class="cli btn">已拒绝</div>
              </div>
              <div class="state1" v-show="item.state==1&&item.notice_type==0">
                <div class="cli btn">已同意</div>
              </div>
              <div class="state2" v-show="item.state==3" @click="check_notice(index)">
                <div class="cli btn">查看</div>
              </div>
              <span class="notice_date">{{item.notice_time}}</span>
            </div>
            <div style="width: 100%;height: 2px;color:white;"></div>
          </li>
        </ul>
      </div>
      <div class="check_box" v-show="check_show">
        <div class="read">已阅</div>
        <img src="./u136.png" class="back_notice" @click="check_show=false">
        <div class="left_box">
          <img :src="notice_content.notice_icon" class="user_icon">
          <span class="user_name">{{notice_content.notice_user}}：</span>
          <span class="notice_time">{{notice_content.notice_time}}</span>
        </div>
        <div class="right_box"></div>
        <!--<div class="right_box"><p v-for="item in JSON.parse(notice_content.content)">{{item}}</p></div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import api from "../../api/api.js"
    export default {
        name: "main_box",
        props:{
          notices:{
          },
          username:"",
          nickname:""
        },
        data(){
          return{
            check_show:false,
            flag:false,
            notice_content:{}
          }
        },
        mounted(){
        },
        methods:{
          //返回我的文档
          back_to_file(){
            this.$router.push('/file')
          },
          //点击查看
          check_notice(index){
            this.check_show = true;
            this.notice_content = this.notices[index];
            console.log(this.notice_content.content)
            this.content_parse();
          },
          async stateChange(nid,state,item,index){
            if(state==1){
              $(".state1").eq(index).show();
              $('.not_state').eq(index).hide();
              try{
                let params ={
                  data:{
                    state:1,
                    nid:nid,
                    file_id:item.file_id,
                    username:this.username,
                    file_name:item.notice_filename
                  }
                };
                let result = await api.isAcceptNotice(params);
                let data = result.data;
                if(data.code==1){
                  alert("添加成功！")
                }else{
                  alert("添加失败！")
                }
              }catch(err){
                alert("添加失败！")
                throw(err);
              }
            }else if(state==0){
              $(".state0").eq(index).show();
              $('.not_state').eq(index).hide();
              try{
                let params ={
                  data:{
                    state:0,
                    nid:nid,
                    file_id:item.file_id,
                    username:this.username
                  }
                };
                let result = await api.isAcceptNotice(params);
                let data = result.data;
                if(data.code==0){
                  alert("拒绝成功！")
                }else{
                  alert("添加失败！")
                }
              }catch(err){
                alert("添加失败！")
                throw(err);
              }
            }
          },
          content_parse(){
            var data = this.notice_content.content;
            var regExp = /\[.*?\]/g; //匹配[]和里面包括的东西
            if(data.match(regExp)){
              // data = eval('(' + data + ')');//用eval()不安全
              data = JSON.parse(data);
            }
            if(data instanceof Array){
              var content = ""
              for(var i =0;i<data.length;i++){
                content += "<p>"+data[i]+"</p>";
              }
              $('.right_box').html(content)
            }else{
              $('.right_box').html(data);
            }
          }
        },
        computed:{
          notice_text(){ //不用type对应不同的信息类型，详细看接口文档
            var notices = this.notices;
            var notices_text = [];
            for(var i=0;i<notices.length;i++){
                switch (notices[i].notice_type){
                  case 0:notices_text.push(notices[i].notice_nickname+"：邀请你成为协作者  《"+notices[i].notice_filename+"》");break;
                  case 1:notices_text.push(notices[i].notice_nickname+"：发出了新的工作安排——《"+notices[i].notice_filename+"》");break;
                  case 2:notices_text.push("我：提交了一份文档——《"+notices[i].notice_filename+"》");break;
                  case 3:notices_text.push("我：向“"+notices[i].inviter+"”发出了协作邀请——《"+notices[i].notice_filename+"》");break;
                  case 4:notices_text.push(notices[i].notice_nickname+"：同意了您的协作邀请——《"+notices[i].notice_filename+"》");break;
                  case 5:notices_text.push(notices[i].notice_nickname+"：向您提交了一份文档——《"+notices[i].notice_filename+"》");break;
                  case 6:notices_text.push("您：发出了新的工作安排——《"+notices[i].notice_filename+"》");break;
                  default:break;
                }
            }
            return notices_text;
          }
        }
    }
</script>

<style scoped>
  img {
    vertical-align: top;
  }
  *{
    margin: 0;
    padding: 0;
  }
  .main_box{
    width: 1030px;
    height: 540px;
    background: #fff;
    margin: 80px auto;
    border-radius: 3px;
  }
  .header_title{
    width: 100%;
    height: 52px;
    background: #11a586;
    border-radius: 3px 3px 0 0;
    position: relative;
  }
  .header_title h1{
    /*float: left;*/
    position:absolute;
    left:50%;
    transform:translate(-50%,0);
    padding-top: 18px;
    font-style: normal;
    font-family: STHeitiSC-Light;
    font-size:20px ;
    color: #fff;
    /*margin-left: 47%;*/
  }
  .header_title img{
    float: right;
    width: 25px;
    height: 25px;
    margin-top: 15px;
    margin-right: 18px;
    color: #fff;
    cursor: pointer;
  }
  .wrapper_box{
    width: 100%;
    height:490px;
    display: flex;
  }

  /*通知栏*/
  .notice_box{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .notice_box ul li{
    list-style: none;
    width: 100%;
    height: 55px;
  }
  .notice_box ul li .notice{
    width: 100%;
    height: 53px;
    background: #e4e4e4;
    line-height: 55px;
    position: relative;
  }
  .notice img{
    width: 40px;
    height: 40px;
    margin-left: 100px;
    border-radius:50%;
    margin-top: 7px;
  }
  .notice .notice_content{
    display: inline-block;
    width: 30%;
    height: 53px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-left: 10px;
  }
  .btn{
    display: inline-block;
    width: 70px;
    height: 30px;
    background: #282828;
    line-height: 30px;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }
  .accept,.refuse,.notice_date,.cli{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .accept{
    right: 300px;
  }
  .refuse{
    right: 200px;
  }
  .notice_date{
    right: 60px;
  }
  .cli{
    right: 250px;
  }

  /*通知栏查看box*/
  .left_box,.right_box{
    float: left;
    margin-top: 40px;
  }
  .left_box{
    margin-left: 100px;
    width: 200px;
    height: 350px;
    border-right: 2px solid #f5f5f5;
  }
  .right_box{
    box-sizing: border-box;
    overflow:auto;
    width: 720px;
    height: 350px;
    padding-top: 20px ;
    padding-left: 50px;
  }
  @media only screen and (max-width: 1417px) {
    .right_box{
      width: 58%;
    }
  }
  .check_box{
    width: 100%;
    height: 100%;
    position: relative;
    font-size:16px;
  }
  .back_notice{
    position: absolute;
    width: 50px;
    height: 50px;
    top: 10px;
    left: 10px;
    cursor: pointer;
  }
  .user_icon{
    width: 40px;
    height: 40px;
    margin-bottom: 5px;
  }
  .notice_time{
    display: block;
    margin-left: 45px;
  }
  .user_name{
    font-size: 20px;
  }
  .read{
    width: 150px;
    height: 30px;
    background:#f5f5f5;
    text-align: center;
    line-height: 30px;
    position: absolute;
    top:90%;
    left: 50%;
    transform: translateX(-50%);
  }
  /*通知栏查看box*/
</style>

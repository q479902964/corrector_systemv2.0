<template>
    <div class="teamwork_edit">
      <!--<edit_box type="teamwork_edit" :id="id":isCollaborator="this.$route.params.isCollaborator"-->
                <!--:file_name="this.$route.params.file_name" :content="this.$route.params.content" :star="this.$route.params.isStar"-->
                <!--:teamwork_members="this.$route.params.members" :chat_list="this.$route.params.chat_list" :username="this.$route.params.username"-->
                <!--@changeFileid="changeFileid"></edit_box>-->
      <edit_box ref="ed" type="teamwork_edit" :id=id :isCollaborator=isCollaborator
                :file_name=file_name :content=content :star=star
                :teamwork_members=teamwork_members :chat_list=chat_list :username=username :creator=creator
                @changeFileid="changeFileid" @change_filename="change_filename"></edit_box>
      <div class="menu">
        <ul>
          <li @click="init_editHistory"><img src="./footprint.png"><img src="./footprint1.png" v-show="false"><span class="check_history">查看历史</span></li>
          <li @click="gen('docx')"><img src="./down.png"><img src="./down1.png" v-show="false"><span>导出文档</span></li>
          <li><input type="file" class="input_file" @change="choose_file"><img src="./upload.png"><img src="./upload1.png" v-show="false"><span>导入文档</span></li>
          <li @click="add_myfile"><img src="./my.png"/><img src="./my1.png" v-show="false"><span>添加为个人文档</span></li>
        </ul>
      </div>
      <div class="history_box" v-show="history_show">
        <div class="history_title">
          <span>历史纪录</span>
          <img class="delete_history" src="/static/delete.png" @click="history_show=false"></img>
        </div>
        <ul>
          <li v-for="item in edit_history"><span>我 编辑了{{item.filename}}</span><span>{{item.add_date}}</span></li>
        </ul>
      </div>
    </div>
</template>

<script>
  import api from "../../api/api.js"
  import edit_box from '@/components/edit_box/edit_box'
  import {getCookie} from "@/cookie/cookie.js"
  export default {
    components:{
      edit_box
    },
    data(){
      return {
        username:"",
        edit_history:{},
        history_show:false,
           file_name:"",
           content:"",
           star:0,
           creator:"",
           id:0,
          teamwork_members:[],
          chat_list:[],
          isCollaborator:0
      }
    },
    methods:{
      change_filename(filename){
        this.file_name = filename;
      },
      choose_file(){
        var file = document.getElementsByClassName('input_file')[0].files[0];
        var url =this.getObjectURL(file);
        this.$refs.ed.input_file(url);
        console.log(url)
      },
      //添加为个人文档
      add_myfile(){
        this.$refs.ed.add_myfile();
      },
      gen(){
        this.$refs.ed.exportDoc();
      },
      //导入文档
      input_file(url){
        // var w = new ActiveXObject('Word.Application');
        // var docText;
        // var obj;
        // if(w != null) {
        //   w.Visible = true;
        //   obj = w.Documents.Open(url);
        //   docText = obj.Content;
        //   w.Selection.TypeText("Hello");
        //   w.Documents.Save();
        //   $('#edit_area').text(docText);//Print on webpage
        //   /*The Above Code Opens existing Document
        //    set w.Visible=false
        //    */
        //   /*Below code will create doc file and add data to it and will close*/
        //   w.Documents.Add();
        //   w.Selection.TypeText("Writing This Message ....");
        //   w.Documents.Save(url);
        //   w.Quit();
        //   /*Don't forget
        //    set w.Visible=false */
        // }
        alert("此功能暂未开放")
      },
      //获取历史数据
      async init_editHistory(){
        this.history_show = true;
        try{
          let result = await api.get_editHistroy(this.username);
          let data = result.data;
          this.edit_history = data.history;
        }catch(err){
          alert("获取历史纪录失败！")
          throw(err);
        }
      },
      changeFileid(id){
        this.id = id;
        this.$router.push("/teamwork_edit/"+this.id);
      },
      async init_post(){
        try{
          this.id = this.$route.params.id;
          if(typeof (this.id)=='undefined'){
            return;
          }
          console.log(this.id);
          let result = await api.get_post(this.id);
          let data = result.data;
          this.$nextTick(()=>{
            this.isCollaborator = data.isCollaborator;
            this.file_name =data.file_name;
            this.content = data.content;
            this.star = data.isStar;
            this.teamwork_members = data.members;
            this.chat_list = data.chat;
          })
        }catch(err){
          throw(err);
          console.log(err);
        }
      },
      add_history(){
        this.$emit('add_history')
      },
      menuHover(){
        $('.menu li').mouseover(function () {
          $(this).find('img').eq(0).hide();
          $(this).find('img').eq(1).show();
        })
        $('.menu li').mouseout(function () {
          $(this).find('img').eq(0).show();
          $(this).find('img').eq(1).hide();
        })
      },
      getObjectURL (file) {
        let url = null ;
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file) ;
        }else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
        }else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file) ;
        }
        return url ;
      }
    },
    beforeDestroy(){
      // this.intId = clearInterval(this.intId);
    },
    created(){
      this.id = this.$route.params.id;
      this.isCollaborator = this.$route.params.isCollaborator;
      this.file_name = this.$route.params.file_name;
      this.star = this.$route.params.isStar;
      this.teamwork_members = this.$route.params.members;
      this.chat_list = this.$route.params.chat_list;
      this.username = this.$route.params.username;
      this.creator = this.$route.params.creator;
      this.content = this.$route.params.content;
      if(typeof(this.username)=='undefined'){
        this.username = getCookie("username");
      }
      if(typeof(this.file_name)=='undefined'){
        this.init_post();
      }
    },
    mounted(){
      this.username = getCookie("username")
      this.menuHover();
    },
  }
</script>

<style scoped>
  .teamwork_edit{
    margin-top: 80px;
  }
  .teamwork_edit .edit_box{
    width: 1030px;
    height: 540px;
    background: #fff;
    /*margin: 80px auto;*/
    border-radius: 3px;
    float:left;
    margin-left:14%;
    /*transform: translateX(-20%);*/
  }
  /*查看历史*/
  .history_box{
    width: 540px;
    height: 301px;
    position: absolute;
    top:50%;
    left: 50%;
    margin-top: -105px;
    margin-left: -270px;
    background: white;
    z-index: 100;
    border: 1px solid #eee;
    overflow: hidden;
  }
  .history_box .history_title{
    border-radius: 3px 3px 0 0;
    width: 100%;
    height: 50px;
    background: #11a586;
    text-align: center;
    color: white;
    font-size: 16px;
    line-height: 50px;
    position: relative;
  }
  .delete_history{
    position: absolute;
    top:5px;
    right: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin: 10px;
  }
  .history_box ul li{
    list-style: none;
    border-bottom: 1px solid #eee;
    /*padding-bottom: 20px;*/
    height: 50px;
    line-height: 50px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .history_box ul li span:nth-of-type(2){
    float: right;
  }
  .history_box ul li:nth-of-type(3){
    position: relative;
  }
  /*查看历史*/
  /*菜单*/
  .menu{
    float:left;
    width:90px;
    margin-left: 10px;
    margin-top: 40px;
  }
  .menu ul li{
    width: 90px;
    height: 115px;
    background: white;
    list-style: none;
    text-align: center;
    margin-top: 10px;
    border-radius: 3px;
    cursor: pointer;
    position: relative;
  }
  .menu ul li img{
    width: 35px;
    height: 40px;
    margin-top: 20px;
  }
  .menu ul li:hover{
    background:#11a586 ;
  }
  .menu ul li:hover span{
    color: white;
  }
  .menu ul li span{
    margin-top: 10px;
    display: block;
    color: #11a586;
    font-size: 16px;
  }
  .menu ul li:last-of-type span{
    font-size: 12px;
  }
  .input_file{
    position: absolute;
    top:0;
    width: 90px;
    height: 115px;
  }
</style>
<style>
  input[type="file"] {
    opacity:0;
    filter:alpha(opacity=0);
    cursor: pointer;

  }
</style>


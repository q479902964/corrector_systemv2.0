<template>
    <div class="file_box">
      <div class="header-box">
        <div class="left-header">
          <img class="menus" src="./menus.png">
          <span class="title" v-show="type=='myfile'">我的文件</span>
          <span class="title" v-show="type=='teamworkfile'">协作文件</span>
          <span class="title" v-show="type=='starfile'">星标文件</span>
          <span class="title" v-show="type=='bin'">回收站</span>
          <router-link :to="{name:'edit',params:{username:this.username}}" v-show="type=='myfile'||type=='starfile'||type=='bin'"><div class="add_file"><img src="./add.png"><span>新建</span></div></router-link>
          <router-link :to="{name:'teamwork_edit',params:{username:this.username}}" v-show="type=='teamworkfile'"><div class="add_file"><img src="./add.png"><span>新建</span></div></router-link>
          <router-link :to="{name:'correction_bin',params:{username:this.username}}"><div class="delete_file"><img src="./trash.png"><span>回收站</span></div></router-link>
          <span class="clear_file" @click="clear_file" v-show="type=='bin'">[清空]</span>
        </div>
        <div class="search_file"><img src="./search.png"><input type="text" placeholder="输入要查找的文档关键字" v-model="searchString"/></div>
      </div>
      <div class="key_title myfile starfile" v-show="type=='myfile'||type=='starfile'">
        <table>
          <tr style="height:14px" class="info_to">
            <th>
              <div style="width: 14px;height: 14px;border: 1px solid #bfbfbf;border-radius: 1px;display: inline-block;"></div>
              <span class="file_tl">文件名</span>
            </th>
            <th style="margin-left: 170px" >最近更新</th>
            <th style="margin-left: 140px">创建时间</th>
          </tr>
          <tr style="height:14px" class="info_list" v-for="item in filteredFile" @click="jump(item,type)">
            <td style="width: 42%;">
              <img src="./delete.png" class="delete" @click.stop="delete_file(item)">
              <img :src="item.isStar?isStar:notStar" @click.stop="star_toggle(item)">
              <span class="list_tl">{{item.file_name}}</span>
            </td>
            <td style="width: 34%;">{{item.update_time}}</td>
            <td style="width: 20%;">{{item.create_time}}</td>
          </tr>
        </table>
      </div>
      <div class="key_title teamworkfile" v-show="type=='teamworkfile'">
        <table>
          <tr style="height:14px" class="info_to">
            <th >
              <div style="width: 14px;height: 14px;border: 1px solid #bfbfbf;border-radius: 1px;display: inline-block;"></div>
              <span class="file_tl">文件名</span>
            </th>
            <th style="margin-left: 125px" >创建人</th>
            <th style="margin-left: 70px">协作成员</th>
            <th style="margin-left: 40px">创建时间</th>
            <th style="margin-left: 55px">最近更新</th>
          </tr>
          <!--<tr style="height:14px" class="info_list">-->
          <!--<td style="width: 250px;">-->
          <!--<img class="star" src="./star1.png">-->
          <!--<span class="list_tl">挑战杯比赛项目产品文档</span>-->
          <!--</td>-->
          <!--<td style="width: 140px" ><img class="avater" src="../../../static/icon.png">&nbsp;屁桃</td>-->
          <!--<td style="width: 150px">-->
          <!--<img class="avater" src="../../../static/icon.png">-->
          <!--</td>-->
          <!--<td style="width: 150px">2017-01-03</td>-->
          <!--<td style="width: 130px">2018-03-02</td>-->
          <!--</tr>-->
          <tr style="height:14px" class="info_list" v-for="item in filteredFile" @click="jump(item,type)">
            <td style="width: 30%;">
              <img src="./delete.png" class="delete" @click.stop="delete_file(item)">
              <img class="star" :src="item.isStar?isStar:notStar" @click.stop="star_toggle(item)">
              <span class="list_tl">{{item.file_name}}</span>
            </td>
            <td style="width: 16.5%" ><img class="avater" :src="item.creator_pic">&nbsp;{{item.creator_nickname}}</td>
            <td style="width: 15%">
              <img class="avater" :src="img.icon" v-for="img in item.members">
            </td>
            <td style="width:17%">{{item.create_time}}</td>
            <td style="width: 18%">{{item.update_time}}</td>
          </tr>
        </table>
      </div>
      <div class="key_title correction_bin" v-show="type=='bin'">
        <table>
          <tr style="height:14px" class="info_to">
            <th style="">
              <div style="width: 14px;height: 14px;border: 1px solid #bfbfbf;border-radius: 1px;display: inline-block;"></div>
              <span class="file_tl">文件名</span>
            </th>
            <th style="margin-left: 170px" >最近更新</th>
            <th style="margin-left: 140px">删除时间</th>
          </tr>
          <tr style="height:14px" class="info_list" v-for="item in file">
            <td style="width: 42%;">
              <img class="delete" src="./delete.png" @click="delete_file(item)">
              <img class="bin" src="./bin.png" @click="recover_file(item)">
              <span class="list_tl">{{item.file_name}}</span>
            </td>
            <td style="width: 34%;">{{item.update_time}}</td>
            <td style="width: 20%;">{{item.delete_time}}</td>
          </tr>
        </table>
      </div>
    </div>
</template>

<script>
  import api from "@/api/api.js"
    export default {
        name: "file_box",
        props:{
          type:"",
          file:{},
          username:""
        },
      data(){
        return {
          // username:"",
          // file:{},
          isStar:"/static/star2.png",
          notStar:"/static/star1.png",
          searchString:""
        }
      },
      methods:{
        jump(item,type){
          if(type=='myfile'){
            this.$router.push({path:'/edit/'+item.file_id,name:'edit',params:{username:this.username,file_name:item.file_name,content:item.content,isStar:item.isStar,id:item.file_id}});
          }else if(type=='teamworkfile'){
            this.$router.push({name:'teamwork_edit',params:{username:this.username,
                file_name:item.file_name,content:item.content,isStar:item.isStar,id:item.file_id,members:item.members,
                chat_list:item.chat,isCollaborator:item.isCollaborator,creator:item.creator},path:'/teamwork_edit/'+item.file_id});
          }else if(type=='starfile'){
            if(item.creator){
              this.$router.push({path:'/teamwork_edit/'+item.file_id,name:'teamwork_edit',params:{username:this.username,
                  file_name:item.file_name,content:item.content,isStar:item.isStar,id:item.file_id,teamwork_members:item.teamwork_members,
                  chat_list:item.chat,isCollaborator:item.isCollaborator,creator:item.creator}});
            }else{
              this.$router.push({path:'/edit/'+item.id,name:'edit',params:{username:this.username,file_name:item.file_name,content:item.content,isStar:item.isStar,id:item.id}});
            }
          }
        },
        async star_toggle(item){
          var id = item.file_id;
          var data ={id:id,username:this.username}
          try{
            let params = {
              data:data
            }
            let result = await api.starToggle(params);
            result = result.data;
            item.isStar =!item.isStar;
            this.$router.go(0)
            console.log(result)
          }catch(err){
            alert("星标切换失败")
            throw(err);
          }
        },
        async delete_file(item){
          if(this.type=='bin'){
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
            }
            var delete_time =year + "-"+month+"-"+strDate
            var id = item.id;
            var data ={id:id,username:this.username,delete_time:delete_time}

            try{
              let params = {
                data:data
              }
              let result = await api.deltrash(params);
              this.$router.go(0)
            }catch(err){
              alert("删除文档失败")
              throw(err);
            }

          }else{
            var data = {id:item.file_id,username:this.username}
            try{
              let params = {
                data:data
              }
              let result = await api.deleteFile(params);
              this.$router.go(0)
            }catch(err){
              alert("删除文档失败")
              throw(err);
            }
          }
        },
        async recover_file(item){
          var id = item.id;
          var data ={id:id,username:this.username}
          console.log("恢复文档"+data)
          try{
            let params = {
              data:data
            }
            let result = await api.deleteFile(params);
            this.$router.go(0)
          }catch(err){
            alert("恢复文档失败")
            throw(err);
          }
        },
        async clear_file(){
          var id = -1;
          var data ={id:id,username:this.username}
          try{
            let params = {
              data:data
            }
            let result = await api.deltrash(params);
            this.$router.go(0)
          }catch(err){
            alert("清空文档失败")
            throw(err);
          }
        }
      },
      mounted(){
        // this.username = this.$route.params.username;
      },
      computed:{
        filteredFile: function () {
          var file_array = this.file,
            searchString = this.searchString;
          if(!searchString){
            return file_array;
          }else {
            searchString = searchString.trim().toLowerCase();
            file_array = file_array.filter(function(item){
              if(item.file_name.toLowerCase().indexOf(searchString) !== -1){
                return item;
              }
            })
            // Return an array with the filtered data.
            return file_array;
          }
        }
      }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
    vertical-align: middle;
  }
  .file_box{
    width: 100%;
    position: relative;
    height: 540px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .header-box{
    margin-top: 20px;
    margin-left: 5%;
    width: 100%;
    display: flex;
  }
  .menus{
    width: 16px;
    height: 16px;
  }
  .title{
    font-family:STHeitiSC-Light;
    font-size: 16px;
    color: #555;
    margin-left: 10px;
  }
  .header-box div{
    display: inline-block;
  }
  .add_file{
    width: 80px;
    height: 30px;
    background:#11a586;
    border-radius: 3px;
    margin-left: 10px;
    cursor: pointer;
  }
  .add_file img{
    width: 14px;
    height: 14px;
    margin-left: 12px;
    margin-right: 5px;
  }
  .add_file span{
    font-size: 16px;
    color:#fff;
    line-height: 30px;
  }
  .delete_file{
    width: 110px;
    height: 30px;
    background:#aeaeae;
    border-radius: 3px;
    margin-left: 10px;
  }
  .delete_file:hover{
    background: #17e1b7;
  }
  .delete_file img{
    width: 14px;
    height: 14px;
    margin-left: 20px;
    margin-right: 5px;
  }
  .delete_file span{
    font-size: 16px;
    color:#fff;
    line-height: 30px;
  }
  .left-header{
    width: 67.5%;
  }
  .search_file{
    margin-top: 5px;
    width: 50%;
  }
  .search_file img{
    width: 22px;
    height: 22px;
  }
  .search_file input{
    width: 55%;
    height: 22px;
    border-top:0;
    border-left:0;
    border-right:0;
    outline:none;
    cursor: pointer;
    margin-left: 10px;
  }
  .search_file input::-webkit-input-placeholder{
    color:#bfbfbf;
    font-size: 16px;
  }

  /*我的文件*/
  .myfile{
    height: 400px;
    overflow: auto;
    margin-top: 25px;
    margin-left:8.8%;
  }
  .myfile .file_tl{
    display: inline-block;
    margin-left: 18px;
  }
  .myfile .key_title table{
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
    word-wrap: break-word;
    word-break: break-all;
    width: 100%;
  }
  .myfile .key_title table .info_to th,td{
    font-weight: 500;
    font-family:STHeitiSC-Light;
    font-size: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .myfile .key_title table .info_to th{
    color: #bfbfbf;
  }
  .myfile .key_title table .info_to tr td{
    color:#555555
  }
  .myfile .key_title table tr{
    display: block;
    cursor: pointer;
    width: 80%;
    vertical-align: middle;
  }
  .myfile .key_title table th{
    display: inline-block;
  }
  .myfile .key_title table tr td{
    display: inline-block;
  }
  .myfile .key_title table>tr:not(:first-of-type){
    border-bottom: 1px solid #555;
    padding-bottom: 15px;
  }
  .myfile .key_title table tr:nth-of-type(2){
    margin-top: 34px;
  }
  .myfile .key_title table>tr:not(:nth-of-type(2)){
    margin-top: 20px;
  }
  .myfile .key_title table tr:nth-of-type(1){
    margin-top: 0;
  }
  .myfile .key_title table tr:hover .delete{
    display: inline-block;
  }
  .myfile .delete{
    display: none;
  }
  .myfile .info_list img{
    width: 20px;
    height: 20px;
    border-bottom: 1px solid #fff ;
    border-radius: 50%;
  }
  .myfile .info_list .list_tl{
    margin-left: 12px;
    display: inline-block;
    width: 80%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  .myfile .info_list th{
    color: #555;
    font-weight: 500;
    font-family:STHeitiSC-Light;
    font-size: 16px;
    position: relative;
  }
  /*隐藏星标下划线*/
  .hide_line{
    width: 35px;
    position: absolute;
    height: 2px;
    background: #fff;
    top: 34px;
    left: 0;
  }
  /*我的文件*/

  /*协作文件*/
  .teamworkfile{
    height: 400px;
    overflow: auto;
    margin-top: 25px;
    margin-left: 5%;
  }
  .teamworkfile .file_tl{
    display: inline-block;
    margin-left: 18px;
  }
  .teamworkfile .key_title table .info_to th,td{
    font-weight: 500;
    font-family:STHeitiSC-Light;
    font-size: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .teamworkfile .key_title table th,td{
    display: inline-block;
    vertical-align: middle;
  }
  .teamworkfile .key_title table .info_to th{
    color: #bfbfbf;
  }
  .teamworkfile .key_title table .info_to tr td{
    color:#555555;
  }
  .teamworkfile .key_title table tr{
    display:block;
    cursor: pointer;
    width: 90%;
    vertical-align: middle;
  }
  .teamworkfile .key_title table{
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
    word-wrap: break-word;
    word-break: break-all;
    width: 100%;
  }
  .teamworkfile .key_title table>tr:not(:first-of-type){
    border-bottom: 1px solid #555;
    padding-bottom: 25px;
  }
  .teamworkfile .key_title table tr:nth-of-type(2){
    margin-top: 34px;
  }
  .teamworkfile .key_title table>tr:not(:nth-of-type(2)){
    margin-top: 20px;
  }
  .teamworkfile .key_title table tr:nth-of-type(1){
    margin-top: 0;
  }
  .teamworkfile .key_title table tr:hover .delete{
    display: inline-block;
  }
  .teamworkfile .delete{
    display: none;
  }
  .teamworkfile .info_list img{
    width: 20px;
    height: 20px;
    border-bottom: 1px solid #fff ;
  }
  /*.info_list .star{*/
  /*width: 20px;*/
  /*height: 20px;*/
  /*border-bottom: 1px solid #fff ;*/
  /*}*/
  .teamworkfile .info_list .list_tl{
    margin-left: 12px;
    width: 200px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .teamworkfile .info_list th{
    color: #555;
    font-weight: 500;
    font-family:STHeitiSC-Light;
    font-size: 16px;
    position: relative;
  }
  .teamworkfile .info_list .avater{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  /*协作文件*/

  /*星标文件*/
  .starfile .key_title{
    height: 400px;
    overflow: auto;
    margin-top: 25px;
    margin-left:8.8%;
  }
  .starfile .file_tl{
    display: inline-block;
    margin-left: 18px;
  }
  .starfile .key_title table{
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
    word-wrap: break-word;
    word-break: break-all;
    width: 100%;
  }
  .starfile .key_title table .info_to th,td{
    font-weight: 500;
    font-family:STHeitiSC-Light;
    font-size: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .starfile .key_title table .info_to th{
    color: #bfbfbf;
  }
  .starfile .key_title table .info_to tr td{
    color:#555555
  }
  .starfile .key_title table tr{
    display: block;
    cursor: pointer;
    width: 80%;
    vertical-align: middle;
  }
  .starfile .key_title table th{
    display: inline-block;
  }
  .starfile .key_title table tr td{
    display: inline-block;
  }
  .starfile .key_title table>tr:not(:first-of-type){
    border-bottom: 1px solid #555;
    padding-bottom: 20px;
  }
  .starfile .key_title table tr:nth-of-type(2){
    margin-top: 34px;
  }
  .starfile .key_title table>tr:not(:nth-of-type(2)){
    margin-top: 20px;
  }
  .starfile .key_title table tr:nth-of-type(1){
    margin-top: 0;
  }
  .starfile .key_title table tr:hover .delete{
    display: inline-block;
  }
  .starfile .delete{
    display: none;
  }
  .starfile .info_list img{
    width: 20px;
    height: 20px;
    border-bottom: 1px solid #fff ;
  }
  .starfile .info_list .list_tl{
    margin-left: 12px;
    display: inline-block;
    width: 80%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  .starfile .info_list th{
    color: #555;
    font-weight: 500;
    font-family:STHeitiSC-Light;
    font-size: 16px;
    position: relative;
  }
  /*星标文件*/

  /*回收站*/
  .correction_bin .clear_file{
    display: inline-block;
    color:#17e1b7;
    cursor: pointer;
  }
  .correction_bin .delete_file{
    width: 110px;
    height: 30px;
    background:#17e1b7;
    border-radius: 3px;
    margin-left: 10px;
  }
  .correction_bin .key_title{
    height: 400px;
    overflow: auto;
    margin-top: 25px;
    margin-left:8.8%;
  }
  .correction_bin .file_tl{
    display: inline-block;
    margin-left: 18px;
  }
  .correction_bin .key_title table{
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
    word-wrap: break-word;
    word-break: break-all;
    width: 100%;
  }
  .correction_bin .key_title table .info_to th,td{
    font-weight: 500;
    font-family:STHeitiSC-Light;
    font-size: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .correction_bin .key_title table .info_to th{
    color: #bfbfbf;
  }
  .correction_bin .key_title table .info_to tr td{
    color:#555555
  }
  .correction_bin .key_title table tr{
    display: block;
    width: 80%;
    vertical-align: middle;
  }
  .correction_bin .key_title table th{
    display: inline-block;
  }
  .correction_bin .key_title table tr td{
    display: inline-block;
  }
  .correction_bin .key_title table>tr:not(:first-of-type){
    border-bottom: 1px solid #555;
    padding-bottom: 20px;
  }
  .correction_bin .key_title table tr:nth-of-type(2){
    margin-top: 34px;
  }
  .correction_bin .key_title table>tr:not(:nth-of-type(2)){
    margin-top: 20px;
  }
  .correction_bin .key_title table tr:nth-of-type(1){
    margin-top: 0;
  }
  .correction_bin .info_list img{
    width: 20px;
    height: 20px;
    border-bottom: 1px solid #fff ;
  }
  .correction_bin .info_list .list_tl{
    margin-left: 12px;
    display: inline-block;
    width: 70%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  .correction_bin .info_list th{
    color: #555;
    font-weight: 500;
    font-family:STHeitiSC-Light;
    font-size: 16px;
    position: relative;
  }
  .correction_bin .delete,.correction_bin .bin{
    cursor: pointer;
  }
  /*回收站*/
</style>

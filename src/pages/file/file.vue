<template>
    <div class="file">
      <div class="left_box">
        <router-link :to="{name:'myfile',params:{username:this.username}}"><div class="title1 title"><span>我的<br/>文件</span><div class="triangle"></div></div></router-link>
        <router-link :to="{name:'teamworkfile',params:{username:this.username}}"><div class="title2 title"><span>协作<br/>文件</span><div class="triangle"></div></div></router-link>
        <router-link :to="{name:'starfile',params:{username:this.username}}"><div class="title3 title"><span>星标<br/>文件</span><div class="triangle"></div></div></router-link>
      </div>
      <div class="right_box">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
  import {getCookie} from "@/cookie/cookie.js"
    export default {
      data(){
        return{
          username:"",
        }
      },
        mounted(){
          this.username = getCookie("username");
          // this.username = this.$route.params.username;
          console.log("file:"+this.username)
        }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  a{
    text-decoration: none;
  }

.file{
  width: 1030px;
  height: 540px;
  background: #fff;
  margin: 80px auto;
  border-radius: 3px;
}
  .left_box{
    width: 200px;
    height: 100%;
    float: left;
  }
  .right_box{
    float: left;
    width: 830px;
  }

  .title{
    width: 100%;
    height:180px ;
    background-size: 100% 180px;
    text-align: center;
    font-family:STHeitiSC-Light;
    font-size: 26px;
    color: #fff;
    position: relative;
  }
  .title span{
    display: inline-block;
    padding-top: 60px;
  }
.title1{
  background-image: url("first-img.png");
}
.title2{
  background-image: url("./second-img.png");
}
.title3{
  background-image: url("./third-img.png");
}
  .left_box a.active div{
    color: #17e1b7;
  }
  .left_box a:hover div{
    color: #17e1b7;
  }
  .triangle{
    display: none;
    position: absolute;
    top:90px;
    right: 50px;
    width: 18px;
    height: 18px;
    background-image: url("./triangle.png");
    background-size: 18px 18px;
  }
  .left_box a.active .title .triangle{
    display: block;
  }
</style>

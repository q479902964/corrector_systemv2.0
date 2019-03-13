<template>
  <div id="app">
    <newHeader :show_user="show_user" @hideBox="hideBox"></newHeader>
    <router-view  ref="r_view" class="r-view"   @add_history="init_editHistory()"></router-view>
  </div>
</template>

<script>
  import newHeader from './components/header/header.vue';
  import {getCookie} from "@/cookie/cookie.js"
  import  api from '@/api/api.js'
  export default {
    data(){
      return{
        notices:{},
        show_user:false,
        username:""
      }
    },
    created(){
      let body = document.querySelector('body') //body绑定一个事件，判断当点击不是用户信息box就隐藏它
      body.addEventListener('click',(e)=>{
        var url = "/"+this.$route.path.split('/')[1];
        console.log(e.target)
        if(e.target.className=== 'user_box'||e.target.className==='head_portrait'){
          this.show_user = true;
        }else {
          this.show_user = false;
        }
      },false)
    },
    methods:{
      hideBox(){
        this.show_user = false;
      },
      async getInitInfo(){
        try {
          let result = await api.getUserInfo(this.username)
          result = result.data;
          this.$store.commit("changeInfo",{
            avater:result.avater,
            nickname:result.nickname
          })
          sessionStorage.setItem('avater',result.avater)//保存头像用于头部显示
          sessionStorage.setItem('nickname',result.nickname);//保存昵称用于头部显示
        }catch (err){
          console.error(err)
        }
      }
    },
    components: {
      newHeader
    },
    beforeDestroy(){
      //登出调用接口
      // try{
      //   let result = await api.logout();
      // }catch(err){
      //   throw(err);
      // }
      sessionStorage.clear();
      this.$store.commit('LoginOut');
      this.$router.push("/login");
    },
    mounted(){
      this.username = getCookie("username")
      if(this.username){
          this.getInitInfo();
          this.$router.push('/file')
      }
    }
  };
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }

  ul li a{
    float: left;
    color: #11A586;
  }

  html{
    height:100%;
  }

  body{
    height:100%;
    background-image: url(assets/bg.png);
    background-size: cover;
    background-repeat: no-repeat;
    /*min-width: 1000px;*/
    /*overflow: auto*/
  }

  .r-view{
    margin: 0;
    padding: 0;
    height: auto;
  }



  /*协作时点击三个点弹出*/
</style>
<style scoped >

</style>

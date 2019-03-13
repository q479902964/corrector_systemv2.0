<template>
    <div class="myfile">
      <file_box type="myfile" :file=file :username=username></file_box>
    </div>
</template>

<script>
  import api from "@/api/api.js"
  import file_box from '@/components/file_box/file_box'
  import {getCookie} from "@/cookie/cookie.js"
    export default {
       components:{
         file_box
       },
       data(){
         return {
           username:"",
           file:{},
           isStar:"static/star2.png",
           notStar:"static/star1.png",
           searchString:""
         }
       },
      methods:{
         async getFile(){
           try{
              let result = await api.getFile(this.username);
              result = result.data;
              this.file = result;
           }catch (err){
             alert("获取我的文件失败")
             console.log(err)
           }
         }
      },
       mounted(){
         // if(sessionStorage.username){
         //   var str = sessionStorage.username;
         //   this.username = JSON.parse(str).username;
         // }else {
         //   this.$router.push("/login");
         //   return;
         // }
         this.username = getCookie("username")
         console.log("myfile:"+this.username)
         //   this.$http.get("/api/file?username="+this.username).then((response) => {  //获取我的文件中信息
         //     response = response.body;
         //     this.file = response;
         //     console.log(this.file)
         //   }).catch(error => {
         //     alert("获取我的文件失败")
         //   });
         this.getFile();
       },
      computed:{

      }
    }
</script>

<style scoped>

</style>

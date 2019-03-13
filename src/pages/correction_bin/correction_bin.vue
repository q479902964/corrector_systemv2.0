<template>
    <div class="correction_bin">
      <file_box type="bin" :file=file :username=username></file_box>
    </div>
</template>

<script>
  import api from "@/api/api.js"
  import file_box from '@/components/file_box/file_box'
  import {getCookie} from "@/cookie/cookie.js"
    export default {
      data(){
        return {
          username: "",
          file: {}
        }
      },
      components:{
        file_box
      },
      methods:{
        async getTrash(){
          try{
            let result = await api.getTrash(this.username); //获取回收站文件中信息
            result = result.data;
            this.file = result;
          }catch (err){
            alert("回收站信息获取失败")
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
        // this.username = sessionStorage.getItem('username')
        this.username = getCookie("username");
        // var str = sessionStorage.username;
        // this.username = JSON.parse(str).username;
        // this.username = this.$route.params.username;
        console.log("bin:"+this.username);
        this.getTrash();
        // this.$http.get("/api/trash?username="+this.username).then((response) => {  //获取回收站文件中信息
        //   response = response.body;
        //   this.file = response;
        // }).catch(error => {
        //   alert("回收站信息获取失败")
        // });
      }
    }
</script>

<style scoped>

</style>

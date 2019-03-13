<template>
    <div class="teamworkfile">
      <file_box type="teamworkfile" :file=file :username=username></file_box>
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
          avater:"",
          nickname:"",
          email:"",
          file: {},

        }
      },
      methods:{
        async getTeamworkfile(){
          try{
            let result = await api.getTeamworkfile(this.username);
            result = result.data;
            this.file = result;
          }catch (err){
            alert("获取协作文件失败")
            console.log(err)
          }
        }
      },
      mounted(){
        this.username = getCookie("username")
        console.log("team:"+this.username);
        this.getTeamworkfile();
        // this.$http.get("/api/coop?username="+this.username).then((response) => {  //获取协作文件中信息
        //   response = response.body;
        //   this.file = response;
        // }).catch(error => {
        //   alert("获取协作文件失败")
        // });
      }
    }
</script>

<style scoped>

</style>

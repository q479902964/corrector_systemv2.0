<template>
    <div class="starfile">
      <file_box type="starfile" :file=file :username=username></file_box>
    </div>
</template>

<script>
  import api from "@/api/api.js"
  import file_box from '@/components/file_box/file_box'
  import {getCookie} from "@/cookie/cookie.js"
    export default {
      components: {
        file_box
      },
      data(){
        return {
          username:"",
          file:{},
          isStar:"static/star2.png",
          searchString:""
        }
      },
      methods:{
        async getStarfile(){
          try{
            let result = await api.getStarfile(this.username);
            result = result.data;
            var myfile = result.myfile;
            var teamworkfile = result.coopfile;
            this.file = myfile.concat(teamworkfile);
          }catch (err){
            alert("获取星标文件失败")
            console.log(err)
          }
        }
      },
      mounted(){
        this.username = getCookie("username")
        // this.username = this.$route.params.username;
        console.log("star:"+this.username);
        this.getStarfile();
        // this.$http.get("/api/istar?username="+this.username).then((response) => {  //获取星标文件中信息
        //   response = response.body;
        //   var myfile = response.myfile;
        //   var teamworkfile = response.coopfile;
        //   this.file = myfile.concat(teamworkfile);
        // }).catch(error => {
        //   console.log(error);
        //   alert("获取星标文件失败")
        // });
      }
    }
</script>

<style scoped>

</style>

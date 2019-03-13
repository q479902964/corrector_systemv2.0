<template>
    <div class="edit">
      <edit_box type="edit" :username=username :file_name=file_name :content=content :isStar=star :id=id
                @changeFileid="changeFileid"></edit_box>
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
          content:"",
          font_show:false,
          size_show:false,
          color_show:false,
          spacing_show:false,
          brush_text:{},
          brush_flag:false,
          content_html:"",
          file_name:"",
          star:"",
          isStar:"static/star2.png",
          notStar:"static/star1.png",
          id:"",
          intId:{},
          content_text:{},
          select_text:"",
          correction_state:false,
          data:{},
        }
      },
      methods:{
        changeFileid(id){
          this.id = id;
          this.$router.push("/edit/"+this.id);
        },
        async init_post(){
          try{
            this.id = this.$route.params.id;
            console.log(this.id);
            let result = await api.get_post(this.id);
            this.$nextTick(()=>{
              this.file_name = result.data.file_name;
              this.content = result.data.content;
            })
          }catch(err){
            throw(err);
            console.log(err);
          }
        }
      },
      beforeDestroy(){
        // this.intId = clearInterval(this.intId);
      },
      created(){
        this.id = this.$route.params.id;
        this.file_name = this.$route.params.file_name;
        this.content = this.$route.params.content;
        this.username = this.$route.params.username;
        this.star = this.$route.params.isStar;
        if(typeof(this.file_name)=='undefined'){
          this.init_post();
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
      },
    }
</script>

<style scoped>
  .edit .edit_box{
    width: 1030px;
    height: 540px;
    background: #fff;
    margin: 80px auto;
    border-radius: 3px;
  }
</style>

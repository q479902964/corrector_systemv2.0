<template>
    <div class="notice_board">
        <main_box :notices="notices" :username="username"></main_box>
    </div>
</template>

<script>
  import main_box from  '../../components/main_box/main_box.vue'
  import api from "../../api/api.js"
  import {getCookie} from "@/cookie/cookie.js"
  export default {
    name: "notice_board",
    data(){
      return{
        notices:{},
        username:"",
      }
    },
    methods:{
      async init_notice(){
          try{
            let result = await api.getNoticeData(this.username);
            this.notices = result.data.notices;
            console.log(this.notices)
          }catch(err){
            throw(err);
            console.log(err);
          }
      }
    },
    components:{
      main_box
    },
    created() {
      this.$emit("notice_clear");
    },
    mounted(){
      this.username = getCookie("username")
      if(this.$route.params.notices){
        this.notices = this.$route.params.notices;
      }else{
        this.init_notice();
      }
    }
  }
</script>

<style scoped>

</style>

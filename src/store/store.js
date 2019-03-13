import Vuex from 'vuex'
import Vue from 'vue'
import api from "@/api/api.js"
import {getCookie} from "@/cookie/cookie.js"
Vue.use(Vuex);

const username = getCookie("username");
export default new Vuex.Store({
  state:{
    loginStatus:typeof username=='string'&&username?true:false,
    avater:typeof sessionStorage.getItem('avater')=='string'?sessionStorage.getItem('avater'):"static/icon.png",
    nickname:typeof sessionStorage.getItem('nickname')=='string'?sessionStorage.getItem('nickname'):"昵称",
    notices:{}
  },
  mutations:{
    LoginIn(state){
      state.loginStatus = true;
    },
    LoginOut(state){
      state.loginStatus = false;
    },
    changeInfo(state,data){
      state.avater = data.avater;
      state.nickname = data.nickname;
    },
    changeNotices(state,data){
      state.notices = data;
    }
  },
  action:{

  }
})

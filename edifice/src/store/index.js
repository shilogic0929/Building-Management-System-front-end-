import { createStore } from 'vuex'

export default createStore({
  state: sessionStorage.getItem("state")?JSON.parse(sessionStorage.getItem("state")):{
    isCollapsed: false,
    isService:false,
    isWorker:false,
    isClient:true,
    username:"",
  },
  getters: {
  },
  mutations: {
    changeCollapsed(state,bool){
      state.isCollapsed =bool;
    },
    changeName(state,name){
      state.username = name;
    }
  },
  actions: {
  },
  modules: {
  }
})

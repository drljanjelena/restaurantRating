import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const rootPath = 'http://localhost:4000';
const authPath = 'http://localhost:2000';

export default new Vuex.Store({
  state: {
    restaurants: [],
    typesOfRestaurants: [],
    locations: [],
    token: '',
    typeIDs: []
  },

  mutations: {

    addTypeOfRestaurants(state,type){
      state.typesOfRestaurants = type;
    },

    addLocations(state,loc){
      state.locations = loc;
    },

    addRestaurants(state, res){
      state.restaurants = res;
    },

    addRestaurant(state,res){
      state.restaurants.push(res);
    },

    setFilterRestaurants(state, ids) {
      state.restaurants = ids;
    },

    addIDsToRestaurant(state, obj) {
      const restaurante = state.restaurants.filter( rest => rest.typeID == obj.id )[0];
      restaurante['typeIDs'] = obj.typeIDs;
    },

    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },

    addComment(state, obj) {
      const restaurant = state.restaurants.filter( res => res.id == obj.restaurantID )[0];
      if(!restaurant.comments)
      restaurant.comments = [];
      restaurant.comments.push(obj.comment);
    },    

  },

  actions: {

    async fetchIDsByDepartment({ commit, state }, typeID) {

      const restaurant = state.restaurants.filter( resta => resta.departmentId === typeID )[0];
      if (restaurant && restaurant['imageIDs']) {
        commit('setFilterRestaurants', restaurant['imageIDs']);
      } else {
        const obj = await fetch(`${rootPath}/locations/api/${id}`);
        const res = await obj.json();

        commit('addIDsToRestaurant', {
          id: typeID,
          typeID: res.objectID
        });

        commit('setFilterRestaurants', res.typeID);
      }
    },



    fetchLocations({ commit }){
      fetch(`${rootPath}/locations/api`, {
        method: 'GET',
      })
      .then(obj => obj.json())
      .then(res => commit('addLocations',res));
    },

    getLocation({ commit,state }, id){
      return new Promise((resolve,reject) =>{
        const location = state.locations.filter(loc=>loc.id == id)[0];

        if(location){
          resolve(location);
        }else{
          fetch(`${rootPath}/locations/api/${id}`,{
          })
            .then( obj => obj.json())
            .then( res => {
              commit('addLocations', res);
              resolve(res);
            })
        }
      })
    },

    getTypeOfRestaurants({ commit,state }, id){
      return new Promise((resolve,reject) =>{
        const type = state.typesOfRestaurants.filter(t=>t.id == id)[0];
        console.log(type);

        if(type){
          resolve(type);
        }else{
          fetch(`${rootPath}/typeofrestaurants/api/${id}`,{
          })
            .then( obj => obj.json())
            .then( res => {
              commit('addTypeOfRestaurants', res);
              resolve(res);
              console.log(res);
            })
        }
      })
    },

    fetchRestaurants({ commit }){
      fetch(`${rootPath}/restaurants/api`, { 
        method: 'GET',
      })
        .then( obj => obj.json() )
        .then( res => commit('addRestaurants', res) );
    },

    getRestaurant({commit, state}, id){
      return new Promise((resolve, reject) =>{
        const restaurant = state.restaurants.filter(restaurant => restaurant.id == id)[0];
        console.log(restaurant);

        if(restaurant){
          resolve(restaurant);
        }else{
          fetch(`${rootPath}/api/restaurants/${id}`,{
          })
          .then( obj => obj.json())
          .then( res => {
            fetch(`${rootPath}komentari/api/restaurant/${id}`, {
              headers: { 'Authorization': `Bearer ${state.token}` }
            }).then( resp => resp.json() )
              .then( comments => {
                res['comments'] = comments;
                console.log(res);
                commit('addRestaurant', res);
                resolve(res);
              });
          })
        }
      })
    },

    search({ commit }, q) {
      return new Promise( (resolve, reject) => {
        fetch(`${rootPath}/restaurants/api/find/${q}`,{
        })
          .then( obj => obj.json() )
          .then( res => {
            console.log(res);
            commit('addRestaurants', res);
            resolve(res);
          });
      });
    },
    
    postComment({ commit, state }, obj) {
      let noviKomentar = {
        userID: obj.userID,
        content: obj.kontent,
        restaurantID: obj.restaurantID,
        ocenaID : obj.ocenaID
     };
     console.log(JSON.stringify(noviKomentar))
      fetch(`${rootPath}/komentari/api`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 'Authorization': `Bearer ${state.token}`        
        },
        body: JSON.stringify(noviKomentar)
      })
      .then( obj => obj.json() )
      .then( res => {
        console.log(res);
        commit('addComment', ({comment: res, restaurantID: obj.restaurantID}));
        resolve(res);
      });
    },


    register({ commit }, obj) {
      fetch(`${authPath}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => commit('setToken', tkn.token) );
    },

    login({ commit }, obj) {
      fetch(`${authPath}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }).then( res => res.json() )
      .then( tkn => {
        if (tkn.msg) {
          alert(tkn.msg);
        } else {
          commit('setToken', tkn.token)
        }
      });
    },

    socket_comment({ commit }, msg) {
      const comment = JSON.parse(msg);
      console.log(comment.restaurantID + 'pls');
      commit('addComment', { restaurantID: comment.restaurantID, comment: comment });
    },

    
    fetchTypesOfRestaurants({ commit }){
      fetch(`${rootPath}/typeofrestaurants/api`, {
        method: 'GET',
      })
      .then(obj => obj.json())
      .then(res => commit('addTypeOfRestaurants',res))
      .then(res => console.log(res));
    },

  

  }


})

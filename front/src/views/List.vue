<template>
  <div id="app">
    <Header subtitle="Restaurants"/>
    <RestaurantList />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import RestaurantList from '@/components/RestaurantList.vue'
import { mapActions } from 'vuex';

export default {
  name: 'List',

  components: {
    Header,
    RestaurantList
  },

  data() {
        return {
            subtitle: '',
            depID: null
        }
    },

    watch: {
      $route() {
        this.fetchRestaurants();
      }
    },

    mounted() {
        this.fetchRestaurants();
    },

    methods: {
      ...mapActions([
        'fetchRestaurants'
      ])
    }

}
</script>

<style scoped>

</style>

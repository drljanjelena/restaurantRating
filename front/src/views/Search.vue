<template>
  <div id="app">
    <Header :subtitle="subtitle"/>
    <RestaurantList />
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import RestaurantList from '@/components/RestaurantList.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Search',
    
    components: {
      Header,
      RestaurantList
    },

    data() {
      return {
        subtitle: 'Search results: ',
        restaurantID : null
      }
    },

    mounted() {
      this.search(this.$route.query.q);
    },

    methods: {
      ...mapActions([
        'search'
      ])
    }
  }
</script>

<style scoped>

</style>

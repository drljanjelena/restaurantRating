<template>
  <div>
    <Header :subtitle="subtitle"/>
    <SingleRestaurants v-if="restaurant" :restaurant="restaurant"/>
    <div class="row">
      <div class="col-sm-6">
        <Comments v-if="restaurant" :restaurant="restaurant" />
      </div>
    </div>
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import SingleRestaurants from '@/components/SingleRestaurants.vue';
  import Comments from '@/components/Comments.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Movie',

    components: {
      Header,
      SingleRestaurants,
      Comments,
    },

    data() {
      return {
        restaurant: null,
        subtitle: '',
      }
    },
    
    methods: {
      ...mapActions([
        'getRestaurant',
      ])
    },

    mounted() {
      this.getRestaurant(this.$route.params.id).then( res => {
        this.restaurant = res;
        this.subtitle = this.restaurant.name;
      });
    }
  }

</script>
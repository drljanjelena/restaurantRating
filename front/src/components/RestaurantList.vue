<template>
 <div>
    <b-pagination
      v-model="currentPage"
      :total-rows="restaurants.length"
      :per-page="perPage"
      aria-controls="image-table"
    ></b-pagination>
    <b-table
      id="image-table"
      hover
      fixed
      :items="rests"
      :fields="fields"
      small
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="rowClicked"
    >
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="restaurants.length"
      :per-page="perPage"
      aria-controls="image-table"
    ></b-pagination>
  </div>
</template>

<script>  

import { mapActions, mapState } from 'vuex';

export default {
  name: 'RestaurantList',

  data() {
      return {
        fields: ['name', 'radnoVreme'],
        rests: [],
        currentPage: 1,
        perPage: 10
      }
    },

    computed: {
      ...mapState([
        'restaurants'
      ])
    },

    watch: {
      currentPage(nVal, oVal) {
        this.restaurants.slice(this.currentPage * this.perPage, (this.currentPage + 1) * this.perPage).map( res => {
          this.getRestaurant(res.id).then( obj => this.rests.push(obj) );
        });
      },

      restaurants(nVal, oVal) {
        this.currentPage = 1;
        this.rests = [];

        nVal.map( res => {
          this.getRestaurant(res.id).then( obj => this.rests.push(obj) );
        });
      }
    },


    mounted() {
      this.restaurants.map( res => {
        this.getRestaurant(res.id).then( obj => this.rests.push(obj) );
      });
    },

    methods: {
      ...mapActions([
        'getRestaurant'
      ]),

      rowClicked(record, index) {
        this.$router.push({ name: 'Restaurant', params: { id: record.id } });
      }
    }



}
</script>

<style scoped>
.pagination {
    justify-content: center;
  }
</style>

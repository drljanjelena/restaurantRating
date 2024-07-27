<template>
  <div>
    <Header :subtitle="subtitle"/>

    <div class="container">
    <div class="column left">
      <p v-if="subtitle === 'Poslasticarnica'">Poslastičarnice su oaze slatkih užitaka i umetničkih delikatesa. Ovi čarobni kutci gastronomske scene predstavljaju pravo zadovoljstvo za sve sladokusce. Sa raznolikim izborom kolača, torti, čokolada i drugih poslastica, poslastičarnice su mesto gde se kreativnost susreće sa ukusima. Ne samo da uživate u savršenstvu svakog zalogaja, već se i dive zanatskoj veštini majstora poslastičarstva. Bilo da je to za slavlje, popodnevno opuštanje uz kafu ili trenutke kada želite da se počastite, poslastičarnice pružaju nezaboravan doživljaj slatkog zadovoljstva.</p>
      <p v-else-if="subtitle === 'Picerija'">Picerije su mesto gde se susreću ljubitelji ukusne hrskave kore, sočnog sira i raznovrsnih nadeva. Ova vrsta restorana pruža nepogrešivu kombinaciju ukusa i udobnosti. Sveža i mirisna pizza iz rerne je neodoljiva, a raznolikost ukusa pruža neograničene mogućnosti za prilagođavanje obroka svojim željama. Picerije su često simbol opuštanja i druženja sa porodicom i prijateljima, bilo da se hrana konzumira u restoranu ili uživa kod kuće.</p>
      <p v-else-if="subtitle === 'Bisto'">Bistro restorani su mesto gde se susreću jednostavnost, kvalitet i brzina. Ovi restorani nude vrhunske ukuse bez suvišnog luksuza. Bistro restorani se ističu svežim sastojcima i pažljivo kreiranim jelovnicima. Ovde se ne radi samo o brzini serviranja, već i o iskustvu uživanja u svakom zalogaju. Bistro restorani su odličan izbor za one koji cene vrhunski obrok u opuštenoj i neformalnoj atmosferi.</p>
      <p v-else-if="subtitle === 'Gostionica'">Gostionice predstavljaju utočište tradicije, gostoprimstva i srdačnih obroka. Ovi restorani odišu autentičnošću i prenose nas u prošla vremena, gde se dobar obrok delio sa porodicom i prijateljima. Gostionice nude obroke koji su često bazirani na lokalnim receptima i sezonskim sastojcima. Osećaj topline i povezanosti u gostionici je nezamenljiv, a autentična atmosfera i autentični ukusi čine da se osećate kao kod kuće, čak i kad ste daleko od nje.</p>
      <p v-else>Restorani brze hrane su sinonim za brzinu, praktičnost i raznovrsne obroke. Ovi restorani pružaju širok spektar jela koja se mogu brzo naručiti i konzumirati. Bez obzira da li ste u pokretu ili želite brz obrok tokom radnog dana, restorani brze hrane pružaju različite opcije od hamburgera, sendviča, salata i još mnogo toga. Ovi restorani omogućavaju zadovoljenje gladnih stomaka u svim situacijama, bez kompromisa po pitanju ukusa.</p>
    </div>
    <div class="column middle">
      <img v-if="subtitle === 'Poslasticarnica'" src="https://www.snezana.rs/wp-content/uploads/2022/06/Snezana-1-of-159-scaled.jpg" width="400" alt="Slika poslasticarnica">
      <img v-else-if="subtitle === 'Picerija'" src="https://www.nj.com/resizer/KzO5WOVfNhWQzska05jfvWxo_9o=/800x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/EPRNBFR555DU5NNC65LPJQ5QXA.jpeg" width="400" alt="Slika picerije">
      <img v-else-if="subtitle === 'Bisto'" src="https://www.restoranibeograd.com/storage/restaurant/interior/189/le_petit_bistro_blue_center_1.jpg" width="400" alt="Slika bistra">
      <img v-else-if="subtitle === 'Gostionica'" src="https://www.mirandre.com/psn/66/7b/gostionica-kosmaj-3508709.webp" width="400" alt="Slika gostionice">
      <img v-else src="https://i.pinimg.com/1200x/84/eb/6c/84eb6c716499f31924ac213cb50ce4f5.jpg" width="400" alt="slika restorana brze hrane">
    </div>
    <div class="column right">
      <ul v-if="subtitle === 'Poslasticarnica'">
        <li>Stavka 1</li>
        <li>Stavka 2</li>
        <li>Stavka 3</li>
        <!-- Dodajte više stavki po potrebi -->
      </ul>
    </div>
  </div>

  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import { mapActions } from 'vuex';

  export default {
    
    name: 'TypesOfRestaurants',

    components: {
      Header,

    },

    data() {
      return {
        type: null,
        subtitle: '',
        restaurants: []

      }
    },

    watch: {
    '$route.params.id'(newId) {
      this.getTypeOfRestaurants(newId).then((res) => {
        this.type = res;
        this.id = res.id;
        this.subtitle = res.name;
      });
    }
  },
    
    methods: {
      ...mapActions([
        'getTypeOfRestaurants'
      ])
    },

    mounted() {
      this.getTypeOfRestaurants(this.$route.params.id).then( res => {
        this.type = res;
        this.id = res.id;
        this.subtitle = res.name;
      });
    }
  }

</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
}

.column {
  flex: 1;
  padding: 10px;
}

.left {
  background-color: lightgray;
}

.middle {
  text-align: center;
}

.right {
  background-color: lightblue;
}
</style>

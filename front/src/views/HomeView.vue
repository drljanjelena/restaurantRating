<template>
  <div id="app">
    <Header subtitle="Home"/>
    <img
    src = "https://img.freepik.com/free-photo/holding-homemade-healthy-lunch-plate-generated-by-ai_24640-80434.jpg?t=st=1692710102~exp=1692713702~hmac=1cf163ba6093077686cec2c66c8e58f01e6777752f994b804acb8613e1fac206&w=1060"
      width="800"
      alt="Logo"
    />
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'

  export default {
    name: 'HomeView',
    components: {
      Header
    }
  }
</script>

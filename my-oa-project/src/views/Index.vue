<template>
  <div class="index">
    <HeaderNav class="head"></HeaderNav>
    <div class="content">
        <LeftNav class="nav"></LeftNav>
        <router-view class="main"></router-view>
    </div>
  </div>
</template>
<script>
  import HeaderNav from '../components/HeaderNav.vue'
  import LeftNav from '../components/LeftNav.vue'

  export default {
    name:'index',
    props:[''],
    data () {
      return {
        
      };
    },

    components: {
      HeaderNav,
      LeftNav
    },

    computed: {},

    created(){

    },
    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content{
  height:100%;
  display:flex;
}
.nav{
 background-color: #324057;
 padding:0px;
}
.main{
  width:70%;
  height:100%;
}
</style>
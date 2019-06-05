<template>
  <v-app>
    <TheHeader v-if="appWidthDescription === 'large'"/>
    <v-content>
      <v-container
              :fluid="appWidthDescription !== 'large'"
      >
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<style lang="scss">

  #app {
    /*font-family: "Avenir", Helvetica, Arial, sans-serif;*/
    font-family: "Roboto", Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .hidden{
    display: none !important;
  }

  .chevron{
    border: solid;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 2px;
  }

  .chevron.light{
    border-color: $color--light;
  }

  .chevron.left{
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  .chevron.right{
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  .chevron.up{
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }

  .chevron.down{
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }


  .upArrow{
    position: absolute;

    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid $color--blue-medium;
  }

  //3rd party overrides
  .theme--light.application{
    background-color: $color--default-background !important;
  }

  @media only screen and (max-width: 600px){
    .container{
      padding: 0 !important;
    }
  }

</style>
<script>
  import TheHeader from "./views/TheHeader";
  export default {
    components: { TheHeader },
    computed:{
      appWidthDescription:function(){
        return this.$store.state.appWidthDescription;
      }
    }
  };
</script>
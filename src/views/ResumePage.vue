<template>
    <div>
        <SafariDebuggingScreen v-if="safariDebugging"/>
        <div v-if="resloaded">
            <MobileControls v-if="appWidthDescription < 2"/>
            <v-layout row>
                <v-flex sm12 md9>
                    <Resume/>
                </v-flex>
                <v-flex hidden-sm-and-down md3>
                    <RightSideControls v-if="appWidthDescription === 2"/>
                </v-flex>
            </v-layout>
        </div>
    </div>
</template>

<script>
  import Resume from "./../components/Resume/Resume";
  import RightSideControls from "../components/RightSideControls/RightSideControls";
  import MobileControls from "../components/RightSideControls/MobileControls"
  import SafariDebuggingScreen from '../components/SafariDebuggingScreen'

  export default {
    name: "ResumePage"
    , components: {
      Resume
      , RightSideControls
      , MobileControls
      , SafariDebuggingScreen
    },
    computed:{
      resloaded(){
        return this.$store.state.resLoaded;
      },
      appWidthDescription(){
        return this.$store.state.appWidthDescription;
      },
      safariDebugging(){
        return this.$store.state.safariDebugging;
      }
    }
  };
</script>

<style scoped>

</style>
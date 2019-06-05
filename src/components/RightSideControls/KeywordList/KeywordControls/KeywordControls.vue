<template>
    <KeywordViewControls v-if="activity==='view'"/>
    <AddKeywordControls v-else-if="activity==='editContent'"/>
</template>

<script>

    import KeywordViewControls from "./KeywordViewControls"
    import AddKeywordControls from './AddKeywordControls'

  export default {
    name: "KeywordControls",
    components:{
      KeywordViewControls
      , AddKeywordControls
    },
    computed:{
      activity(){return this.$store.state.activity}
    }
  };
</script>

<style scoped>

</style>
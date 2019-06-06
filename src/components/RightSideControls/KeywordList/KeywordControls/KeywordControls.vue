<template>
<!--    @Reviewer
        There are different controls based on whether a user is viewing a resume or editing one.-->
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
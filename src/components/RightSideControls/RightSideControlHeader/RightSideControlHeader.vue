<template>
    <div class="main">
        <EditContentControls v-if="activity === 'editContent'"/>
        <EditViewControls v-else-if="activity === 'editView'" />
        <GetFeedBackControls v-else-if="activity === 'getFeedback'" />
        <ViewControls v-else/>
    </div>
</template>

<script>

    import EditContentControls from './EditContentControls'
    import EditViewControls from './EditViewControls'
    import ViewControls from './ViewControls'
    import GetFeedBackControls from './GetFeedBackControls'

  export default {
    name: "RightSideControlHeader",
    components:{
      EditContentControls,
      EditViewControls,
      ViewControls,
      GetFeedBackControls
    },
    computed:{
      activity(){
        return this.$store.state.activity
      }
    }
  };
</script>

<style scoped>

    .main{

    }

</style>
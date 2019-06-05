<template>
  <div>
    <ResumePage/>
    <div>
      <BaseButton v-bind:onClick="getResume">Get Resume Data</BaseButton>
    </div>
  </div>
</template>

<script>

  import ResumePage from "./ResumePage";

  export default {
    name: "home",
    components: { ResumePage }
    , methods:{
      getResume(){

        const email = this.$route.params.email;

        console.log("Getting resume for " + email);

        this.$store.dispatch('fetchResumeByEmail', email)
      }
    }
  };
</script>

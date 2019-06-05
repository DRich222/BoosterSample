<template>
    <div class="mainResumeContainer">
        <ResumeHeader/>
        <ResumeArea type="work"/>
        <ResumeArea type="education"/>
        <ResumeArea type="project"/>
    </div>
</template>

<script>

  import ResumeHeader from "./Header/ResumeHeader"
  import ResumeArea from "./ResumeArea"

  export default {
    name: "Resume",
    components:{
      ResumeHeader,
      ResumeArea
    }
  };
</script>

<style scoped>
    .mainResumeContainer{
        background-color: white;
        box-shadow: 13px 14px 15px rgba(136, 136, 136, 0.65);
        padding: 15px;

    }

    @media all and (min-width:960px) {
        .mainResumeContainer {
            margin-right: 30px
        }
    }
</style>
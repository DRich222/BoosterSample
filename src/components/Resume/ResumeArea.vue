<template>
<!--    @Reviewer
        The resume has 3 "areas" (for now): Work, Education, and Projects.  Each area is simply a collection of the
        sections (individual jobs, educational experience, and projects) of the appropriate type.
-->
    <div class="mainArea">
        <h2 class="areaHeader">{{getType}}</h2>
        <div v-for="section of sections" :key="section.strSectionID">
            <ResumeSection :section="section"/>
        </div>
    </div>
</template>

<script>

  import ResumeSection from './Section/Section'
  import UtilFunctions from "../../UtilFunctions"

  export default {
    name: "ResumeArea"
    , components:{
      ResumeSection
    }
    , props: ['type']
    , computed:{
      sections(){
        return this.$store.getters.sectionsByType(this.type).sort(UtilFunctions.sortSections);
      },
      getType(){

        const type = this.type;
        let returntype = type.charAt(0).toUpperCase() + type.slice(1);
        returntype += type === "project" ? "s" : "";
        return returntype;
      }
    }
  };
</script>

<style scoped>
    .mainArea{
        text-align: left;
        /*margin: 15px;*/
    }

    .areaHeader{
        font-size: 2rem;
        font-weight: 500;
    }

</style>
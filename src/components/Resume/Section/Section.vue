<template>
    <div class="sectionContainer">
        <div class="dates">{{startString}} - {{endString}}</div>
        <SectionHeader :headerDetails="headerDetails"/>
        <div class="sectionBody">
            <div>{{section.strDescription}}</div>
            <div><ImpactArea :impacts="section.impacts"/></div>
        </div>
    </div>
</template>

<script>

  import SectionHeader from "./SectionHeader"
  import ImpactArea from "./ImpactArea"

  export default {
    name: "Section"
    , components: {SectionHeader, ImpactArea}
    , props:["section"]
    , computed:{
      headerDetails(){

        let headerDetails = {
          organization: this.section.strOrganization,
          location: this.section.strLocation,
          hoursPerWeek: this.section.hoursPerWeek
        };

        if(this.section.strSectionType !== "project") headerDetails.focus = this.section.strFocus;

        return headerDetails;
      },
      startString(){

        const dateStart = new Date(this.section.dateStart);

        return (dateStart.getMonth() + 1) + "/" + dateStart.getFullYear();
      },
      endString(){


        if(this.section.isCurrent) return "Current";

        const endDate = this.section.dateEnd;

        const dateEnd = new Date(endDate);

        return (dateEnd.getMonth() + 1) + "/" + dateEnd.getFullYear();
      }
    }
  };
</script>

<style scoped lang="scss">

    .sectionContainer{
        margin-top: 1rem;
    }

    .sectionBody{
        border: 1px solid $color--light-grey-border;
        padding: 15px;
    }

    .dates{
        text-align: right;
    }
</style>
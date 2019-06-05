<template>
    <!--    <div class="sectionHeader">-->
    <!--        <div v-if="includeFocus" class="sectionFocus">{{headerDetails.focus}}</div>-->
    <!--        <div><div>{{headerDetails.organization}}</div><div>{{headerDetails.location}}</div></div>-->
    <!--        <div>Hours / Week: {{headerDetails.hoursPerWeek}}</div>-->
    <!--    </div>-->
    <v-container fluid class="sectionHeader">
        <v-layout row>
            <v-flex xs12>
                <div v-if="includeFocus" class="sectionFocus">{{headerDetails.focus}}</div>
            </v-flex>
        </v-layout>
        <v-layout v-if="includeFocus" row>
            <v-flex m12 xs6>
                <div>{{headerDetails.organization}}</div>
            </v-flex>
            <v-flex  m12 xs6>
                <div class="location">{{headerDetails.location}}</div>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-flex xs12>
                <div class='sectionFocus'>{{headerDetails.organization}}</div>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <div>Hours / week: {{headerDetails.hoursPerWeek}}</div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

  export default {
    name: "SectionHeader",
    props:['headerDetails'],
    computed:{
      includeFocus(){
        return "focus" in this.headerDetails;
      }
    }
  };
</script>

<style scoped>
    .sectionHeader{
        background: #e4f1fc;
        padding: 1rem;
        border: 1px solid #c7c7c7;
        color: grey;
        font-size: 16px;
    }

    .sectionFocus{
        color: #2b7fbb;
        font-size: 1.75rem;
        font-weight: 800;
        margin-bottom: 0;
    }

    .location{
        text-align: right;
    }

    @media only screen and (max-width: 600px){

        .container{
            padding: 15px !important;
        }
    }
</style>
<template>
    <div ref="showHideAll" class="showHideAllContainer">
        <div class="switchHolder">
            <v-switch
                    info
                    hide-details
                    true-value="show"
                    false-value="hide"
                    v-model="showHideAll"
            ></v-switch>
        </div>
        <div class="showHideAllLabel">Show / Hide All</div>
    </div>
</template>

<script>
  export default {
    name: "KeywordShowHideAllControl",
    data(){
      return{
        showHideAll:'show'
      }
    },
    methods:{
      updateAll:function() {
        this.$store.dispatch('showHideAll', this.showHideAll)

      }
    },
    watch:{
      showHideAll(){
        this.updateAll();
      }
    }

  }

</script>

<style scoped lang="scss">
    .showHideAllContainer{
        color: $color--light;
        background-color: $color--secondary;
        padding: 15px;
        text-align: left;
    }

    .switchHolder{
        display: inline-block;
    }

    .showHideAllLabel{
        padding-left: 15px;
        display:inline-block;
    }

    /*Third party overrides*/
    .v-input--selection-controls{
        margin-top: 0;
        padding-top: 0;
    }

</style>
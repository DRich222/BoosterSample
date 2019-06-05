<template>
    <div>
        <v-switch
                info
                hide-details
                v-model="isActive"
        ></v-switch>
    </div>
</template>

<script>
  export default {
    name: "KeywordAction",
    props:['keywordKey'],
    computed:{
      isActive:{
        get(){
          return this.$store.getters.isKeywordActive(this.keywordKey);},
        set(){
          this.$store.dispatch('setKeywordActive', {keywordKey:this.keywordKey, isActive:!this.isActive})
        }
      }
    }
  };
</script>

<style scoped lang="scss">

    /*Third party overrides*/
    .v-input--selection-controls{
        margin-top: 0;
        padding-top: 0;
    }

</style>
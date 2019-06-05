<template>
    <div class="main">
        <div class="text">Displaying {{visibleImpacts}} of {{totalImpactsWithKeyword}} matches</div>
        <div class="buttons">
            <div>
                <BaseButton
                        type="ternary"
                        classes="button"
                        :onClick="scrollToPrev">
                    <span class="chevron left"></span>
                    Prev
                </BaseButton>
            </div>
            <div>
                <BaseButton
                        type="ternary"
                        classes="button"
                        :onClick="scrollToNext">
                    Next
                    <span class="chevron right"></span>
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script>

  import UtilFunctions from "../../../../UtilFunctions"

  export default {
    name: "KeywordDetails_PublicView",
    props:['keywordKey'],
    components:{
      UtilFunctions:UtilFunctions
    },
    computed:{
      totalImpactsWithKeyword(){return this.$store.getters.impactIdsForKeywordKey(this.keywordKey).length},
      visibleImpacts(){

        this.$emit('maintainDetailVisibility');

        const impactIds = this.$store.getters.impactIdsForKeywordKey(this.keywordKey)
          , visibleImpactIds = this.$store.state.inViewportImpactIDs;

        return impactIds.filter(value => -1 !== visibleImpactIds.indexOf(value)).length;

      }
    },
    methods:{
      scrollToPrev(){
        this.$emit('scrollToImpact','prev')
      },
      scrollToNext(){

        this.$emit('scrollToImpact','next')
      }
    }
  };
</script>

<style scoped lang="scss">
    .main{
        position: relative;
        width: 100%;
        background:$color--blue-medium;
        color:white;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        flex-wrap: wrap;

        div {
            display: inline-flex;
            font-size: 12px;
        }
    }

    .buttons{
        flex: 1 0 auto;
        display: inline-flex;
        justify-content: flex-end;
        margin-bottom: 5px !important;
    }

    .button{
        background-color: $color--blue-foreground;
    }

    .text{
        flex: 1 0 auto;
        margin: 5px;
    }

    //Third party overrides
    //Vuetify
    .v-btn{
        height: inherit;
        padding: 0 5px;
        border: none;
        color: $color--light;
        font-size: 10px;
        font-weight: 500;
        margin: 0 5px;
    }

    .theme--light.v-btn{
        color: $color--light;
    }

    //Bulma
    .buttons .button{
        margin-bottom: 0;
    }

</style>
<template>
    <li class="main keepCurrentKeyword"
        :class="[
        {current: isCurrent},
        {demphasize: !isActive},
        {hidden:shouldHide}]">

        <div class="main">
            <div class="keywordActionContainer">
                <KeywordAction :keywordKey="keyword.strKeywordKey"/>
            </div>
            <div class="keywordMainRow"
                 v-on:click="isActive ? toggleCurrent() : ''">
                <div class="keywordText">

                    {{keywordText}}

                </div>
                <div class="keywordIconContainer">

                    <KeywordIndicator/>

                </div>
            </div>
        </div>
        <div class="detailsContainer"
             ref="detailsContainer"
             v-if="appWidthDescription > 1"
        >

            <KeywordDetails_PublicView
                    :keywordKey="keywordKey"
                    @maintainDetailVisibility="maintainDetailVisibility"
                    ref="details"
                    @scrollToImpact="scrollToImpact"
            />

        </div>
    </li>
</template>

<script>

  import KeywordDetails_PublicView from './KeywordDetails_PublicView'
  import KeywordAction from './KeywordAction'
  import KeywordIndicator from './KeywordIndicator'
  import UtilFunctions from "../../../../UtilFunctions"

  export default {
    name: "KeywordLI",
    props:['keyword'],
    components: {KeywordDetails_PublicView, KeywordAction, KeywordIndicator, UtilFunctions},
    computed:{
      keywordText(){return this.keyword.strKeywordText},
      keywordKey(){ return this.keyword.strKeywordKey},
      isActive(){
        return this.$store.getters.keyword(this.keywordKey).isActive;
      },
      isCurrent(){

        return this.$store.getters.currentKeywordKey === this.keyword.strKeywordKey;

      },
      shouldHide(){

        const capsSearchTerm = this.$store.state.keywordSearchTerm.toUpperCase()
          , capsKeywordText = this.keywordText.toUpperCase();

        return !(capsSearchTerm === ''|| capsKeywordText.indexOf(capsSearchTerm) >= 0);

      },
      appWidthDescription(){
        return this.$store.state.appWidthDescription;
      }
    },
    methods:{
      toggleCurrent:function(){

        if(this.isCurrent){
          this.$store.dispatch('unSetCurrentKeywordKey');
        }
        else {
          if(this.$store.state.appWidthDescription <= 1){
            this.$store.dispatch('setMobileMenuExpanded', false)
          }
          this.$store.dispatch('setCurrentKeywordKey', this.keyword.strKeywordKey);
          this.scrollToImpact("Next");
        }

      },
      maintainDetailVisibility(){

        if(typeof this.$refs.detailsContainer === "undefined") return;

        if(this.isCurrent && this.isActive) {

          this.$refs.detailsContainer.style.height =
            this.$refs.details.$el.getBoundingClientRect().height + "px";
        }else{
          this.$refs.detailsContainer.style.height = 0;
        }
      },
      scrollToImpact(which){

        const relatedImpactIDs = this.$store.getters.impactIdsForKeywordKey(this.keywordKey);

        let impactElements = [];

        for(let i = 0; i < relatedImpactIDs.length; i++){

          impactElements.push(
            document.getElementById(relatedImpactIDs[i])
          )

        }

        impactElements.sort(UtilFunctions.sortElementsByBoundingClientRects);

        let targetScrollToID = impactElements[0].getAttribute('id');
        if(which === "next"){

          for(let i=0; i < impactElements.length;i++){
            const thisImpactTop = impactElements[i].getBoundingClientRect().top;
            if(thisImpactTop > window.innerHeight){
              targetScrollToID = impactElements[i].getAttribute('id');
              break;
            }
          }

        }else{//which === "prev"

          for(let i=impactElements.length - 1; i >= 0 ;i--){


            const thisImpactBottom = impactElements[i].getBoundingClientRect().bottom;
            if(thisImpactBottom < 0){
              targetScrollToID = impactElements[i].getAttribute('id');
              break;
            }
          }

        }

        UtilFunctions.smoothScroll(targetScrollToID);

      }
    },
    watch:{
      isCurrent(){
        this.maintainDetailVisibility();
      },
      isActive(){
        if(!this.isActive){
          if(this.isCurrent){
            this.toggleCurrent()
          }
        }
        this.maintainDetailVisibility()
      }
    }


  };
</script>

<style scoped lang="scss">

    li.main{
        margin: 0;
        border: none;
        text-align: left;
        position: relative;
        overflow: hidden;
        background-color: $color--light;
        cursor: pointer;
        transition: height 1s;
    }


    div.main{
        display: flex;
        flex-direction: row;
    }
    li.main:hover:not(.current){
        background-color: $color--blue-hint;
    }

    li.current.main{
        background: $color--blue-subtle;
    }

    li.demphasize{
        color: $color--deemphasize;
    }

    li.main:not(:first-child){
        border-top:1px solid $color--light-grey-border;
    }

    .keywordActionContainer{
        flex: 0 0 auto;
        padding: $length--keywordPadding 0 $length--keywordPadding $length--keywordPadding;
    }

    .keywordMainRow {
        padding: $length--keywordPadding;
        display: inline-flex;
        flex: 1 1 auto;
        justify-content: space-between;

    }

    .detailsContainer {
        height: 0;
        width: 100%;
        overflow: hidden;
        transition: height .2s linear;
    }

    .keywordIconContainer{
        flex: 0 0 auto;
    }

    .keywordText{
        flex: 1 1 auto;
        word-break: break-word;
    }


</style>
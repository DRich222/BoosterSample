<template>
    <li :class="[{bstr_highlight: shouldHighlight},
    {hidden: shouldHide},
    {current: isCurrent},
    {notCurrent: isNotCurrent},
    {usePointer: shouldUsePointer},
    'keepCurrentImpact keepCurrentKeyword'
    ]"
        ref="impact.strImpactID"
        v-on:click="setCurrent"
    >
        <div class="impactContainer">
            <span class="impactText">{{impact.impactText}}</span>
            <ImpactKeywordContainer
                    :keywords="keywordsForImpact"
                    ref="keywordContainer"
            />
        </div>
    </li>
</template>

<script>

  import ImpactKeywordContainer from './ImpactKeywordContainer'

  export default {
    name: "Impact",
    props:['impact'],
    components: {ImpactKeywordContainer},
    computed:{
      shouldHighlight(){
        if(this.shouldHide) return false;
        const keywords = this.impact.keywords
          , currentKeywordKey = this.$store.getters.currentKeywordKey;

        for(let i = 0; i < keywords.length; i++){
          const keyword = keywords[i];
          if(keyword.strKeywordKey === currentKeywordKey) return true;
        }

        return false;
      },
      shouldHide(){
        const activeKeywords = this.activeKeywords
          , thisImpactKeywords = this.impact.keywords;
        let activeKeywordKeys = []
          , thisImpactKeywordKeys = [];

        for(let i = 0; i < activeKeywords.length; i++){
          activeKeywordKeys.push(activeKeywords[i].strKeywordKey);
        }

        for(let i = 0; i < thisImpactKeywords.length; i++){
          thisImpactKeywordKeys.push(thisImpactKeywords[i].strKeywordKey);
        }

        const
          thisImpactActiveKeywordKeys = activeKeywordKeys.filter(value => -1 !== thisImpactKeywordKeys.indexOf(value))
          , shouldHideResult = thisImpactActiveKeywordKeys.length === 0;

        return shouldHideResult;
      },
      activeKeywords(){
        return this.$store.getters.activeKeywords;
      },
      keywordsForImpact(){

        let returnKeywords = [];

        for(let i = 0; i < this.impact.keywords.length; i++){

          let thisKeyword = this.impact.keywords[i];

          thisKeyword.vueKey = thisKeyword.strKeywordKey + this.impact.impactID;

          returnKeywords.push(thisKeyword);
        }

        return returnKeywords;
      },
      isCurrent(){
        return this.$store.state.currentImpactID === this.impact.impactID;
      },
      isNotCurrent(){
        return (this.$store.state.currentImpactID !== '' && !this.isCurrent);
      },
      shouldUsePointer(){
        return this.keywordsForImpact.length > 0;
      }
    },
    methods:{
      setCurrent(){

        const
          currentKeywordID = this.isCurrent ? '' : this.impact.impactID;

        this.$store.dispatch('setCurrentImpactId', currentKeywordID);
        this.$refs.keywordContainer.setCurrent(this.isCurrent)
      }
    },
    watch:{
      isCurrent(){
        this.$refs.keywordContainer.setCurrent(this.isCurrent)
      }
    }
  };
</script>

<style scoped lang="scss">

    li{
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        padding: 0 5px;
        margin-bottom: 5px;
    }

    .impactContainer{
        position: relative;
    }

    .usePointer{
        cursor: pointer;
    }

    .bstr_highlight{
        background-color: $color--blue-foreground;
        overflow: visible;
    }

    .current .impactText{
        font-weight: 600;
        text-decoration: underline;
    }

    .notCurrent:not(.bstr_highlight){
        color: $color--deemphasize;
    }


</style>
<template>
    <div class="impactKeywordContainer">
        <div class="upArrow"></div>
        <ImpactKeyword v-for="keyword in keywords"
                       :key="keyword.vueKey"
                       :keyword="keyword"
                       ref="impactKeywords"
        />
    </div>
</template>

<script>
  import ImpactKeyword from "./ImpactKeyword"

  export default {
    name: "ImpactKeywordContainer",
    components: {
      ImpactKeyword
    },
    props:['keywords'],
    data:function(){
      return {current:false
      , maxWidth:'0px'}
    },
    methods:{
      setCurrent: function(current){
        this.current = current
      },
      calculateKeywordContainerWidth:function(){
        const maxWidth = this.$parent.$el.getBoundingClientRect().width;

        let totalWidth = 0;

        for(let i = 0; i < this.$children.length; i++ ){
          const thisImpactKeywordText = this.$children[i].$el.getElementsByClassName('innerText')[0];

        }
      }
    },
    watch:{
      current(){

        const current = this.current;

        this.calculateKeywordContainerWidth();

        this.$refs.impactKeywords.forEach(
          function(impactKeyword){
            impactKeyword.setCurrent(current)
          });

      }
    }

  };
</script>

<style scoped lang="scss">

    .impactKeywordContainer{
        border-radius: 4px;
        width: fit-content;
        height: fit-content;
        min-height: 0;
        padding:2px;
        display: flex;
        line-height: 0;
        position: absolute;
        bottom: -5px;
        left: -2px;
        transition: .2s;
        flex-wrap: nowrap;
        /*opacity:0;*/

    }

    /*li:hover .impactKeywordContainer{*/
    /*    opacity: 1;*/
    /*}*/

    .current .impactKeywordContainer{
        left: 0;
        bottom: 0;
        transform: translateY(calc(100% + 4px));
        background-color: #e4f1fc;
        line-height: 1rem;
        margin: 0;
        z-index: 10;
        border-radius: 10px;
        border: 1px solid #75c3fc;
        flex-wrap: wrap;
    }

    .upArrow{
        display: none;
        top: 0;
        transform: translateY(-100%) translateX(5px);
        border-bottom-color: $color--blue-foreground;
        z-index: 11;
    }

    .current .upArrow{
        display: block;
    }

</style>
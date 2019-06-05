<template>
    <div :class="[
    {deemphaize:!keywordIsActive},
    'impactKeyword'
    ]"
         ref="container"
         style="height: 5px; width: 5px"

    >
        <div class="innerText"
             ref="innerText"
        >{{keyword.strKeywordText}}</div>
    </div>
</template>

<script>
  export default {
    name: "ImpactKeyword",
    props:['keyword'],
    data:function(){
      return{
        isCurrent:false
      }
    },
    computed:{
      keywordIsActive:function(){
        return this.$store.getters.keyword(this.keyword.strKeywordKey).isActive;
      }
    },
    methods:{
      setCurrent:function(current) {
        this.isCurrent = current;
      },
      maintainSize:function(){
        if(this.isCurrent){

          const targetHeight ="22px";

          this.$refs.container.style.height = targetHeight;
          this.$refs.container.style.width = (this.$refs.innerText.getBoundingClientRect().width + 20) + "px";

        }else{
          this.$refs.container.style.height = "5px";
          this.$refs.container.style.width = "5px";
        }
      }
    },
    watch:{
      isCurrent(){
        this.maintainSize();
      }

    }
  };
</script>

<style scoped lang="scss">
    .impactKeyword{
        border-radius: 15px;
        display: inline-block;
        margin: 1px;
        background-color: $color--secondary;
        overflow: hidden;
        transition: $duration--short-transition;
    }

    .impactKeyword.deemphaize{
        background-color: $color--deemphasize !important;
    }

    .current .impactKeyword{
        padding: 2px 10px;
        background-color: $color--secondary;
        border: 1px solid $color--light;
        color: $color--light;
    }

    .innerText{
        /*height: fit-content;*/
        width: fit-content;
        white-space: nowrap;
        padding: 2px;
    }


</style>
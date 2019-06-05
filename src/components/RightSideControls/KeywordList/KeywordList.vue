<template>
    <div class="main">
        <div class="controlsContainer">
            <KeywordControls/>
        </div>
        <div class="listContainer">
            <ul>
                <KeywordLI
                        v-for="keyword in keywords"
                        :key="keyword.keywordKey"
                        :keyword="keyword"/>
            </ul>
        </div>
    </div>
</template>

<script>

  import KeywordLI from './Keywords/KeywordLI'
  import KeywordControls from './KeywordControls/KeywordControls'

  export default {
    name: "KeywordList",
    components:{
      KeywordLI
      , KeywordControls
    },
    computed:{
      keywords(){
        return this.$store.getters.resumeKeywords;
      }
    }

  };
</script>

<style scoped lang="scss">

    .main{
        display: flex;
        flex-direction: column;
        min-height: 0;
        width:100%;
    }

    .listContainer{
        flex: 1 1 auto;
        overflow-y: auto;

    }

    .listContainer::-webkit-scrollbar {
        width: 5px;
    }

    .listContainer::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }

    .listContainer::-webkit-scrollbar-thumb {
        background-color: $color--secondary;
        outline: 1px solid slategrey;
    }

    .controlsContainer{
        flex: 0 0 auto;
    }

    ul{
        padding: 0;
    }

</style>
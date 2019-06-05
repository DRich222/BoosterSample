<template>
    <div class="rightSideContainer"
         ref="rightSideContainer"
    >
        <div class="headerContainer">
            <RightSideControlHeader/>
        </div>
        <div class="keywordListContainer">
            <KeywordList/>
        </div>
        <div class="controlBoxContainer">
            <ControlBox/>
        </div>
    </div>
</template>

<script>

  import RightSideControlHeader from './RightSideControlHeader/RightSideControlHeader'
  import KeywordList from './KeywordList/KeywordList'
  import ControlBox from './ControlBox'

  export default {
    name: "RightSideControls",
    components:{
      RightSideControlHeader,
      KeywordList,
      ControlBox
    }
  };
</script>

<style scoped>

    .rightSideContainer{
        max-height: 100vh;
        position: sticky;
        top: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        width: fit-content;
    }

    .headerContainer{
        flex: 0 0 auto;
    }

    .keywordListContainer{
        flex: 1 1 auto;
        display: flex;
        overflow-y: hidden;
        width: 100%;
    }

    .expandHalfOnly .rightSideContainer{
        overflow: scroll;
    }

    .expandHalfOnly .keywordListContainer{
        overflow-y: visible;
    }

    @media all and (max-width: 960px) {

        .rightSideContainer{
            width: 100%;
        }
    }


    .controlBoxContainer{
        flex: 0 0 auto;
    }

</style>
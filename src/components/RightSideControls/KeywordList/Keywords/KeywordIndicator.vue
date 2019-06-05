<template>
    <div class="clickMeContainer">
        <div class="clickMe"></div>
        <div class="upArrow"></div>
    </div>
</template>

<script>
  export default {
    name: "KeywordAction"
  };
</script>

<style scoped lang="scss">

    .clickMeContainer{
        position: relative;
        right:0;
        text-align: center;
        height: 100%;
        min-width: 25px;

    }

    .clickMe{
        position: relative;
        border: 2px solid $color--deemphasize;
        border-radius: 50%;
        height:12px;
        width: 12px;
        top: 50%;
        transform: translateY(-50%);
    }

    .current .clickMe{
        background: $color--blue-foreground;
        border-color: $color--blue-foreground;
    }
    .upArrow{

        left: -1px;
        bottom:-15px;

        display: none;
    }

    .current .upArrow{
        display: block;
    }


</style>
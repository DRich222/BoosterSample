<template>
  <!--    @Reviewer
          This is a panel that displays over a significant portion of the top-left corner of the browser viewport, so I can
          print statements there that would otherwise end up in the the console.
          If you have a better way of debugging Safari on an iPhone WITHOUT dropping ~$1000 on a MAC, please let me
          know.
-->
  <div id="safariDebuggingData">{{ debuggingData }}</div>
</template>

<script>
export default {
  name: "SafariDebuggingScreen",
  computed: {
    debuggingData: function() {
      return this.$store.state.safariDebuggingData;
    }
  }
};
</script>

<style lang="scss">
#safariDebuggingData {
  position: fixed;
  z-index: 1000;
  width: 250px;
  height: 250px;
  top: 0;
  left: 0;
  background-color: $color--light;
  border: 2px solid black;
  overflow: scroll;
}
</style>

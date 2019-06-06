<template>
  <!--    @Reviewer-->
  <!--    The bar when there's a current keyword is what I'm working on right now, which is why it looks awful.-->
  <div
    :class="[
      { expanded: expanded },
      { mobileCurrentKeywordHeader: currentKeywordText !== '' },
      { expandHalfOnly: appWidthDescription === 1 },
      'controlsContainer',
      'keepCurrentKeyword'
    ]"
    :style="'width:' + this.targetWidth"
  >
    <div v-if="currentKeywordText !== ''" class="curKeywordHolder">
      {{ currentKeywordText }}
    </div>
    <div class="iconHolder" @click="toggleExpanded">
      <img src="./../../assets/Logo72px.png" />
    </div>
    <RightSideControls ref="controls" />
  </div>
</template>

<script>
import RightSideControls from "../RightSideControls/RightSideControls";

export default {
  name: "MobileControls",
  components: {
    RightSideControls
  },
  computed: {
    expanded: function() {
      return this.$store.state.mobileMenuExpanded;
    },
    appWidthDescription: function() {
      return this.$store.state.appWidthDescription;
    },
    targetWidth: function() {
      if (!this.expanded) return ""; //If the controls are not shown, there's no width
      if (this.$store.state.appWidthDescription === 0) return "100%"; //Narrow / vertical mobile screen
      if (this.$store.state.appWidthDescription === 1) return "50%"; //Wide / horizontal mobile screen
      // Larger than this and the right side bar is present, so no mobile menu is required.
    },
    currentKeywordText: function() {
      const currentKeywordKey = this.$store.state.currentKeywordKey;

      return currentKeywordKey === ""
        ? ""
        : this.$store.getters.keyword(currentKeywordKey).strKeywordText;
    }
  },
  methods: {
    toggleExpanded: function() {
      this.$store.dispatch("setMobileMenuExpanded", !this.expanded);
    }
  }
};
</script>

<style scoped lang="scss">
.controlsContainer {
  background-color: #28282899;
  position: fixed;
  top: 15px;
  right: 15px;
  width: 42px;
  height: 42px;
  z-index: 100;
  padding: 3px;
  border-radius: 3px;
  transition: height 0.2s, width 0.2s;
  overflow: hidden;
}

.controlsContainer.expanded {
  height: 100%;
  top: 0;
  right: 0;
}

.mobileCurrentKeywordHeader {
  width: 100%;
}

.curKeywordHolder {
  background-color: $color--light;
  border-radius: 3px;
}

.expandHalfOnly {
}

img {
  width: 36px;
  height: auto;
}
</style>

<template>

<!--    @Rewviewer
        Impacts are individual bullets listed for each section of a resume.  The classes are applied as follows:
            1. "bstr_highlight": applied when the "current keyword" is associated with the impact

            2. "hidden"        : a global class applied when the impact is only associated with keywords that have been
                                 set to not "active" in the keyword list.

            3. "current"       : applied when a keyword is clicked.  This has the effect of making the impact bold and
                                 underlined and also expands the impact keywords bubble.

            4. "notCurrent"    : applied when a different impact is the current impact.  This class fades the impact text
                                 to further highlight the impact that IS current

            5. "usePointer"    : applied for impacts that have been tagged with keywords, and indicates that an
                                 impact can be clicked.-->
  <li
    :class="[
      { bstr_highlight: shouldHighlight },
      { hidden: shouldHide },
      { current: isCurrent },
      { notCurrent: isNotCurrent },
      { usePointer: shouldUsePointer },
      'keepCurrentImpact keepCurrentKeyword'
    ]"
    ref="impact.strImpactID"
    v-on:click="setCurrent"
  >
    <div class="impactContainer">
      <span class="impactText">{{ impact.impactText }}</span>
      <ImpactKeywordContainer
        :keywords="keywordsForImpact"
        ref="keywordContainer"
      />
    </div>
  </li>
</template>

<script>
import ImpactKeywordContainer from "./ImpactKeywordContainer";

export default {
  name: "Impact",
  props: ["impact"],
  components: { ImpactKeywordContainer },
  computed: {
    shouldHighlight() {
      if (this.shouldHide) return false;
      const keywords = this.impact.keywords,
        currentKeywordKey = this.$store.getters.currentKeywordKey;

      for (let i = 0; i < keywords.length; i++) {
        const keyword = keywords[i];
        if (keyword.strKeywordKey === currentKeywordKey) return true;
      }

      return false;
    },
    shouldHide() {
      const activeKeywords = this.activeKeywords,
        thisImpactKeywords = this.impact.keywords;
      let activeKeywordKeys = [],
        thisImpactKeywordKeys = [];

      for (let i = 0; i < activeKeywords.length; i++) {
        activeKeywordKeys.push(activeKeywords[i].strKeywordKey);
      }

      for (let i = 0; i < thisImpactKeywords.length; i++) {
        thisImpactKeywordKeys.push(thisImpactKeywords[i].strKeywordKey);
      }

      const thisImpactActiveKeywordKeys = activeKeywordKeys.filter(
          value => -1 !== thisImpactKeywordKeys.indexOf(value)
        ),
        shouldHideResult = thisImpactActiveKeywordKeys.length === 0;

      return shouldHideResult;
    },
    activeKeywords() {
      return this.$store.getters.activeKeywords;
    },
    keywordsForImpact() {
      let returnKeywords = [];

      for (let i = 0; i < this.impact.keywords.length; i++) {
        let thisKeyword = this.impact.keywords[i];

        thisKeyword.vueKey = thisKeyword.strKeywordKey + this.impact.impactID;

        returnKeywords.push(thisKeyword);
      }

      return returnKeywords;
    },
    isCurrent() {
      return this.$store.state.currentImpactID === this.impact.impactID;
    },
    isNotCurrent() {
      return this.$store.state.currentImpactID !== "" && !this.isCurrent;
    },
    shouldUsePointer() {
      return this.keywordsForImpact.length > 0;
    }
  },
  methods: {
    setCurrent() {
      const currentKeywordID = this.isCurrent ? "" : this.impact.impactID;

      this.$store.dispatch("setCurrentImpactId", currentKeywordID);
      this.$refs.keywordContainer.setCurrent(this.isCurrent);
    }
  },
  watch: {
    isCurrent() {
      this.$refs.keywordContainer.setCurrent(this.isCurrent);
    }
  }
};
</script>

<style scoped lang="scss">
li {
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  padding: 0 5px;
  margin-bottom: 5px;
}

.impactContainer {
  position: relative;
}

.usePointer {
  cursor: pointer;
}

.bstr_highlight {
  background-color: $color--blue-foreground;
  overflow: visible;
}

.current .impactText {
  font-weight: 600;
  text-decoration: underline;
}

.notCurrent:not(.bstr_highlight) {
  color: $color--deemphasize;
}
</style>

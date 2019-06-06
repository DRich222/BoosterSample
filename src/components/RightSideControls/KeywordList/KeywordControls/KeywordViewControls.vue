<template>
  <div>
    <div class="mainContainer">
      <!--        @Reviewer
            Type text here and only keywords with that text will be listed.  The search/filtering capability is instant.
-->
      <div ref="search">
        <BaseSimpleInputWithButton
          :placeholderText="'Search Keywords'"
          v-model="keywordSearchTerm"
          ><BaseButton :type="'invisible'" @clicked="clearSearch">
            <span class="closeButton">&times;</span></BaseButton
          ></BaseSimpleInputWithButton
        >
      </div>

      <!--        @Reviewer
            There will be sorting functionality.  You'll be able to sort alphabetically, but also by other attributes
             such as "Experience Index", which I can tell you about if you're interested.-->
      <!--        <div ref="sort">-->
      <!--            <KeywordSortControl/>-->
      <!--        </div>-->
    </div>
    <KeywordShowHideAllControl />
  </div>
</template>

<script>
import KeywordSortControl from "./KeywordSortControl";
import KeywordShowHideAllControl from "./KeywordShowHideAllControl";

export default {
  name: "KeywordViewControls",
  components: {
    KeywordSortControl,
    KeywordShowHideAllControl
  },
  computed: {
    keywordSearchTerm: {
      get() {
        return this.$store.state.keywordSearchTerm;
      },
      set(keywordSearchTerm) {
        this.$store.dispatch("setKeywordSearchTerm", keywordSearchTerm);
      }
    }
  },
  methods: {
    clearSearch() {
      this.$store.dispatch("setKeywordSearchTerm", "");
    }
  }
};
</script>

<style scoped lang="scss">
.mainContainer {
  color: $color--light;
  background-color: $color--secondary;
  padding: 25px;
  padding-bottom: 22px;
}

.closeButton {
  padding: 0 10px;
  font-size: 1.5rem;
  line-height: 1rem;
}

/*Third party overwrites*/
.v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
  display: inline-block;
}
</style>

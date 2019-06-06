<template>
  <!--    @Reviewer-->
  <!--    Class descriptions are in the Style section below.  The "hidden" class is a global class and just has -->
  <!--    "display:none".  Keywords are hidden when the resume viewer is using the search bar at the top of the keyword
        list.  Keywords that don't include what's been written in the search bar are hidden-->
  <li
    class="main keepCurrentKeyword"
    :class="[
      { current: isCurrent },
      { demphasize: !isActive },
      { hidden: shouldHide }
    ]"
  >
    <!--    @Reviewer
        The keyword column is broken down into 2 main parts: the main component which is always visible, and the
         details component which is only visible when the keyword is "current".  The main part is further broken
         down into 3 parts: the action, the keyword text, and the icon.  The action changes based on context (viewing
          vs. editing).  In the viewing context the action is to either make the keyword active or inactive.  The
          text is of course the actual text of the keyword.  And the icon, in the context of viewing a resume, is
          mainly intended to be a target subtly prompting people to click or tap the keyword to display the details.-->
    <div class="main">
      <div class="keywordActionContainer">
        <KeywordAction :keywordKey="keyword.strKeywordKey" />
      </div>
      <div class="keywordMainRow" v-on:click="isActive ? toggleCurrent() : ''">
        <div class="keywordText">
          {{ keywordText }}
        </div>
        <div class="keywordIconContainer">
          <KeywordIndicator />
        </div>
      </div>
    </div>
    <div
      class="detailsContainer"
      ref="detailsContainer"
      v-if="appWidthDescription > 1"
    >
      <KeywordDetails_PublicView
        :keywordKey="keywordKey"
        @maintainDetailVisibility="maintainDetailVisibility"
        ref="details"
        @scrollToImpact="scrollToImpact"
      />
    </div>
  </li>
</template>

<script>
import KeywordDetails_PublicView from "./KeywordDetails_PublicView";
import KeywordAction from "./KeywordAction";
import KeywordIndicator from "./KeywordIndicator";
import UtilFunctions from "../../../../UtilFunctions";

export default {
  name: "KeywordLI",
  props: ["keyword"],
  components: {
    KeywordDetails_PublicView,
    KeywordAction,
    KeywordIndicator,
    UtilFunctions
  },
  computed: {
    keywordText() {
      return this.keyword.strKeywordText;
    },
    keywordKey() {
      return this.keyword.strKeywordKey;
    },
    isActive() {
      return this.$store.getters.keyword(this.keywordKey).isActive;
    },
    isCurrent() {
      return (
        this.$store.getters.currentKeywordKey === this.keyword.strKeywordKey
      );
    },
    shouldHide() {
      const capsSearchTerm = this.$store.state.keywordSearchTerm.toUpperCase(),
        capsKeywordText = this.keywordText.toUpperCase();

      return !(
        capsSearchTerm === "" || capsKeywordText.indexOf(capsSearchTerm) >= 0
      );
    },
    appWidthDescription() {
      return this.$store.state.appWidthDescription;
    }
  },
  methods: {
    toggleCurrent: function() {
      if (this.isCurrent) {
        this.$store.dispatch("unSetCurrentKeywordKey");
      } else {
        if (this.$store.state.appWidthDescription <= 1) {
          this.$store.dispatch("setMobileMenuExpanded", false);
        }
        this.$store.dispatch(
          "setCurrentKeywordKey",
          this.keyword.strKeywordKey
        );
        this.scrollToImpact("Next");
      }
    },
    // @@Reviewer
    // Keyword "Details" are just the "Displaying X of Y" text + the "prev"
    //and "next" buttons.  Setting the height for this was tricky though.  I really liked the slide-open animation,
    //but that css transition doesn't work if the target height is "auto", "100%", or "fit-content".  So instead
    //what I do is get the height of the content of the details div, and set the height of the detail div equal to
    //the height of the content.  This had a second level of complexity since depending on the width of the
    //screen the height of the content might be (effectively) a single line or two lines.  This change might occur
    //if someone's viewing a resume on a phone and switches the orientation.  It works
    maintainDetailVisibility() {
      if (typeof this.$refs.detailsContainer === "undefined") return;

      if (this.isCurrent && this.isActive) {
        this.$refs.detailsContainer.style.height =
          this.$refs.details.$el.getBoundingClientRect().height + "px";
      } else {
        this.$refs.detailsContainer.style.height = 0;
      }
    },
    scrollToImpact(which) {
      const relatedImpactIDs = this.$store.getters.impactIdsForKeywordKey(
        this.keywordKey
      );

      let impactElements = [];

      for (let i = 0; i < relatedImpactIDs.length; i++) {
        impactElements.push(document.getElementById(relatedImpactIDs[i]));
      }

      impactElements.sort(UtilFunctions.sortElementsByBoundingClientRects);

      let targetScrollToID = impactElements[0].getAttribute("id");
      if (which === "next") {
        for (let i = 0; i < impactElements.length; i++) {
          const thisImpactTop = impactElements[i].getBoundingClientRect().top;
          if (thisImpactTop > window.innerHeight) {
            targetScrollToID = impactElements[i].getAttribute("id");
            break;
          }
        }
      } else {
        //which === "prev"

        for (let i = impactElements.length - 1; i >= 0; i--) {
          const thisImpactBottom = impactElements[i].getBoundingClientRect()
            .bottom;
          if (thisImpactBottom < 0) {
            targetScrollToID = impactElements[i].getAttribute("id");
            break;
          }
        }
      }

      UtilFunctions.smoothScroll(targetScrollToID);
    }
  },
  watch: {
    isCurrent() {
      this.maintainDetailVisibility();
    },
    isActive() {
      if (!this.isActive) {
        if (this.isCurrent) {
          this.toggleCurrent();
        }
      }
      this.maintainDetailVisibility();
    }
  }
};
</script>

<style scoped lang="scss">
li.main {
  margin: 0;
  border: none;
  text-align: left;
  position: relative;
  overflow: hidden;
  background-color: $color--light;
  cursor: pointer;
  transition: height 1s;
}

div.main {
  display: flex;
  flex-direction: row;
}

li.main:hover:not(.current) {
  background-color: $color--blue-hint;
}

/*@Reviewer*/
/*The "Current" keyword is the single keyword that the resume viewer is interested in at the moment.  A viewer */
/*makes a keyword "current" by clicking on it.  If a keyword is current, all related impact statmements (bullets) */
/*are highlighted.*/

li.current.main {
  background: $color--blue-subtle;
}

/*@Reviewer*/
/*A non-active keyword is a keyword that has been toggled off.  These keywords cannot be made current.  Additionally*/
/*any impact (bullet) in the resume will be hidden if it's only associated with non-active keywords.  I used the*/
/*class name "de-emphasize" rather than "inactive" or just letting the formatting apply to any keyword not */
/*specifically identified as active since I "deemphazise" impacts and might use the class in one or two other places*/
li.demphasize {
  color: $color--deemphasize;
}

li.main:not(:first-child) {
  border-top: 1px solid $color--light-grey-border;
}

.keywordActionContainer {
  flex: 0 0 auto;
  padding: $length--keywordPadding 0 $length--keywordPadding
    $length--keywordPadding;
}

.keywordMainRow {
  padding: $length--keywordPadding;
  display: inline-flex;
  flex: 1 1 auto;
  justify-content: space-between;
}

.detailsContainer {
  height: 0;
  width: 100%;
  overflow: hidden;
  transition: height 0.2s linear;
}

.keywordIconContainer {
  flex: 0 0 auto;
}

.keywordText {
  flex: 1 1 auto;
  word-break: break-word;
}
</style>

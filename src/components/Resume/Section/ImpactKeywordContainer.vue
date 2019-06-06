<template>
  <!--        @@Reviewer
        This portion took quite a bit of work, and still is only 80% of what I want it to be.
        What I've built so far that I like is:
            1. A single dot is shown for each keyword associated with an impact (bullet)
            2. The dots expand into the keywords when someone clicks/taps the impact, and the container expands
               similarly
            3. The dots and keywords are blue or gray according to whether or not they're active.
            4. The keyword container has a nice speech bubble look to it
        What I haven't finished yet is:
            1. The animation in Safari is awkward.  It expands before sliding down into the appropriate position.
            2. When the keywords are wider than the max width, the container stays at the max width even though
               the keywords wrap.  The container should be just a little wider than the widest row of keywords.
            3. I haven't figured out how I want to deal with longer keywords (e.g. "Business Process Analysis and
               Implementation").  On the desktop it shouldn't be a problem, but on a phone there could be some
               overflow.  I don't want that overflow to have a scroll bar, but I'm not sure if I want to handle the
               text by having it wrap, showing elipses, or something else.
            4. It might help facilitate natural navigation if you could click / tap on a keyword in this context
               and be brought to the keyword in the keyword list.  The logical progression I imagine is someone
               starts by clicking a keyword like "JavaScript".  While inspecting one of the impacts associated
               with JavaScript, they see the keyword "Vue.JS" and think, "Oh, where are the other VueJS-related
               activities?"  Presently they'll have to find those by finding VueJS in the keyword list, but it
               would save a little time if they could just click the keyword where they saw it.-->
  <div class="impactKeywordContainer">
    <div class="upArrow"></div>
    <ImpactKeyword
      v-for="keyword in keywords"
      :key="keyword.vueKey"
      :keyword="keyword"
      ref="impactKeywords"
    />
  </div>
</template>

<script>
import ImpactKeyword from "./ImpactKeyword";

export default {
  name: "ImpactKeywordContainer",
  components: {
    ImpactKeyword
  },
  props: ["keywords"],
  data: function() {
    return { current: false, maxWidth: "0px" };
  },
  methods: {
    setCurrent: function(current) {
      this.current = current;
    },

    //  This is the method that I started to address item 3 above of what I want this component to do.
    calculateKeywordContainerWidth: function() {
      const maxWidth = this.$parent.$el.getBoundingClientRect().width;

      let totalWidth = 0;

      for (let i = 0; i < this.$children.length; i++) {
        const thisImpactKeywordText = this.$children[
          i
        ].$el.getElementsByClassName("innerText")[0];
      }
    }
  },
  watch: {
    current() {
      const current = this.current;

      this.calculateKeywordContainerWidth();

      this.$refs.impactKeywords.forEach(function(impactKeyword) {
        impactKeyword.setCurrent(current);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.impactKeywordContainer {
  border-radius: 4px;
  width: fit-content;
  height: fit-content;
  min-height: 0;
  padding: 2px;
  display: flex;
  line-height: 0;
  position: absolute;
  bottom: -5px;
  left: -2px;
  transition: 0.2s;
  flex-wrap: nowrap;
  /*opacity:0;*/
}

/*li:hover .impactKeywordContainer{*/
/*    opacity: 1;*/
/*}*/

.current .impactKeywordContainer {
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

.upArrow {
  display: none;
  top: 0;
  transform: translateY(-100%) translateX(5px);
  border-bottom-color: $color--blue-foreground;
  z-index: 11;
}

.current .upArrow {
  display: block;
}
</style>

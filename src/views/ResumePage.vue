<template>
  <div>
    <!--      @Reviewer-->
    <!--      I don't own a Mac, but I have an iPhone like over 15% of the population, so this was my work around for -->
    <!--      trouble-shooting issues viewing resumes on iPhones without me having to actually purchase a Mac.  I know -->
    <!--      eventually I'm going to have to buy a Mac if I want to really support iPhones, but this works for now.-->

    <SafariDebuggingScreen v-if="safariDebugging" />

    <div v-if="resloaded">
      <!--        @Reviewer-->
      <!--        Booster is design to be very mobile friendly.  The content for this is largely the same as for the right
            side content though-->
      <MobileControls v-if="appWidthDescription < 2" />
      <v-layout row>
        <v-flex sm12 md9>
          <!--            @Reviewer-->
          <!--            This is the actual text of the resume-->
          <Resume />
        </v-flex>
        <v-flex hidden-sm-and-down md3>
          <!--        @Reviewer
            This is the right side bar.  For the demo it only includes the keywords, but in production it'll include
            buttons for printing, "Help", contacting the resume poster, and possibly a couple of other things in the
            resume view context.  The buttons will be different in the resume editing context -->
          <RightSideControls v-if="appWidthDescription >= 2" />
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import Resume from "./../components/Resume/Resume";
import RightSideControls from "../components/RightSideControls/RightSideControls";
import MobileControls from "../components/RightSideControls/MobileControls";
import SafariDebuggingScreen from "../components/SafariDebuggingScreen";

export default {
  name: "ResumePage",
  components: {
    Resume,
    RightSideControls,
    MobileControls,
    SafariDebuggingScreen
  },
  computed: {
    resloaded() {
      return this.$store.state.resLoaded;
    },
    appWidthDescription() {
      return this.$store.state.appWidthDescription;
    },
    safariDebugging() {
      return this.$store.state.safariDebugging;
    }
  }
};
</script>

<style scoped></style>

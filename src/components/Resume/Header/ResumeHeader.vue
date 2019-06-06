<template>
  <div>
    <div :class="['header']">
      <div class="headerMain">
        <div class="name">
          {{ header.strApplicantFirstName }} {{ header.strApplicantLastName }}
        </div>
        <div class="bstrTitle">{{ header.strResumeTitle }}</div>
      </div>
      <!--            @Reviewer
                This is another section that needs work.  The mobile view of the header details should be a bit
                cleaner, but I'm still working out some design considerations since the functionality could change a
                bit.-->
      <div
        :class="[{ mobile: appWidthDescription === 'small' }, 'headerDetails']"
      >
        <HeaderShortText class="first">{{
          header.strDisplayEmail
        }}</HeaderShortText>
        <HeaderShortText>{{ header.strPhoneNumber }}</HeaderShortText>
        <HeaderShortText>{{ header.strLink1 }}</HeaderShortText>
        <HeaderShortText>{{ header.strLink2 }}</HeaderShortText>
      </div>
    </div>
    <div v-if="hasSummary" class="summary">{{ header.strSummary }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderShortText from "./HeaderShortText";

export default {
  name: "ResumeHeader",
  computed: {
    ...mapState({
      header: state => state.resumeData.header
    }),
    hasSummary() {
      return this.header.summary !== "";
    },
    appWidthDescription() {
      return this.$store.state.appWidthDescription;
    }
  },
  components: {
    HeaderShortText
  }
};
</script>

<style scoped lang="scss">
.header {
  background: linear-gradient(to right, #004a80, #2b7fbb);
  text-align: left;
  padding: 15px 15px 0 15px;
  margin: -15px -15px 0 -15px;
}

.headerMain {
  color: white;
}

.name {
  font-size: 3rem;
  line-height: 3rem;
}

.bstrTitle {
  font-size: 2rem;
}

.headerDetails {
  background-color: #cbe9ff;
  color: black;
  margin: 0 -15px;
  border-top: 3px solid #0093fe;
  padding: 0 15px;

  div.bstr-shortTextContainer {
    display: inline-block;
    border-left: none;
  }
}

.headerDetails.mobile div {
  text-align: center;
  display: block;
}

.summary {
  text-align: left;
  padding-bottom: 20px;
  margin: 20px 20px 0 20px;
}
</style>

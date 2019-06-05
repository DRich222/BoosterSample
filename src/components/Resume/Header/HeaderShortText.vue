<template>
    <div class="bstr-shortTextContainer" v-if="isNotBlank">
        <a v-if="isLink"
           :href=slotText
           target="_blank"
        ><slot></slot></a>
        <a v-else-if="isEmail"
           :href="'mailto:' + slotText"
        ><slot></slot></a>
        <span v-else><slot></slot></span>
    </div>
</template>

<script>
  export default {
    name: "HeaderShortText",
    props:['first'],
    computed:{
      slotText(){return this.$slots.default[0].text},
      isNotBlank(){
        return this.slotText !== "";
      },
      isLink(){
        const regex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/;
        return regex.test(this.slotText)
      },
      isEmail(){
        const regexEmail =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return regexEmail.test(this.slotText);
      },
      getClass(){
        return this.first==="true" ? "first" : "bstr-shortTextContainer";
      }
    }
  };
</script>

<style scoped>

    .bstr-shortTextContainer:not(.first){
        margin-left: 7px;
        padding-left: 7px;
        border-left: 1px solid black;
    }
</style>
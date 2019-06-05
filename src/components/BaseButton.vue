<script>
export default {
  name: "Button",
  props: {
    type: {
      type: String,
      validator: val => ["primary", "secondary", "ternary", "invisible"].includes(val),
      required: false,
      default: "primary"
    },
    classes: {
      type: String,
      required: false,
      default: ""
    },
    onClick: {
      type: Function,
      required: false,
      default: function(){this.$emit('clicked')}
    }
  },
  computed: {
    listOfClasses: function() {
      return `candidateButtons__${this.type} ${this.classes}`;
    }
  }
};
</script>

<template>
  <v-btn flat v-bind:class="listOfClasses" v-on:click.native="onClick">
    <slot/>
  </v-btn>
</template>

<style lang="scss" scoped>
.candidateButtons {

  display: inline-block;

  :first-child{
    padding: 0;
  }

  &__primary {
    background-color: $color--primary;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    margin: 10px 0 10px 0;
    height: 44px;
    padding: 0 10px;
  }

  &__secondary {
    background-color: $color--secondary;
    color: $color--light;
    border-radius: 5px;
    height: 44px;
    margin: 10px 0 10px 5px;
    padding: 0 12px;
  }

  &__invisible {
    background-color: transparent;
    margin: 0;
    outline: none;


  }
}

// Third party overrides
.v-btn {
  font-size: 12px;
  min-width: 0 !important;
}

  .candidateButtons__invisible.v-btn{
    height: 100% !important;
    padding: 0 !important;
  }

</style>

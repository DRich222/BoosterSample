<template>
    <div class="inputContainer">
        <input type="text"
               :placeholder="placeholderText"
               :value="value"
               v-on:input="$emit('input', $event.target.value)"
        />
        <div class="buttonHolder"><slot/></div>
    </div>
</template>

<script>
  export default {
    name: "BaseSimpleInputWithButton",
    props:['placeholderText', 'value']
  };
</script>

<style scoped lang="scss">

    .inputContainer{
        background-color: $color--light;
        border-radius: 5px;
        padding: $length--keywordPadding;
        display: flex;
    }

    input{
        outline: none;
        color: $color--heading;
        flex: 1 1 auto;
        width: 100%;
    }

    .buttonHolder{
        flex: 0 0 auto;
    }


</style>
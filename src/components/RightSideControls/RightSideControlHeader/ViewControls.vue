<template>
    <div class="buttonContainer">
        <BaseButton type="secondary">Help</BaseButton>
        <BaseButton type="secondary">Save</BaseButton>
        <BaseButton type="secondary">Print</BaseButton>
        <BaseButton type="secondary">Contact</BaseButton>
    </div>
</template>

<script>
  export default {
    name: "ViewControls"
  };
</script>

<style scoped lang="scss">
    .buttonContainer{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>
<template>
<!--    @Reviewer
        The impact area is just where all the impacts (bullets) for each section of the resume are held.  Impacts and
        impact keywords are where things get a bit more interesting.-->
    <div>
        <ul>
            <Impact v-for="impact in impacts"
                    :impact="impact"
                    :key="impact.impactID"
                    :id="impact.impactID"/>
        </ul>
    </div>
</template>

<script>

    import Impact from "./Impact"
  export default {
    name: "ImpactArea",
    components: {Impact},
    props: ['impacts']
  };
</script>

<style scoped>

    ul{
        list-style: initial;
        padding: 15px;
    }

</style>
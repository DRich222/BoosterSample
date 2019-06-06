<template>
    <div class="sectionContainer">
        <!-- @Reviewer
             These dates were a little bit of a nuisance.  People don't put precise dates in their resumes for when
             they start or finish a certain job.  So although I store these values as the first of the month on either
             end, I need to convert them to MM/YYYY before they're rendered.  Safari apparently has some minor issues
             with whether or not a date contains a time.  I need to go back and check make sure my current solution
             is correct  since I don't want, for example, May 1st, 2019 to show up as 04/2019 because the browser thinks
             the date is in UTC, which, on the east coast means April 30, 2019.  I don't want to shift everyone's
             start/end dates back a month.-->
        <div class="dates">{{ startString }} - {{ endString }}</div>
        <SectionHeader :headerDetails="headerDetails" />
        <div class="sectionBody">
            <div>{{ section.strDescription }}</div>
            <div><ImpactArea :impacts="section.impacts" /></div>
        </div>
    </div>
</template>

<script>
    import SectionHeader from "./SectionHeader";
    import ImpactArea from "./ImpactArea";

    export default {
        name: "Section",
        components: { SectionHeader, ImpactArea },
        props: ["section"],
        computed: {
            headerDetails() {
                let headerDetails = {
                    organization: this.section.strOrganization,
                    location: this.section.strLocation,
                    hoursPerWeek: this.section.hoursPerWeek
                };

                if (this.section.strSectionType !== "project")
                    headerDetails.focus = this.section.strFocus;

                return headerDetails;
            },

            startString() {
                const dateStart = new Date(this.section.dateStart);

                return dateStart.getMonth() + 1 + "/" + dateStart.getFullYear();
            },
            endString() {
                if (this.section.isCurrent) return "Current";

                const endDate = this.section.dateEnd;

                const dateEnd = new Date(endDate);

                return dateEnd.getMonth() + 1 + "/" + dateEnd.getFullYear();
            }
        }
    };
</script>

<style scoped lang="scss">
    .sectionContainer {
        margin-top: 1rem;
    }

    .sectionBody {
        border: 1px solid $color--light-grey-border;
        padding: 15px;
    }

    .dates {
        text-align: right;
    }
</style>

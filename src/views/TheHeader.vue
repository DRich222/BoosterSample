<script>
  import constants from './../constants'
  export default {
    name: "TheHeader"
    , data() {
      return {
        menuActive: false
        , loginLink: constants.MEMBERFUL_URL
      };
    }
  };
</script>

<template>
    <nav class="navbar is-spaced" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="booster-logo" href="/">
                <img class="booster-logo__image" src="/img/booster-logo.png" />
                <span class="booster-logo__text">Booster</span>
            </a>
            <a
                    role="button"
                    class="navbar-burger burger"
                    :class="{ 'is-active': menuActive }"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    @click="menuActive = !menuActive"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div
                id="navbarBasicExample"
                class="navbar-menu"
                :class="{ 'is-active': menuActive }"
        >
            <div class="navbar-end">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">About Booster</a>

                    <div class="navbar-dropdown">
                        <router-link to="for-employers" class="navbar-item">
                            For Employers
                        </router-link>
                        <router-link to="for-applicants" class="navbar-item">
                            For Applicants
                        </router-link>
                    </div>
                </div>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">Demo</a>

                    <div class="navbar-dropdown">
                        <a
                                class="navbar-item"
                                href="https://booster.newstar.systems/ResumeSearchDemo"
                                target="_blank"
                        >For Employers</a
                        >
                        <a
                                class="navbar-item"
                                href="https://booster.newstar.systems/View/sample"
                                target="_blank"
                        >For Applicants</a
                        >
                    </div>
                </div>
                <div class="navbar-item">
                    <div class="buttons">
                        <router-link class="button is-primary" to="/sign-up-login">
                            <strong>Sign up</strong>
                        </router-link>
                        <a class="button is-light" :href="loginLink"
                        >Log in</a
                        >
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss">
    .booster-logo {
        display: flex;
        align-items: center;

        &__image {
            width: 50px;
            padding: 5px;
        }

        &__text {
            margin-left: 5px;
            font-size: 1.75rem;
            color: #222;
        }
    }
</style>
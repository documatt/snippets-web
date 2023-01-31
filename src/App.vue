<template>
  <div>
    <!-- NAVBAR -->
    <div class="container">
      <b-navbar>
        <template slot="brand">
          <b-navbar-item href="/">
            <img
                src="./assets/img/logo.svg"
                alt="Documatt logo"
            >
          </b-navbar-item>
        </template>
        <!-- empty yet -->
        <!-- <template slot="start"></template> -->
        <template slot="end">
          <b-navbar-item tag="div">
            <!-- Super ugly way how keep height -->
            <div class="page-navbar-keep-height"></div>
          </b-navbar-item>
          <b-navbar-item href="https://documatt.com">
            Documatt
          </b-navbar-item>
          <b-navbar-item
              href="/"
              active
          >
            Snippets
          </b-navbar-item>
          <b-navbar-dropdown :hoverable="true" label="More" right>
            <b-navbar-item href="https://documatt.com/blog/">Tech writer at work</b-navbar-item>
            <b-navbar-item href="https://documatt.com/restructuredtext-reference/">reStructuredText</b-navbar-item>
          </b-navbar-dropdown>
        </template>
      </b-navbar>
    </div>
    <!-- .NAVBAR -->

    <!-- BREADCRUMB -->
    <nav
        class="breadcrumb has-arrow-separator"
        aria-label="breadcrumbs"
    >
      <div class="container">
        <ul>
          <li>
            <a>Documatt Snippets</a> online reStructuredText editor
          </li>
        </ul>
      </div>
    </nav>
    <!-- .BREADCRUMB -->

    <!-- INTRO HERO BANNER -->
    <section class="hero intro">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-three-quarters">
              <!-- What is Snippets -->
              <b-collapse :open="false" position="is-bottom" aria-id="intro-box"
                          class="has-margin-bottom-30">
                <a slot="trigger" slot-scope="props" aria-controls="intro-box"
                   class="has-text-grey">
                  <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"/>
                  {{ !props.open ? 'Snippets? What is it?' : 'Hide' }}
                </a>
                <h1 class="title is-size-3">
                  <span class="has-text-weight-light">Documatt Snippets</span> is online
                  reStructuredText editor
                </h1>
                <h2 class="subtitle is-5">
                  Snippets are place to play and learn how to write documentation and books with
                  reStructuredText and Sphinx. You write content in reStructuredText syntax and
                  Snippets render it with Sphinx.
                </h2>
              </b-collapse>
              <!-- .What is Snippets -->
            </div>
            <div class="column">

              <!-- TODO: Twitter follow needs <script> but its forbidden in components -->
              <!--              <div v-if="!isDev" class="twitter-follow-button-container">-->
              <!-- Twitter follow button -->
              <!--<a
                href="https://twitter.com/documattcom?ref_src=twsrc%5Etfw"
                class="twitter-follow-button"
                data-show-count="false"
              >Follow us</a>

              <script
                async
                src="https://platform.twitter.com/widgets.js"
                charset="utf-8"
              />-->
              <!-- .Twitter follow button -->
              <!--              </div>-->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- .INTRO HERO BANNER -->

    <!-- APP -->
    <WriterApp/>
    <!-- .APP -->

    <!-- .FOOTER -->
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <a href="https://documatt.com">
            <img
                class="logo"
                src="./assets/img/logo.svg"
                alt="Documatt logo"
            >
          </a>
          <p>
            Write and read beautiful books and documentation in easy way with our powerful
            writing platform.
          </p>
          <p>
            Copyright &copy; {{ thisYear }} Documatt. &mdash;
            Cover illustration and icons by <a href="https://icons8.com/">icons8</a> &mdash;
            <a href="https://documatt.com/about/legal/">Terms & Privacy</a>
          </p>
        </div>
      </div>
    </footer>
    <!-- .FOOTER -->
  </div>
</template>

<script>
import WriterApp from '@/components/WriterApp'
import log from 'loglevel'

export default {
  name: 'App',

  components: {
    WriterApp
  },

  data: () => ({
    thisYear: new Date().getFullYear()
  }),

  mounted () {
    log.debug('Mounted')
  }
}
</script>

<style lang="scss">
@import "./assets/styles/main.scss";

@media screen and (min-width: 769px) {
  .page-navbar-keep-height {
    min-height: 5rem !important;
  }
}
</style>

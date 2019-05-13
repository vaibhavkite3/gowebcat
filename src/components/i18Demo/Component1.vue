<template>
  <div>
    <h2>Component 1</h2>
    <h4>
      <b>{{ $t('demo.demoHeading') }}</b>
    </h4>
    <!-- <div>(Default Hindi)</div> -->
    <div>
      <button @click="changeLanguage('en')">
        English
      </button>
      <button @click="changeLanguage('hi')">
        Hindi
      </button>
      <button @click="changeLanguage('mr')">
        Marathi
      </button>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$i18n.locale = 'hi'
  },
  methods: {
    changeLanguage (lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>

<style>
</style>

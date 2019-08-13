<template>
  <nuxt-link :to="to" :class="{'is-active': isActive}">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isActive() {
      debugger
      return this.to === this.$route.path
    }
  }
}
</script>

<style scoped>
  /*TODO: Get here color variables*/
  .is-active {
    border-bottom: 4px solid #4bacff;
    font-weight: bold;
  }
</style>

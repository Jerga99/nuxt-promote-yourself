<template>
  <div class="full-page-takeover-header">
    <div class="full-page-takeover-header-logo">
      <p class="full-page-takeover-header-logo-title">Promo Yourself</p>
    </div>
    <div class="full-page-takeover-header-divider">
    </div>
    <div class="full-page-takeover-header-text">
      {{title}}
    </div>
    <div class="user-box">
      <figure class="image is-48x48 m-r-sm">
        <img class="is-rounded" :src="user.avatar">
      </figure>
      <div class="m-r-sm m-b-sm">
        Welcome {{user.username}}!
      </div>
    </div>
    <slot name="actionMenu"></slot>
    <div v-if="exitLink" class="full-page-takeover-header-button">
      <nuxt-link
        :to="exitLink"
        class="button is-danger is-medium is-inverted is-outlined">
        Exit
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    exitLink: {
      required: false,
      type: String,
      default: null
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/authUser'] || {}
    }
  }
}
</script>
<style scoped>
  .user-box {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-right: 10px;
    font-size: 17px;
    font-weight: bold;
  }
</style>

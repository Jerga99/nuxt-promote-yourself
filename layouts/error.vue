<template>
  <div class="container">
    <ErrorView title="Ooooops, page you are trying to access doesn't exist :("
               :status="'404'"
               :navigateToPage="'/'"
               :navigateToText="'Navigate back Home'" />
  </div>
</template>

<script>
import ErrorView from '@/components/shared/ErrorView'
export default {
  components: {
    ErrorView
  }
}
</script>

<style scoped>
</style>

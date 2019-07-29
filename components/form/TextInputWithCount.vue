<template>
  <input
    :maxLength="maxLength"
    type="text"
    placeholder="e.g. Amazing Course in Flutter!"
    class="input is-large">
</template>

<script>
export default {
  props: {
   maxLength: {
    type: Number,
    default: 50,
    required: false
   }
  }
}
</script>

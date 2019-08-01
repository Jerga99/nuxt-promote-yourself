

<template>
  <i class="icon fas" :class="[`fa-${name}`, `icon-size-${size}`]"> </i>
</template>

<script>
export default {
  props: {
    name: {
      default: ''
    },
    size: {
      size: 'normal'
    }
  }
}
</script>

<style scoped lang="scss">
  .icon {
    &-size {
      &-small {
        font-size: 15px;
      }
      &-normal {
        font-size: 18px;
      }
      &-large {
        font-size: 21px;
      }
    }
  }
</style>

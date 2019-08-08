<template>
  <div class="dropdown" :class="{'is-active': isActive}">
    <div class="dropdown-trigger">
      <div
        @click="isActive = !isActive"
        aria-haspopup="true"
        aria-controls="dropdown-menu">
        <span></span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </div>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a v-for="(item, index) in items" :key="item.name"
           @click.prevent="emitOption(item.command)"
           class="dropdown-item">
          {{item.name}}
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    emitOption(command) {
      this.$emit('optionChanged', command)
    }
  }
}
</script>
<style scoped lang="scss">
  .dropdown-trigger {
    &:hover {
      cursor: pointer;
    }
  }
  i {
    font-size: 25px;
    align-self: end;
  }
</style>

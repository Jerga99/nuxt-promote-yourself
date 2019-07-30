<template>
  <div>
    <!-- Send a label through props -->
    <label class="label">{{label}}</label>
    <!-- Iterate lines here -->
    <div
      v-for="(line, index) in lines"
      :key="line.value"
      class="multi-field field">
      <div class="control multi-control">
        <div class="multi-input-container">
          <input
            @input="emitUpdate($event, index)"
            :value="line.value"
            placeholder="Add Something Nice (:"
            class="input is-medium multi-input"
            type="text">
        </div>
        <div class="btn-container">
          <!-- Delete the line -->
          <button
            @click.prevent="emitRemove(index)"
            type="button"
            class="button is-danger multi-button">
            Delete
          </button>
        </div>
      </div>
    </div>
    <!-- Add the Line -->
    <button
      @click="emitAdd"
      type="button"
      class="m-b-sm button is-medium is-link is-outlined">
      Add an answer
    </button>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    lines: {
      type: Array,
      required: true
    }
  },
  methods: {
    emitAdd() {
      this.$emit('addClicked')
    },
    emitRemove(index) {
      this.$emit('removeClicked', index)
    },
    emitUpdate(event, index) {
      const {value} = event.target
      this.$emit('valueUpdated', {value, index})
    }
  }
}
</script>

<style scoped lang="scss">
.multi-input {
  float: left;
  width: 100%;
}
.multi-button {
  height: inherit;
}
.multi-input-container {
  display: flex;
  flex: 1;
}
.btn-container {
  display: flex;
  opacity: 0;
}
.multi-control {
  display: flex;
  &:hover > .btn-container {
    opacity: 1;
  }
}
</style>

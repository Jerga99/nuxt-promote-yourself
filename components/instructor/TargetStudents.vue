<template>
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Target your Students</p>
    </header>
    <div class="card-content card-section">
      <form>
        <multi-line-text-input
          @addClicked="addLine('wsl')"
          @removeClicked="removeLine($event, 'wsl')"
          :lines="course.wsl"
          label="What will students learn"
        />
        <multi-line-text-input
          @addClicked="addLine('requirements')"
          @removeClicked="removeLine($event, 'requirements')"
          :lines="course.requirements"
          label="What are the requirements"
        />
      </form>
    </div>
  </div>
</template>
<script>
import MultiLineTextInput from '~/components/form/MultiLineTextInput'
export default {
  components: {
    MultiLineTextInput
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  methods: {
    addLine(field) {
      // Dispatch action to add line
      console.log('Adding line for: ', field)
    },
    removeLine(index, field) {
      // Dispatch action to remove line line
      console.log('Removing line of index:', index)
      console.log('Removing line for:', field)
    }
  }
}
</script>



















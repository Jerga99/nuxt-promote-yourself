<template>
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Target your Students</p>
    </header>
    <div class="card-content card-section">
      <form>
        <multi-line-text-input
          label="What will students learn"
          :lines="course.wsl"
        />
        <multi-line-text-input
          label="What are the requirements"
          :lines="course.requirements"
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
  }
}
</script>



















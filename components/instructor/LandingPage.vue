<template>
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Course Landing Page</p>
    </header>
    <div class="card-content card-section">
      <form>
        <div class="field">
          <label class="label">Course title</label>
          <div class="control">
            <input
              :value="course.title"
              @input="($event) => emitCourseValue($event, 'title')"
              class="input is-medium"
              type="text"
              placeholder="Dart and Flutter From Zero to Hero ">
          </div>
        </div>
        <div class="field">
          <label class="label">Course subtitle</label>
          <div class="control">
            <input
              :value="course.subtitle"
              @input="($event) => emitCourseValue($event, 'subtitle')"
              class="input is-medium"
              type="text"
              placeholder="Build real mobile Application for Android and iOS.">
          </div>
        </div>
        <div class="field">
          <label class="label">Course description</label>
          <div class="control">
            <!-- <textarea
              :value="course.description"
              @input="($event) => emitCourseValue($event, 'description')"
              class="textarea is-medium"
              type="text"
              placeholder="Write something catchy about the course">
            </textarea> -->
            <course-editor
              :initialContent="course.description"
              @editorUpdated="(content) => emitCourseValue(content, 'description')"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Category</label>
          <div class="select is-medium">
            <select
              :value="course.category._id"
              @change="($event) => emitCourseValue($event, 'category')"
            >
              <option
                v-for="category in categories"
                :key="category._id"
                :value="category._id">
                {{category.name}}
             </option>
            </select>
          </div>
        </div>
        <div class="field">
          <label class="label">Course Image</label>
          <div class="columns">
            <div class="column">
              <figure class="image is-4by2">
                <img
                  :src="course.image">
              </figure>
            </div>
            <div class="column centered">
              <div class="control">
                <input
                  :value="course.image"
                  @input="($event) => emitCourseValue($event, 'image')"
                  class="input is-medium"
                  type="text"
                  placeholder="https://images.unsplash.com/photo-1498837167922-ddd27525d352">
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Course Link</label>
          <div class="control">
            <input
              :value="course.productLink"
              @input="($event) => emitCourseValue($event, 'productLink')"
              class="input is-medium"
              type="text"
              placeholder="https://www.udemy.com/vue-js-2-the-full-guide-by-real-apps-vuex-router-node">
          </div>
        </div>
        <div class="field">
          <label class="label">Course Video Link</label>
          <div class="control">
            <input
              :value="course.promoVideoLink"
              @input="($event) => emitCourseValue($event, 'promoVideoLink')"
              class="input is-medium"
              type="text"
              placeholder="https://www.youtube.com/watch?v=WQ9sCAhRh1M">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import CourseEditor from '~/components/editor/CourseEditor'
export default {
  components: {
    CourseEditor
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  computed: {
    categories() {
      return this.$store.state.category.items
    }
  },
  methods: {
    emitCourseValue(e, field) {
      const value = e.target ? e.target.value : e

      if (field === 'category') {
        return this.emitCategory(value, field)
      }

      return this.$emit('courseValueUpdated', {value, field})
    },
    emitCategory(categoryId, field) {
      const foundCategory = this.categories.find(c => c._id === categoryId)
      this.$emit('courseValueUpdated', {value: foundCategory, field})
    }
  }
}
</script>











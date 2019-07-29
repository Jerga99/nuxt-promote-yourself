<template>
  <div class="course-create-wrapper">
    <div class="course-create-headerText">
      What category best fits the knowledge you'll share?
    </div>
    <h2 class="course-create-subtitle">If you're not sure about the right category, you can change it later.</h2>
    <form class="course-create-form">
      <div class="course-create-form-group">
        <div class="course-create-form-field">
          <div class="select is-large">
            <select @change="emitFormData">
              <option value="default">Select Category</option>
              <option
                v-for="category in categories"
                :key="category._id">
                {{category.name}}
              </option>
            </select>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      form: {
        category: ''
      }
    }
  },
  validations: {
    form: {
      category: {
        required
      }
    }
  },
  computed: {
    isValid() {
      return !this.$v.$invalid
    },
    categories() {
      return this.$store.state.category.items
    }
  },
  methods: {
    emitFormData() {
      debugger
      this.$emit('stepUpdated', {data: this.form, isValid: this.isValid})
    }
  }
}
</script>












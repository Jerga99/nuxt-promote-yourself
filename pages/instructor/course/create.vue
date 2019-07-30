<template>
  <div class="full-page-takeover-window">
    <div class="full-page-takeover-page">
      <Header
        :title="`Step ${activeStep} of ${stepsLength}`"
        exitLink="/instructor/courses" />
      <div class="full-page-takeover-header-bottom-progress">
        <div :style="{width: progress}"
             class="full-page-takeover-header-bottom-progress-highlight">
        </div>
      </div>
      <div class="course-create full-page-takeover-container">
        <div class="container">
        <keep-alive>
          <component
            :is="activeComponent"
            ref="activeComponent"
            @stepUpdated="mergeFormData"
          />
        </keep-alive>
        </div>
        <div class="full-page-footer-row">
          <div class="container">
            <div class="full-page-footer-col">
              <div v-if="!isFirstStep">
                <a
                  @click.prevent="_previousStep"
                  class="button is-large">Previous
                </a>
              </div>
              <div v-else class="empty-container">
              </div>
            </div>
            <div class="full-page-footer-col">
              <div>
                <button
                  v-if="!isLastStep"
                  @click.prevent="_nextStep"
                  :disabled="!canProceed"
                  class="button is-large float-right">
                  Continue
                </button>
                <button
                  v-else
                  :disabled="!canProceed"
                  @click="createCourse"
                  class="button is-success is-large float-right">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/shared/Header'
import CourseCreateStep1 from '~/components/instructor/CourseCreateStep1'
import CourseCreateStep2 from '~/components/instructor/CourseCreateStep2'
import MultiComponentMixin from '~/mixins/MultiComponentMixin'
export default {
  layout: 'instructor',
  components: {
    Header,
    CourseCreateStep1,
    CourseCreateStep2
  },
  mixins: [MultiComponentMixin],
  data() {
    return {
      steps: ['CourseCreateStep1', 'CourseCreateStep2'],
      canProceed: false,
      form: {
        title: '',
        category: ''
      }
    }
  },
  fetch({store}) {
    return store.dispatch('category/fetchCategories')
  },
  methods: {
    _nextStep() {
      this.nextStep()
      this.$nextTick(() => this.canProceed = this.$refs.activeComponent.isValid)
    },
    _previousStep() {
      this.previousStep()
      this.canProceed = true
    },
    mergeFormData({data, isValid}) {
      this.form = {...this.form, ...data}
      this.canProceed = isValid
    },
    createCourse() {
      this.$store.dispatch('instructor/course/createCourse', this.form)
        .then(_ => this.$router.push('/instructor/courses'))
    }
  }
}
</script>

<style lang="scss">
  .float-right {
    float: right;
  }
  .empty-container {
    width: 1px;
    height: 1px;
  }
  .course-create {
    &-wrapper {
      margin-top: 60px;
      text-align: center;
    }
    &-headerText {
      font-weight: 500;
      line-height: 1.1;
      margin-top: 21px;
      margin-bottom: 10.5px;
      font-size: 36px;
      font-weight: 300;
    }
    &-subtitle {
      font-size: 24px;
      font-weight: 300;
      margin-top: 21px;
      margin-bottom: 10.5px;
    }
    &-form {
      margin-top: 60px;
      &-group {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      &-field {
        min-width: 552px;
      }
      .select {
        width: 100%;
        >select {
          width: 100%;
        }
      }
    }
  }
</style>

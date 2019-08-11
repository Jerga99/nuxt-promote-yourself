<template>
  <div class="manage-page">
    <Header
      title="Some very nice course name"
      exitLink="/instructor/courses">
      <template #actionMenu>
        <div class="full-page-takeover-header-button">
          <button
            @click="updateCourse"
            :disabled="!canUpdateCourse"
            class="button is-primary is-inverted is-medium is-outlined">
            Save
          </button>
        </div>
        <div class="full-page-takeover-header-button">
          <Modal
            openTitle="Favorite"
            openBtnClass="button is-primary is-inverted is-medium is-outlined"
            title="Make Course Hero"
            @opened="applyCourseValues"
            @submitted="createCourseHero">
            <div>
              <form>
                <div class="field">
                  <label class="label">Hero title</label>
                  <span class="label-info">Suggested 64 Characters</span>
                  <div class="control">
                    <input
                      v-model="courseHero.title"
                      class="input is-medium"
                      type="text"
                      placeholder="Amazing course discount">
                  </div>
                </div>
                <div class="field">
                  <label class="label">Hero subtitle</label>
                  <span class="label-info">Suggested 128 Characters</span>
                  <input
                    v-model="courseHero.subtitle"
                    class="input is-medium"
                    type="text"
                    placeholder="Get all of the course for 9.99$">
                </div>
                <div class="field">
                  <label class="label">Hero image</label>
                  <span class="label-info">Image in format 3 by 1 (720 x 240)</span>
                  <input
                    v-model="courseHero.image"
                    class="input is-medium"
                    type="text"
                    placeholder="Some image in format 3 by 1 (720 x 240)">
                  <figure class="image is-3by1">
                    <img :src="courseHero.image">
                  </figure>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </template>
    </Header>
    <div class="course-manage">
      <div class="container">
        <div class="columns">
          <div class="column is-3 p-lg">
            <!-- <aside class="menu is-hidden-mobile"> -->
            <aside class="menu">
              <p class="menu-label">
                Course Editing
              </p>
              <ul class="menu-list">
                <li>
                  <!-- display TargetStudents -->
                  <a @click.prevent="navigateTo(1)"
                     :class="activeComponentClass(1)">Target Your Students
                  </a>
                </li>
                <li>
                  <!-- display LandingPage -->
                  <a
                    @click.prevent="navigateTo(2)"
                    :class="activeComponentClass(2)">
                    Course Landing Page
                  </a>
                </li>
              </ul>
              <p class="menu-label">
                Course Managment
              </p>
              <ul class="menu-list">
                <li>
                  <!-- display Price -->
                  <a
                    @click.prevent="navigateTo(3)"
                    :class="activeComponentClass(3)">
                    Price
                  </a>
                </li>
                <li>
                  <!-- display Status -->
                  <a
                    @click.prevent="navigateTo(4)"
                    :class="activeComponentClass(4)">
                    Status
                  </a>
                </li>
              </ul>
            </aside>
          </div>
          <div class="column">
            <keep-alive>
              <component
                @courseValueUpdated="handleCourseUpdate"
                :is="activeComponent"
                :course="course"
              />
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '~/components/shared/Modal'
import Header from '~/components/shared/Header'
import LandingPage from '~/components/instructor/LandingPage'
import TargetStudents from '~/components/instructor/TargetStudents'
import Price from '~/components/instructor/Price'
import Status from '~/components/instructor/Status'
import MultiComponentMixin from '~/mixins/MultiComponentMixin'
import { mapState } from 'vuex'
export default {
  layout: 'instructor',
  components: {
    Header,
    LandingPage,
    TargetStudents,
    Price,
    Status,
    Modal
  },
  mixins: [MultiComponentMixin],
  data() {
    return {
      steps: ['TargetStudents', 'LandingPage', 'Price', 'Status'],
      courseHero: {}
    }
  },
  async fetch({store, params}) {
    await store.dispatch('instructor/course/fetchCourseById', params.id)
    await store.dispatch('category/fetchCategories')
  },
  computed: {
    ...mapState({
      course: ({instructor}) => instructor.course.item,
      canUpdateCourse: ({instructor}) => instructor.course.canUpdateCourse
    })
  },
  methods: {
    updateCourse() {
      this.$store.dispatch('instructor/course/updateCourse')
        .then(_ => this.$toasted.success('Course has been succefuly updated!', {duration: 3000}))
        .catch(error => this.$toasted.error('Course cannot be updated!'), {duration: 3000})
    },
    createCourseHero({closeModal}) {
      const heroData = {...this.courseHero}
      heroData.product = {...this.course}
      this.$store.dispatch('hero/createHero', heroData)
        .then(() => {
          closeModal()
          this.$toasted.success('Course Hero was created!', {duration: 3000})
        })
    },
    handleCourseUpdate({value, field}) {
      this.$store.dispatch('instructor/course/updateCourseValue', {field, value})
    },
    applyCourseValues() {
      // !this.courseHero.title && this.$set(this.courseHero, 'title', this.course.title)
      // !this.courseHero.subtitle && this.$set(this.courseHero, 'subtitle', this.course.subtitle)
      this.$set(this.courseHero, 'title', this.course.title)
      this.$set(this.courseHero, 'subtitle', this.course.subtitle)
      this.$set(this.courseHero, 'image', this.course.image)
    }
  }
}
</script>

<style lang="scss">
  .manage-page {
    .label-info {
      font-size: 13px;
      color: gray;
      font-style: italic;
    }
    .course-manage {
      padding-top: 40px;
      .menu {
        padding-top: 30px;
        &-label {
          font-size: 20px;
          color: black;
        }
        &-list {
          >li {
            font-size: 18px;
            margin-top: 10px;
            > a {
              &.is-active {
                border-left: 3px solid #58529f;
                background-color: transparent;
                color: inherit;
              }
            }
          }
        }
      }
      .card {
        &-section {
          padding: 40px;
        }
        &-header {
          &-title {
            padding: 0;
            color: #8F99A3;
            font-weight: 400;
            font-size: 25px;
          }
        }
      }
    }
  }
</style>

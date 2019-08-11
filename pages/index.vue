<template>
  <div>
    <hero />
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Courses</h1>
        <div class="columns is-multiline">
          <!-- iterate columns with v-for and don't forget :key -->
          <div
            v-for="course in courses"
            :key="course._id"
            class="column is-one-quarter">
            <!-- pass a course as a prop to course-card -->
            <course-card :course="course"/>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Articles</h1>
        <div class="columns is-multiline">
          <div v-for="blog in featuredBlogs" class="column is-one-quarter">
            <blog-card
              :key="blog._id"
              :blog="blog"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CourseCard from '~/components/CourseCard'
import BlogCard from '~/components/BlogCard'
import Hero from '~/components/shared/Hero'
import { mapState } from 'vuex'
export default {
  components: {
    CourseCard, BlogCard, Hero
  },
  computed: {
    ...mapState({
      courses: state => state.course.items,
      featuredBlogs: state => state.blog.items.featured,
    })
  },
  async fetch({store}) {
    await store.dispatch('course/fetchCourses')
    await store.dispatch('blog/fetchFeaturedBlogs', {'filter[featured]': true})
  }
}
</script>

<style scoped lang="scss">

  // Home page
  .links {
    padding-top: 15px;
  }
</style>

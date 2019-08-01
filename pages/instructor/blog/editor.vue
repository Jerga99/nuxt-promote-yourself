<template>
  <div>
    <Header
      title="Write your Blogs"
      exitLink="/instructor/blogs"
    />
    <div class="blog-editor-container">
      <div class="container">
        <editor @editorUpdated="saveBlog"/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/shared/Header'
import Editor from '~/components/editor'
export default {
  layout: 'instructor',
  components: {
    Header, Editor
  },
  methods: {
    saveBlog(blogData) {
      this.$store.dispatch('instructor/blog/createBlog', blogData)
        .then(blog => this.$router.push(`/instructor/blog/${blog._id}/edit`))
    }
  }
}
</script>
<style lang="scss">

</style>









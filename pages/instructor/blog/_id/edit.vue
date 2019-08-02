<template>
  <!-- Finish handling of URL -->
  <div>
    <Header
      title="Write your blog"
      exitLink="/instructor/blogs">
      <!-- TODO: Check if blog status is active -->
      <template v-if="blog.status === 'active'" #actionMenu>
        <div class="full-page-takeover-header-button">
          <Modal
            @submitted="updateBlogStatus($event, 'published')"
            @opened="checkBlogValidity"
            openTitle="Publish"
            openBtnClass="button is-success is-medium is-inverted is-outlined"
            title="Review Details">
            <div>
              <div class="title">Once you publish blog you cannot change url to a blog.</div>
              <!-- Check for error -->
              <div v-if="!publishError">
                <div class="subtitle">This is how url to blog post will look like after publish:</div>
                <article class="message is-success">
                  <div class="message-body">
                    <strong>{{getCurrentUrl()}}/blogs/{{slug}}</strong>
                  </div>
                </article>
              </div>
              <article v-else class="message is-danger">
                <div class="message-body">
                  {{publishError}}
                </div>
              </article>
            </div>
          </Modal>
        </div>
      </template>
      <template v-else #actionMenu>
        <div class="full-page-takeover-header-button">
          <Modal
            @submitted="updateBlogStatus($event, 'active')"
            openTitle="Unpublish"
            openBtnClass="button is-success is-medium is-inverted is-outlined"
            title="Unpublish Blog">
            <div>
              <div class="title">Unpublish blog so it's no longer displayed in blogs page</div>
            </div>
          </Modal>
        </div>
      </template>
    </Header>
    <div class="blog-editor-container">
      <div class="container">
        <editor
          @editorMounted="initBlogContent"
          @editorUpdated="updateBlog"
          :isSaving="isSaving"
          ref="editor"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Editor from '~/components/editor'
import Header from '~/components/shared/Header'
import Modal from '~/components/shared/Modal'
import { mapState } from 'vuex'
import slugify from 'slugify'

// slug is something like unique ID but in readable format
export default {
  layout: 'instructor',
  components: {
    Editor, Header, Modal
  },
  data() {
    return {
      publishError: '',
      slug: ''
    }
  },
  computed: {
    ...mapState({
      blog: ({instructor}) => instructor.blog.item,
      isSaving: ({instructor}) => instructor.blog.isSaving
    }),
    editor() {
      return this.$refs.editor
    }
  },
  async fetch({params, store}) {
    await store.dispatch('instructor/blog/fetchBlogById', params.id)
  },
  methods: {
    // TODO: fix color scheme of code block in editor!
    initBlogContent(initContent) {
      if (this.blog && this.blog.content) {
        initContent(this.blog.content)
      }
    },
    updateBlog(blogData) {
      if (!this.isSaving) {
        this.$store.dispatch('instructor/blog/updateBlog', {data: blogData, id: this.blog._id})
        .then(_ => this.$toasted.success('Blog Updated!', {duration: 2000}))
        .catch(error => this.$toasted.error('Blog cannot be saved!', {duration: 2000}))
      }
    },
    updateBlogStatus({closeModal}, status) {
      const blogContent = this.editor.getContent()
      blogContent.status = status

      const message = status === 'published' ? 'Blog has been published!' : 'Blog has been un-published!'

      this.$store.dispatch('instructor/blog/updateBlog', {data: blogContent, id: this.blog._id})
        .then(_ => {
          this.$toasted.success(message, {duration: 3000})
          closeModal()
        })
        .catch(error => this.$toasted.error('Blog cannot be published!', {duration: 3000}))
    },
    checkBlogValidity() {
      const title = this.editor.getNodeValueByName('title')
      this.publishError = ''
      this.slug = ''

      if (title && title.length > 24) {
        this.slug = this.slugify(title)
      } else {
        this.publishError = 'Cannot publish! Title needs to be longer than 24 characters!'
      }
    },
    getCurrentUrl() {
      // process.client will return true if we are in browser environment
      return process.client && window.location.origin
    },
    slugify(text) {
      return slugify(text, {
        replacement: '-',
        remove: null,
        lower: true
      })
    }
  }
}
</script>

















<template>
  <div class="editor editor-squished">
    <editor-content
      class="edito__content"
      :editor="editor"
    />
  </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import { Heading } from 'tiptap-extensions'
export default {
  components: {
    EditorContent
  },
  data() {
    return {
      editor: null
    }
  },
  // This is called only on client (in browser)
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Heading({ levels: [1, 2, 3]})
      ]
    })
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor && this.editor.destroy()
  }
}
</script>










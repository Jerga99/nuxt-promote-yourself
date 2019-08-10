<template>
  <div class="editor editor-squished">
    <editor-content
      class="editor__content"
      :editor="editor"
    />
  </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import {
  Heading,
  Bold,
  Code,
  Italic,
  Strike,
  Underline,
  Blockquote,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  CodeBlockHighlight
} from 'tiptap-extensions'

import Title from '~/components/editor/components/Title'
import Subtitle from '~/components/editor/components/Subtitle'
import Doc from '~/components/editor/components/Doc'

import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'

export default {
  components: {
    EditorContent
  },
  props: {
    initialContent: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      editor: null
    }
  },
  // This is called only on client (in browser)
  mounted() {
    this.editor = new Editor({
      editable: false,
      extensions: [
        new Doc(),
        new Title(),
        new Subtitle(),
        new Heading({ levels: [1, 2, 3]}),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new Blockquote(),
        new HorizontalRule(),
        new OrderedList(),
        new BulletList(),
        new ListItem(),
        new CodeBlockHighlight({
          languages: {
            javascript,
            css,
          }
        })
      ]
    })

    this.initialContent && this.editor.setContent(this.initialContent)
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor && this.editor.destroy()
  }
}
</script>








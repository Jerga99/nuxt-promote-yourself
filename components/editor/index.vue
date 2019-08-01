<template>
  <div class="editor editor-squished">
    <basic-menu :editor="editor">
      <template #saveButton>
        <button
          @click="emitUpdate"
          class="button is-success button-save">
          Save
        </button>
      </template>
    </basic-menu>
    <bubble-menu :editor="editor" />
    <editor-content
      class="editor__content"
      :editor="editor"
    />
  </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import BubbleMenu from '~/components/editor/BubbleMenu'
import BasicMenu from '~/components/editor/BasicMenu'
import {
  Heading,
  Bold,
  Code,
  Italic,
  Strike,
  Underline,
  History,
  Blockquote,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  CodeBlockHighlight,
  Placeholder
} from 'tiptap-extensions'

import Title from '~/components/editor/components/Title'
import Subtitle from '~/components/editor/components/Subtitle'
import Doc from '~/components/editor/components/Doc'

import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'

export default {
  components: {
    EditorContent,
    BubbleMenu,
    BasicMenu
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
        new Doc(),
        new Title(),
        new Subtitle(),
        new Placeholder({
          showOnlyCurrent: false,
          emptyNodeText: node => {
            if (node.type.name === 'title') {
              return 'Inspirational Title'
            }

            if (node.type.name === 'subtitle') {
              return 'Some catchy subtitle'
            }

            return 'Write your story...'
          }
        }),
        new Heading({ levels: [1, 2, 3]}),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
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
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor && this.editor.destroy()
  },
  methods: {
    emitUpdate() {
      const html = this.editor.getHTML()
      const title = this.getNodeValueByName('title')
      const subtitle = this.getNodeValueByName('subtitle')

      this.$emit('editorUpdated', {content: html, title, subtitle})
    },
    getNodeValueByName(name) {
      const docContent = this.editor.state.doc.content
      const nodes = docContent.content
      const node = nodes.find(n => n.type.name === name)

      if (!node) return ''

      return node.textContent
    }
  }
}
</script>

<style scoped lang="scss">
  .button-save {
    float: right;
    background-color: #23d160;
    &:hover {
      background-color: #2bc76c;
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
</style>









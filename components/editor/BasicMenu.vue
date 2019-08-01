<template>
  <editor-menu-bar
    :editor="editor"
    v-slot="{ commands, isActive }">
    <div class="menubar">
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.bullet_list() }"
        @click="commands.bullet_list">
        <icon name="list-ul" size="large" />
      </button>
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.ordered_list() }"
        @click="commands.ordered_list">
        <icon name="list-ol" size="large" />
      </button>
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.blockquote() }"
        @click="commands.blockquote">
        <icon name="quote-right" size="large" />
      </button>
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.code_block() }"
        @click="commands.code_block">
        <icon name="file-code" size="large" />
      </button>
      <button
        class="menubar__button"
        @click="commands.horizontal_rule">
        <icon name="ruler-horizontal" size="large" />
      </button>
      <button
        class="menubar__button"
        @click="commands.undo">
        <icon name="undo-alt" size="large" />
      </button>
      <button
        class="menubar__button"
        @click="commands.redo">
        <icon name="redo" size="large" />
      </button>
      <slot name="saveButton"></slot>
    </div>
  </editor-menu-bar>
</template>
<script>
import { EditorMenuBar } from 'tiptap'
import Icon from '~/components/shared/Icon'
export default {
  components: {EditorMenuBar, Icon},
  props: {
    editor: Object
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

<template>
  <editor-menu-bubble
    :editor="editor"
    :keep-in-bounds="keepInBounds"
    v-slot="{ commands, isActive, menu }">
    <div
      class="menububble"
      :class="{ 'is-active': menu.isActive }"
      :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
    >
      <button
        class="menububble__button"
        :class="{ 'is-active': isActive.bold() }"
        @click="commands.bold()"
      >
        <icon name="bold" size="small" />
      </button>
      <button
        class="menububble__button"
        :class="{ 'is-active': isActive.italic() }"
        @click="commands.italic()"
      >
        <icon name="italic" size="small" />
      </button>
      <button
        class="menububble__button"
        :class="{ 'is-active': isActive.code() }"
        @click="commands.code()"
      >
        <icon name="code" size="small" />
      </button>
      <button
        class="menububble__button"
        :class="{ 'is-active': isActive.strike() }"
        @click="commands.strike()"
      >
        <icon name="strikethrough" size="small" />
      </button>
      <button
        class="menububble__button"
        :class="{ 'is-active': isActive.underline() }"
        @click="commands.underline()"
      >
        <icon name="underline" size="small" />
      </button>
      <button
        class="menububble__button"
        :class="{ 'is-active': isActive.heading({ level: 1}) }"
        @click="commands.heading({ level: 1})"
      >
        H1
      </button>

      <button
        class="menububble__button"
        :class="{ 'is-active': isActive.heading({ level: 2}) }"
        @click="commands.heading({ level: 2})"
      >
        H2
      </button>

      <button
        class="menububble__button"
        :class="{ 'is-active': isActive.heading({ level: 3}) }"
        @click="commands.heading({ level: 3})"
      >
        H3
      </button>
      <button
        class="menububble__button"
        :class="{ 'is-active': isActive.paragraph() }"
        @click="commands.paragraph()"
      >
        <icon name="paragraph" size="small" />
      </button>
    </div>
  </editor-menu-bubble>
</template>

<script>
import { EditorMenuBubble } from 'tiptap'
import Icon from '~/components/shared/Icon'
export default {
  components: {
    EditorMenuBubble,
    Icon
  },
  props: {
    editor: {
      type: Object
    }
  },
  data() {
    return {
      keepInBounds: true
    }
  }
}
</script>









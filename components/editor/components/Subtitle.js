import { Node } from 'tiptap'

export default class Subtitle extends Node {

  get name() {
    return 'subtitle'
  }

  get schema() {
    return {
      content: 'inline*',
      // define how the editor detects your node from pasted HTML
      parseDOM: [{
        tag: 'h2',
      }],
      // this is how this node will be rendered
      toDOM: () => ['h2', { class: 'subtitle' }, 0],
    }
  }

}

<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <span v-for="actionName in activeButtons" :key="actionName">
          <button
            v-if="actionName === 'bold'"
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <icon name="bold" />
          </button>
          <button
            v-if="actionName === 'italic'"
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <icon name="italic" />
          </button>
          <button
            v-if="actionName === 'strike'"
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <icon name="strike" />
          </button>
          <button
            v-if="actionName === 'underline'"
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <icon name="underline" />
          </button>
          <button
            v-if="actionName === 'code'"
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <icon name="code" />
          </button>
          <button
            v-if="actionName === 'paragraph'"
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <icon name="paragraph" />
          </button>
          <button
            v-if="actionName === 'h1'"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            H1
          </button>
          <button
            v-if="actionName === 'h2'"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>

          <button
            v-if="actionName === 'h3'"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>

          <button
            v-if="actionName === 'bullet_list'"
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <icon name="ul" />
          </button>

          <button
            v-if="actionName === 'ordered_list'"
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <icon name="ol" />
          </button>

          <button
            v-if="actionName === 'blockquote'"
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <icon name="quote" />
          </button>

          <button
            v-if="actionName === 'code_block'"
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <icon name="code" />
          </button>

          <button
            v-if="actionName === 'horizontal_rule'"
            class="menubar__button"
            @click="commands.horizontal_rule"
          >
            <icon name="hr" />
          </button>

          <button v-if="actionName === 'undo'" class="menubar__button" @click="commands.undo">
            <icon name="undo" />
          </button>

          <button v-if="actionName === 'redo'" class="menubar__button" @click="commands.redo">
            <icon name="redo" />
          </button>
        </span>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import Icon from '../icon'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    Icon
  },
  created() {
    this.html = this.editor.getHTML()
    this.json = this.editor.getJSON()
    this.editor.on('update', () => {
      this.html = this.editor.getHTML()
      this.json = this.editor.getJSON()
      this.$emit('update', this.html)
    })
  },
  props: {
    initialContent: {
      type: String,
      required: true,
      default: '<em>Ingresa descripcion...</em>',
    },
    activeButtons: {
      type: Array,
      validator: function (list) {
        for (let el of list) {
          // The value must match one of these strings
          if (
            [
              'bold',
              'italic',
              'strike',
              'underline',
              'code',
              'paragraph',
              'h1',
              'h2',
              'h3',
              'bullet_list',
              'ordered_list',
              'blockquote',
              'code_block',
              'horizontal_rule',
              'undo',
              'redo',
            ].indexOf(el) === -1
          ) {
            return -1
          }
        }
        return 1
      },
      default: () => ['bold', 'italic'],
    },
  },
  data() {
    return {
      html: '',
      json: '',
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: this.initialContent,
      }),
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  watch: {
    initialContent: function() {
      this.editor.destroy()
      this.editor = new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: this.initialContent,
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #000000;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;
    background-color: rgba(#000000, 0.1);

    &:hover {
      background-color: rgba(#000000, 0.15);
    }
  }
  .menubar {

    margin-bottom: 1rem;
    transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

    &.is-hidden {
      visibility: hidden;
      opacity: 0;
    }

    &.is-focused {
      visibility: visible;
      opacity: 1;
      transition: visibility 0.2s, opacity 0.2s;
    }

    &__button {
      vertical-align: middle;
      width: 1.8rem;
      height: 1.2rem;
      font-weight: bold;
      display: inline-flex;
      background: transparent;
      border: 0;
      color: #000000;
      padding: 0.2rem 0.5rem;
      margin-right: 0.2rem;
      border-radius: 3px;
      cursor: pointer;

      &:hover {
        background-color: rgba(#000000, 0.05);
      }

      &.is-active {
        background-color: rgba(#000000, 0.1);
      }
    }

    span#{&}__button {
      font-size: 13.3333px;
    }
  }
  .editor {
    position: relative;
    max-width: 30rem;
    margin: 0 auto 5rem auto;

    &__content {

      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-word;

      * {
        caret-color: currentColor;
      }

      pre {
        padding: 0.7rem 1rem;
        border-radius: 5px;
        background: #000000;
        color: #ffffff;
        font-size: 0.8rem;
        overflow-x: auto;

        code {
          display: block;
        }
      }

      p code {
        padding: 0.2rem 0.4rem;
        border-radius: 5px;
        font-size: 0.8rem;
        font-weight: bold;
        background: rgba(#000000, 0.1);
        color: rgba(#000000, 0.8);
      }

      ul,
      ol {
        padding-left: 1rem;
      }

      li > p,
      li > ol,
      li > ul {
        margin: 0;
      }

      a {
        color: inherit;
      }

      blockquote {
        border-left: 3px solid rgba(#000000, 0.1);
        color: rgba(#000000, 0.8);
        padding-left: 0.8rem;
        font-style: italic;

        p {
          margin: 0;
        }
      }

      img {
        max-width: 100%;
        border-radius: 3px;
      }

      table {
        border-collapse: collapse;
        table-layout: fixed;
        width: 100%;
        margin: 0;
        overflow: hidden;

        td, th {
          min-width: 1em;
          border: 2px solid #dddddd;
          padding: 3px 5px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
          > * {
            margin-bottom: 0;
          }
        }

        th {
          font-weight: bold;
          text-align: left;
        }

        .selectedCell:after {
          z-index: 2;
          position: absolute;
          content: "";
          left: 0; right: 0; top: 0; bottom: 0;
          background: rgba(200, 200, 255, 0.4);
          pointer-events: none;
        }

        .column-resize-handle {
          position: absolute;
          right: -2px; top: 0; bottom: 0;
          width: 4px;
          z-index: 20;
          background-color: #adf;
          pointer-events: none;
        }
      }

      .tableWrapper {
        margin: 1em 0;
        overflow-x: auto;
      }

      .resize-cursor {
        cursor: ew-resize;
        cursor: col-resize;
      }

    }
  }
</style>

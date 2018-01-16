import markdown from 'markdown-in-js'
import fetch from 'isomorphic-fetch'
import React from 'react'
import FileIcon from '../../file-icon'

// FIXME: https://github.com/JedWatson/react-codemirror/issues/106
//   react-codemirror2 also had a curosr position problem when tested
import CodeMirror from '@skidding/react-codemirror'

import Section, { components } from '../../section'
import { Code, InlineCode } from '../../../text/code'
import Button from '../../../button'
import Now from '../../../now/now'

const CodeMirrorInstance =
  typeof window !== 'undefined' ? require('codemirror') : null

const FILES = {
  'index.js': `const { Server } = require('http')
const bunny = require('sign-bunny')

const server = Server((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end(bunny('Hi there!'))
})

server.listen()`,
  'package.json': `{
  "name": "my-instant-deployment",
  "dependencies": {
    "sign-bunny": "1.0.0"
  },
  "scripts": {
    "start": "node index"
  }
}`
}

function Preview(props) {
  return (
    <div className="preview">
      <Code syntax="shell">{`curl -X POST https://api.zeit.co/v2/now/deployments \\
-H 'Authorization: Bearer $TOKEN' \\
-d '${(props.content || '').replace(/'/g, "\\'")}'`}</Code>
      {props.errorMessage
        ? <div className="error-message" key="2">
            <span /> {props.errorMessage}.
          </div>
        : null}
      <div className="centered">
        <Button darkBg onClick={props.deploy} disabled={!!props.deploying}>
          DEPLOY NOW
        </Button>
      </div>
      <p>
        You can <InlineCode>curl</InlineCode> the URL or click on DEPLOY NOW to
        see it live
      </p>

      <style jsx>{`
        .preview {
          margin: 0 -20px;
        }
        .centered {
          text-align: center;
        }
        .error-message {
          color: red;
          font-size: 12px;
          width: 100%;
          text-align: center;
          margin-bottom: 15px;
        }
        .error-message span {
          position: relative;

          padding-left: 20px;
        }
        .error-message span::before {
          display: block;
          content: "";
          width: 11px;
          background: red;
          height: 11px;
          position: absolute;
          left: 0;
          top: 1px;
        }
        p {
          color: white;
          font-size: 12px;
          text-align: center;
          margin: 25px 0;
        }
        p :global(code) {
          color: #50e3c2;
        }
        @media screen and (max-width: 700px) {
          .preview {
            margin: 0;
          }
        }
      `}</style>
    </div>
  )
}

Preview.defaultProps = {
  files: FILES,
  errorMessage: null,
  deploying: false
}

class Editor extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      deploying: false,
      selectedFilename: 'index.js',
      vimMode: false
    }
    this.codeMirror = null
  }

  onEscape = () => {
    if (!this.state.vimMode) {
      this.setState({ vimMode: true })
    }
  }

  onChange = content => {
    const files = {
      ...this.props.files,
      [this.state.selectedFilename]: content
    }
    this.props.onChange(files)
  }

  onFilenameClick = e => {
    const { filename: selectedFilename } = e.currentTarget.dataset
    this.setState({ selectedFilename })
  }

  componentDidMount() {
    const editor = this.codeMirror.getCodeMirror()
    const charWidth = editor.defaultCharWidth()
    const basePadding = 4
    editor.on('renderLine', (cm, line, elt) => {
      const off =
        CodeMirrorInstance.countColumn(
          line.text,
          null,
          cm.getOption('tabSize')
        ) * charWidth
      elt.style.textIndent = `-${off}px`
      elt.style.paddingLeft = basePadding + off + 'px'
    })
    editor.refresh()
  }

  render() {
    const { selectedFilename } = this.state

    return (
      <div className="demo">
        {typeof navigator != 'undefined'
          ? (() => {
              const opts = {
                lineNumbers: true,
                lineWrapping: true,
                mode: 'javascript',
                tabSize: 2,
                theme: 'neo'
              }

              if (this.state.vimMode) {
                opts.keyMap = 'vim'
                opts.extraKeys = { Esc: null }
              } else {
                opts.extraKeys = {
                  Esc: this.onEscape
                }
              }

              opts.extraKeys.Tab = function indent(cm) {
                const spaces = Array(cm.getOption('indentUnit') + 1).join(' ')
                cm.replaceSelection(spaces)
              }

              require('codemirror/mode/javascript/javascript')
              require('codemirror/keymap/vim')

              return [
                <div className="code" key="0">
                  <div className="header">
                    <div className="icons">
                      <span className="icon close" />
                      <span className="icon minimize" />
                      <span className="icon fullScreen" />
                    </div>
                    <div className="title">Editor</div>
                  </div>
                  <div className="main">
                    <ul className="file-tree">
                      {Object.keys(FILES).map(filename => {
                        return (
                          <li
                            key={filename}
                            className={
                              'file' +
                              (filename === selectedFilename ? ' selected' : '')
                            }
                            data-filename={filename}
                            onClick={this.onFilenameClick}
                          >
                            <FileIcon />
                            <span className="filename">
                              {filename}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                    <div className="file-content">
                      <CodeMirror
                        codeMirrorInstance={CodeMirrorInstance}
                        value={this.props.files[selectedFilename]}
                        onChange={this.onChange}
                        options={opts}
                        ref={ref => (this.codeMirror = ref)}
                      />
                    </div>
                  </div>
                </div>,
                <p className="note" key="1">
                  Edit the code however you like! Press esc to enter vim mode.
                </p>
              ]
            })()
          : null}

        <style jsx global>{`
          /* BASICS */

          .CodeMirror {
            /* Set height, width, borders, and global font properties here */
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
              serif;
            font-size: 12px;
            line-height: 16px;
            height: 326px;
            padding: 10px 20px 20px 20px;
            color: black;
          }

          /* PADDING */

          .CodeMirror-lines {
            padding: 4px 0; /* Vertical padding around content */
          }
          .CodeMirror pre {
            padding: 0 4px; /* Horizontal padding of content */
          }

          .CodeMirror-scrollbar-filler,
          .CodeMirror-gutter-filler {
            background-color: white; /* The little square between H and V scrollbars */
          }

          /* GUTTER */

          .CodeMirror-gutters {
            border-right: 1px solid #ddd;
            background-color: #f7f7f7;
            white-space: nowrap;
          }
          .CodeMirror-linenumbers {
          }
          .CodeMirror-linenumber {
            padding: 0 3px 0 5px;
            min-width: 20px;
            text-align: right;
            color: #999;
            white-space: nowrap;
          }

          .CodeMirror-guttermarker {
            color: black;
          }
          .CodeMirror-guttermarker-subtle {
            color: #999;
          }

          /* CURSOR */

          .CodeMirror-cursor {
            border-left: 1px solid black;
            border-right: none;
            width: 0;
          }
          /* Shown when moving in bi-directional text */
          .CodeMirror div.CodeMirror-secondarycursor {
            border-left: 1px solid silver;
          }
          .cm-fat-cursor .CodeMirror-cursor {
            width: auto;
            border: 0;
            background: #7e7;
          }
          .cm-fat-cursor div.CodeMirror-cursors {
            z-index: 1;
          }

          .cm-animate-fat-cursor {
            width: auto;
            border: 0;
            -webkit-animation: blink 1.06s steps(1) infinite;
            -moz-animation: blink 1.06s steps(1) infinite;
            animation: blink 1.06s steps(1) infinite;
            background-color: #7e7;
          }
          @-moz-keyframes blink {
            0% {
            }
            50% {
              background-color: transparent;
            }
            100% {
            }
          }
          @-webkit-keyframes blink {
            0% {
            }
            50% {
              background-color: transparent;
            }
            100% {
            }
          }
          @keyframes blink {
            0% {
            }
            50% {
              background-color: transparent;
            }
            100% {
            }
          }

          /* Can style cursor different in overwrite (non-insert) mode */
          .CodeMirror-overwrite .CodeMirror-cursor {
          }

          .cm-tab {
            display: inline-block;
            text-decoration: inherit;
          }

          .CodeMirror-ruler {
            border-left: 1px solid #ccc;
            position: absolute;
          }

          /* DEFAULT THEME */

          .cm-s-default .cm-header {
            color: blue;
          }
          .cm-s-default .cm-quote {
            color: #090;
          }
          .cm-negative {
            color: #d44;
          }
          .cm-positive {
            color: #292;
          }
          .cm-header,
          .cm-strong {
            font-weight: bold;
          }
          .cm-em {
            font-style: italic;
          }
          .cm-link {
            text-decoration: underline;
          }
          .cm-strikethrough {
            text-decoration: line-through;
          }

          .cm-s-default .cm-keyword {
            color: #708;
          }
          .cm-s-default .cm-atom {
            color: #219;
          }
          .cm-s-default .cm-number {
            color: #164;
          }
          .cm-s-default .cm-def {
            color: #00f;
          }
          .cm-s-default .cm-variable,
          .cm-s-default .cm-punctuation,
          .cm-s-default .cm-property,
          .cm-s-default .cm-operator {
          }
          .cm-s-default .cm-variable-2 {
            color: #05a;
          }
          .cm-s-default .cm-variable-3 {
            color: #085;
          }
          .cm-s-default .cm-comment {
            color: #a50;
          }
          .cm-s-default .cm-string {
            color: #a11;
          }
          .cm-s-default .cm-string-2 {
            color: #f50;
          }
          .cm-s-default .cm-meta {
            color: #555;
          }
          .cm-s-default .cm-qualifier {
            color: #555;
          }
          .cm-s-default .cm-builtin {
            color: #30a;
          }
          .cm-s-default .cm-bracket {
            color: #997;
          }
          .cm-s-default .cm-tag {
            color: #170;
          }
          .cm-s-default .cm-attribute {
            color: #00c;
          }
          .cm-s-default .cm-hr {
            color: #999;
          }
          .cm-s-default .cm-link {
            color: #00c;
          }

          .cm-s-default .cm-error {
            color: #f00;
          }
          .cm-invalidchar {
            color: #f00;
          }

          .CodeMirror-composing {
            border-bottom: 2px solid;
          }

          /* Color scheme */

          .cm-s-neo.CodeMirror {
            background-color: transparent;
            color: #666;
          }
          .cm-s-neo .cm-comment {
            color: #75787b;
          }
          .cm-s-neo .cm-keyword,
          .cm-s-neo .cm-property {
            color: #999;
          }
          .cm-s-neo .cm-atom,
          .cm-s-neo .cm-number {
            color: #75438a;
          }
          .cm-s-neo .cm-node,
          .cm-s-neo .cm-tag {
            color: #9c3328;
          }
          .cm-s-neo .cm-string {
            color: #000;
          }
          .cm-s-neo .cm-variable,
          .cm-s-neo .cm-qualifier {
            color: #555;
          }

          /* Editor styling */

          .cm-s-neo pre {
            padding: 0;
          }

          .cm-s-neo .CodeMirror-gutters {
            border: none;
            border-right: 10px solid transparent;
            background-color: #fff;
          }

          .cm-s-neo .CodeMirror-linenumber {
            padding: 0;
            color: #e0e2e5;
          }

          .cm-s-neo .CodeMirror-guttermarker {
            color: #1d75b3;
          }
          .cm-s-neo .CodeMirror-guttermarker-subtle {
            color: #e0e2e5;
          }

          /* Default styles for common addons */

          div.CodeMirror span.CodeMirror-matchingbracket {
            color: #0f0;
          }
          div.CodeMirror span.CodeMirror-nonmatchingbracket {
            color: #f22;
          }
          .CodeMirror-matchingtag {
            background: rgba(255, 150, 0, .3);
          }
          .CodeMirror-activeline-background {
            background: #e8f2ff;
          }

          /* ZEIT-specific styles! */

          .cm-fat-cursor .CodeMirror-cursor {
            background: rgba(248, 28, 229, 1);
          }

          /* STOP */

          /* The rest of this file contains styles related to the mechanics of
         the editor. You probably shouldn't touch them. */

          .CodeMirror {
            position: relative;
            overflow: hidden;
            background: white;
          }

          .CodeMirror-scroll {
            overflow: scroll !important; /* Things will break if this is overridden */
            /* 30px is the magic margin used to hide the element's real scrollbars */
            /* See overflow: hidden in .CodeMirror */
            margin-bottom: -30px;
            margin-right: -30px;
            padding-bottom: 30px;
            height: 278px;
            outline: none; /* Prevent dragging from highlighting the element */
            position: relative;
          }
          .CodeMirror-sizer {
            position: relative;
            border-right: 30px solid transparent;
          }

          /* The fake, visible scrollbars. Used to force redraw during scrolling
         before actual scrolling happens, thus preventing shaking and
         flickering artifacts. */
          .CodeMirror-vscrollbar,
          .CodeMirror-hscrollbar,
          .CodeMirror-scrollbar-filler,
          .CodeMirror-gutter-filler {
            position: absolute;
            z-index: 6;
            display: none;
          }
          .CodeMirror-vscrollbar {
            right: 0;
            top: 0;
            overflow-x: hidden;
            overflow-y: scroll;
          }
          .CodeMirror-hscrollbar {
            bottom: 0;
            left: 0;
            overflow-y: hidden;
            overflow-x: scroll;
          }
          .CodeMirror-scrollbar-filler {
            right: 0;
            bottom: 0;
          }
          .CodeMirror-gutter-filler {
            left: 0;
            bottom: 0;
          }

          .CodeMirror-gutters {
            position: absolute;
            left: 0;
            top: 0;
            min-height: 100%;
            z-index: 3;
          }
          .CodeMirror-gutter {
            white-space: normal;
            height: 100%;
            display: inline-block;
            vertical-align: top;
            margin-bottom: -30px;
            /* Hack to make IE7 behave */
            *zoom: 1;
            *display: inline;
          }
          .CodeMirror-gutter-wrapper {
            position: absolute;
            z-index: 4;
            background: none !important;
            border: none !important;
          }
          .CodeMirror-gutter-background {
            position: absolute;
            top: 0;
            bottom: 0;
            z-index: 4;
          }
          .CodeMirror-gutter-elt {
            position: absolute;
            cursor: default;
            z-index: 4;
          }
          .CodeMirror-gutter-wrapper {
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
          }

          .CodeMirror-lines {
            cursor: text;
            min-height: 1px; /* prevents collapsing before first draw */
          }
          .CodeMirror pre {
            /* Reset some styles that the rest of the page might have set */
            -moz-border-radius: 0;
            -webkit-border-radius: 0;
            border-radius: 0;
            border-width: 0;
            background: transparent;
            font-family: inherit;
            font-size: inherit;
            margin: 0;
            white-space: pre;
            word-wrap: normal;
            line-height: 20px;
            color: inherit;
            z-index: 2;
            position: relative;
            overflow: visible;
            -webkit-tap-highlight-color: transparent;
            -webkit-font-variant-ligatures: none;
            font-variant-ligatures: none;
          }
          .CodeMirror-wrap pre {
            word-wrap: break-word;
            white-space: pre-wrap;
            word-break: normal;
          }

          .CodeMirror-linebackground {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 0;
          }

          .CodeMirror-linewidget {
            position: relative;
            z-index: 2;
            overflow: auto;
          }

          .CodeMirror-widget {
          }

          .CodeMirror-code {
            outline: none;
          }

          /* Force content-box sizing for the elements where we expect it */
          .CodeMirror-scroll,
          .CodeMirror-sizer,
          .CodeMirror-gutter,
          .CodeMirror-gutters,
          .CodeMirror-linenumber {
            -moz-box-sizing: content-box;
            box-sizing: content-box;
          }

          .CodeMirror-measure {
            position: absolute;
            width: 100%;
            height: 0;
            overflow: hidden;
            visibility: hidden;
          }

          .CodeMirror-cursor {
            position: absolute;
          }
          .CodeMirror-measure pre {
            position: static;
          }

          div.CodeMirror-cursors {
            visibility: hidden;
            position: relative;
            z-index: 3;
          }
          div.CodeMirror-dragcursors {
            visibility: visible;
          }

          .CodeMirror-focused div.CodeMirror-cursors {
            visibility: visible;
          }

          .CodeMirror-selected {
            background-color: #b1d6ff;
          }
          .CodeMirror-focused .CodeMirror-selected {
            background-color: #b1d6ff;
          }
          .CodeMirror-crosshair {
            cursor: crosshair;
          }
          .CodeMirror-line::selection,
          .CodeMirror-line > span::selection,
          .CodeMirror-line > span > span::selection {
            background-color: #b1d6ff;
          }
          .CodeMirror-line::-moz-selection,
          .CodeMirror-line > span::-moz-selection,
          .CodeMirror-line > span > span::-moz-selection {
            background-color: #b1d6ff;
          }

          .cm-searching {
            background: #ffa;
            background: rgba(255, 255, 0, .4);
          }

          /* IE7 hack to prevent it from returning funny offsetTops on the spans */
          .CodeMirror span {
            *vertical-align: text-bottom;
          }

          /* Used to force a border model for a node */
          .cm-force-border {
            padding-right: .1px;
          }

          @media print {
            /* Hide the cursor when printing */
            .CodeMirror div.CodeMirror-cursors {
              visibility: hidden;
            }
          }

          /* See issue #2901 */
          .cm-tab-wrap-hack:after {
            content: '';
          }

          /* Help users use markselection to safely style text background */
          span.CodeMirror-selectedtext {
            background: none;
          }
        `}</style>
        <style jsx>{`
          .demo {
            line-height: normal;
            margin: 0 -20px;
          }
          .header {
            width: 100%;
            height: 36px;
            margin: 0 auto;
            margin-bottom: -2px;
          }
          .icons {
            display: inline-block;
            padding-top: 10px;
            padding-left: 15px;
            overflow: auto;
          }
          .icon {
            border-radius: 50%;
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 10px;
          }
          .close {
            background-color: #ff5f56;
            left: 13px;
          }
          .minimize {
            background-color: #ffbd2e;
            left: 33px;
          }
          .fullScreen {
            background-color: #27c93f;
            left: 53px;
          }
          .title {
            color: #000;
            font-size: 12px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
              "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
              "Helvetica Neue", sans-serif;
            text-align: center;
            overflow: auto;
            margin-top: -20px;
          }
          .code {
            background: #fff;
            border: 1px solid #eee;
            border-radius: 5px;
            box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.12);
            margin: auto;
          }
          /* FIXME: Using flexbox breaks codemirror width :( */
          .code .main {
            position: relative;
          }
          .code .file-tree {
            position: absolute;
            top: 0;
            left: 0;
            list-style: none;
            margin: 15px 0;
            padding-left: 15px;
            width: 130px;
          }
          .code .file {
            align-items: center;
            cursor: pointer;
            display: flex;
            font-size: 12px;
            margin-bottom: 10px;
          }
          .code .file.selected {
            font-weight: bold;
          }
          .code .file.selected :global(g) {
            fill: #000;
          }
          .code .filename {
            margin-left: 8px;
          }
          .code .file-content {
            padding-left: 110px;
          }
          .note {
            text-align: center;
            font-size: 12px;
            color: #9b9b9b;
            margin-top: 9.5em;
            margin-bottom: 20px;
          }
          @media screen and (max-width: 700px) {
            .demo {
              margin: 0;
            }
            .demo :global(.CodeMirror-scroll) {
              height: auto;
            }
            .code .file-tree {
              width: 100%;
              padding-top: 345px;
            }
            .code .file-content {
              padding-left: 0;
            }
          }
        `}</style>
      </div>
    )
  }
}

class Introduction extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      files: FILES,
      content: filesToAPIBody(FILES),
      deploying: false,
      errorMessage: null
    }
  }

  onChange = files => {
    this.setState(prevState => {
      let errorMessage
      if (prevState.files['package.json'] !== files['package.json']) {
        try {
          JSON.parse(files['package.json'])
        } catch (err) {
          errorMessage = err.message
        }
      }

      const content = errorMessage ? prevState.content : filesToAPIBody(files)
      return { files, content, errorMessage }
    })
  }

  setError = errorMessage => {
    this.setState({ errorMessage })
  }

  deploy = async () => {
    try {
      this.setState({ errorMessage: null, deploying: true })

      const response = await fetch('https://api.zeit.co/v2/now/deployments', {
        method: 'POST',
        body: this.state.content
      })

      if (!response.ok) {
        // eslint-disable-next-line no-console
        console.error('Failed to deploy:', response.status)
        this.setError('Rate limit exceeded')
        return
      }

      const body = await response.json()
      window.location = `https://${body.url}`
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to deploy', error)
      this.setError('Rate limit exceeded')
    } finally {
      this.setState({ deploying: false })
    }
  }

  render() {
    return (
      <Section
        contents={// prettier-ignore
        [
  [
    markdown(components)`
The ${<Now color="#000" />} API enables you to dynamically and elastically orchestrate your deployments in the cloud. The entire power of our command-line deployment tool is available for you to remix!
`
  ],
  [
    <Editor files={this.state.files} onChange={this.onChange} key="1" />,
    <Preview
      content={this.state.content}
      deploy={this.deploy}
      errorMessage={this.state.errorMessage}
      deploying={this.state.deploying}
      key="2"
    />
  ]
          ]}
      />
    )
  }
}

export default Introduction

function filesToAPIBody(files) {
  const pkg = JSON.parse(files['package.json'])
  return JSON.stringify(
    {
      name: pkg.name,
      deploymentType: 'NPM',
      files: Object.entries(files).map(([file, data]) => ({ file, data }))
    },
    null,
    2
  )
}

import 'highlight.js/styles/monokai-sublime.css'
import hljs from 'highlight.js/lib/core'
import hljsJS from 'highlight.js/lib/languages/javascript'
import hljsXML from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('js', hljsJS)
hljs.registerLanguage('xml', hljsXML)

export default hljs

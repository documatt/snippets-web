import UndoRedoButtons from '../UndoRedoButtons.vue'
import Editor from '../../Panes/Editor.vue'

describe('<UndoRedoButtons />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Editor)
    cy.get('.CodeMirror-line').type("Hello")
  })
})
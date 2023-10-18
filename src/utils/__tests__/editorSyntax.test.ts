import { MdBold, MdHeadings, MdItalic, RstBold, RstHeadings, RstItalic } from '../editorSyntax'
import { describe, expect, test } from 'vitest'

describe('headings', () => {
  test('RST headings', () => {
    expect(RstHeadings.h1('foo')).toBe('\n\n###\n$0\n###\n\n')
    expect(RstHeadings.h2('foo')).toBe('\n\n***\n$0\n***\n\n')
    expect(RstHeadings.h3('foo')).toBe('\n\n$0\n===\n\n')
    expect(RstHeadings.h4('foo')).toBe('\n\n$0\n---\n\n')
    expect(RstHeadings.h5('foo')).toBe('\n\n$0\n^^^\n\n')
    expect(RstHeadings.h6('foo')).toBe("\n\n$0\n'''\n\n")
  })
  test('MD headings', () => {
    expect(MdHeadings.h1('foo')).toBe('\n\n# $0\n\n')
    expect(MdHeadings.h2('foo')).toBe('\n\n## $0\n\n')
    expect(MdHeadings.h3('foo')).toBe('\n\n### $0\n\n')
    expect(MdHeadings.h4('foo')).toBe('\n\n#### $0\n\n')
    expect(MdHeadings.h5('foo')).toBe('\n\n##### $0\n\n')
    expect(MdHeadings.h6('foo')).toBe('\n\n###### $0\n\n')
  })
})

describe('bold and italic', () => {
  test('RST bold', () => {
    expect(RstBold.bold('foo')).toBe('**$0**')
  })
  test('RST italic', () => {
    expect(RstItalic.italic('foo')).toBe('*$0*')
  })
  test('MD bold', () => {
    expect(MdBold.bold('foo')).toBe('**$0**')
  })
  test('MD italic', () => {
    expect(MdItalic.italic('foo')).toBe('*$0*')
  })
})

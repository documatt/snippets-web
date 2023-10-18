/**
 * Returns template string where `$0` is original text.
 */
export type TemplateFn = (text: string) => string

// *****************************************************************************
// Headings
// *****************************************************************************

export interface Headings {
  h1: TemplateFn
  h2: TemplateFn
  h3: TemplateFn
  h4: TemplateFn
  h5: TemplateFn
  h6: TemplateFn
}

export const RstHeadings: Headings = {
  h1: (t) => `\n\n${'#'.repeat(t.length)}\n$0\n${'#'.repeat(t.length)}\n\n`,
  h2: (t) => `\n\n${'*'.repeat(t.length)}\n$0\n${'*'.repeat(t.length)}\n\n`,
  h3: (t) => `\n\n$0\n${'='.repeat(t.length)}\n\n`,
  h4: (t) => `\n\n$0\n${'-'.repeat(t.length)}\n\n`,
  h5: (t) => `\n\n$0\n${'^'.repeat(t.length)}\n\n`,
  h6: (t) => `\n\n$0\n${'\''.repeat(t.length)}\n\n`,
}

export const MdHeadings: Headings = {
  h1: () => `\n\n# $0\n\n`,
  h2: () => `\n\n## $0\n\n`,
  h3: () => `\n\n### $0\n\n`,
  h4: () => `\n\n#### $0\n\n`,
  h5: () => `\n\n##### $0\n\n`,
  h6: () => `\n\n###### $0\n\n`,
}
}

// *****************************************************************************
// Syntax definitions
// *****************************************************************************

export interface Syntax {
    headings: Headings
}

export const RstSyntax: Syntax = {
    headings: RstHeadings,
}

export const MdSyntax: Syntax = {
    headings: MdHeadings,
}
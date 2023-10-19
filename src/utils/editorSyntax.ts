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

// *****************************************************************************
// Bold, italic
// *****************************************************************************

export interface Bold {
  bold: TemplateFn
}
export interface Italic {
  italic: TemplateFn
}

export const RstBold: Bold = {
  bold: () => `**$0**`
}
export const RstItalic: Italic = {
  italic: () => `*$0*`
}

export const MdBold: Bold = {
  bold: () => `**$0**`
}
export const MdItalic: Italic = {
  italic: () => `*$0*`
}

// *****************************************************************************
// Links
// *****************************************************************************

export interface Links {
  externalLink: TemplateFn
}

export const RstLinks: Links = {
  externalLink: () => "`Syntax reference <https://documatt.com/restructuredtext-reference/>`_"
}

// *****************************************************************************
// Images
// *****************************************************************************

export interface Images {
  blockImage: TemplateFn
}

export const RstImages: Images = {
  blockImage: () => `\n.. image:: https://documatt.com/pages/blog/open-doodles-clumsy.svg\n\n`
}

// *****************************************************************************
// Code
// *****************************************************************************

export interface Codes {
  plainBlock: TemplateFn
  highlightedBlock: TemplateFn
  plainInline: TemplateFn
}

export const RstCodes: Codes = {
  plainBlock: () => `In almost any documentation you need to show examples like:

::

    $0

`,
  highlightedBlock: () => `.. code-block:: javascript

   $0

`,
   plainInline: () => "``$0``"
}

// *****************************************************************************
// Code
// *****************************************************************************

export interface Lists {
  bulleted: TemplateFn,
  numbered: TemplateFn
}

export const RstLists: Lists = {
  bulleted: () =>
`Unordered lists usually use \`\`*\`\` as bullet symbol:

* A bullet list item
* Second item
* A sub item

`,
  numbered: () =>
`
Ordered (enumerated) lists that is auto-numbered starts with \`\`#.\`\`:

#. one
#. two
#. three

`,
}

// *****************************************************************************
// Syntax definitions
// *****************************************************************************

export interface Syntax {
    headings: Headings,
    bold: Bold,
    italic: Italic,
    links: Links,
    images: Images,
    codes: Codes
    lists: Lists
}

export const RstSyntax: Syntax = {
    headings: RstHeadings,
    bold: RstBold,
    italic: RstItalic,
    links: RstLinks,
    images: RstImages,
    codes: RstCodes,
    lists: RstLists
}

export const MdSyntax: Syntax = {
    headings: MdHeadings,
    bold: MdBold,
    italic: MdItalic
}
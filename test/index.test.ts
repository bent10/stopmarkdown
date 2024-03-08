/// <reference types="vitest/globals" />

import stopmarkdown from '../src/index.js'
import { serializeInlineTokens } from '../src/utils.js'

describe('stopmarkdown', () => {
  test('returns an array of text segments when Markdown content contains various elements', () => {
    const markdown =
      '# Markdown Cheat Sheet\n\nThis Markdown document showcases various Markdown elements, including **bold**, _italic_, and ~~strikethrough~~ text.\n\n## Headers\n\n### This is an H3 header\n\n#### This is an H4 header\n\n##### This is an H5 header\n\n###### This is an H6 header\n\n## Lists\n\n### Unordered List\n\n- Item 1\n- Item 2\n  - Subitem A\n  - Subitem B\n    - Sub-subitem 1\n    - Sub-subitem 2\n\n### Ordered List\n\n1. First item\n2. Second item\n   1. Nested item\n   2. Another nested item\n\n## Links and Images\n\n[Example](https://example.com)\n\n![Example Logo](https://example.com/favicon.ico)\n\n## Blockquotes\n\n> This is a blockquote.\n>\n> - John Doe\n\n## Code Blocks\n\n```javascript\nfunction greet(name) {\n  console.log(`Hello, ${name}!`)\n}\n\ngreet(\'World\')\n```\n\n## Tables\n\n| Name | Age | Gender |\n| ---- | --- | ------ |\n| John | 30  | Male   |\n| Jane | 25  | Female |\n\n## Task Lists\n\n- [x] Task 1\n- [ ] Task 2\n- [x] Task 3\n\n## Emoji\n\n:smiley: :rocket: :book:\n\n## Strikethrough\n\n~~This text is strikethrough.~~\n\n## HTML tags\n\nThis is a <span style="color:red;">red</span> text.\n\n<p>This is a paragraph.</p>\n\n<blockquote>This is a blockquote in HTML.</blockquote>\n\n<ul>\n  <li>HTML List Item 1</li>\n  <li>HTML List Item 2</li>\n</ul>\n\n<img src="https://example.com/image.jpg" alt="Example Image">\n\n## GitHub Flavored Markdown (GFM) Features\n\n### Code Blocks with Language Highlighting\n\n```typescript\ninterface Person {\n  name: string\n  age: number\n}\n\nconst person: Person = {\n  name: \'John Doe\',\n  age: 30\n}\n```\n\n### Task Lists in Tables\n\n| Task   | Status |\n| ------ | ------ |\n| Task 1 | [x]    |\n| Task 2 | [ ]    |\n| Task 3 | [x]    |\n\n### Mentioning Users\n\nHey @username, could you take a look at this?\n\n### URLs Automatically Linked\n\nhttps://example.com/foo/bar\n\n### Strikethrough in Tables\n\n| Item       | Price  |\n| ---------- | ------ |\n| Apple      | $2     |\n| Banana     | $1     |\n| ~~Orange~~ | ~~$3~~ |\n\n### Emoji in Headers\n\n## :sparkles: Features :sparkles:'

    expect(stopmarkdown(markdown)).toEqual([
      'Markdown Cheat Sheet.',
      'This Markdown document showcases various Markdown elements, including bold, italic, and strikethrough text.',
      'Headers.',
      'This is an H3 header.',
      'This is an H4 header.',
      'This is an H5 header.',
      'This is an H6 header.',
      'Lists.',
      'Unordered List.',
      'Item 1.',
      'Item 2.',
      'Subitem A.',
      'Subitem B.',
      'Sub-subitem 1.',
      'Sub-subitem 2.',
      'Ordered List.',
      'First item.',
      'Second item.',
      'Nested item.',
      'Another nested item.',
      'Links and Images.',
      'Example.',
      'Example Logo.',
      'Blockquotes.',
      'This is a blockquote.',
      'John Doe.',
      'Code Blocks.',
      "function greet(name) {\n  console.log(`Hello, ${name}!`)\n}\n\ngreet('World')",
      'Tables.',
      'Name, Age, Gender.',
      'John, 30, Male.',
      'Jane, 25, Female.',
      'Task Lists.',
      'Task 1.',
      'Task 2.',
      'Task 3.',
      'Emoji.',
      ':smiley: :rocket: :book:',
      'Strikethrough.',
      'This text is strikethrough.',
      'HTML tags.',
      'This is a red text.',
      'This is a paragraph.',
      'This is a blockquote in HTML.',
      'HTML List Item 1\nHTML List Item 2',
      'GitHub Flavored Markdown (GFM) Features.',
      'Code Blocks with Language Highlighting.',
      "interface Person {\n  name: string\n  age: number\n}\n\nconst person: Person = {\n  name: 'John Doe',\n  age: 30\n}",
      'Task Lists in Tables.',
      'Task, Status.',
      'Task 1, [x].',
      'Task 2, [ ].',
      'Task 3, [x].',
      'Mentioning Users.',
      'Hey @username, could you take a look at this?',
      'URLs Automatically Linked.',
      'https://example.com/foo/bar.',
      'Strikethrough in Tables.',
      'Item, Price.',
      'Apple, $2.',
      'Banana, $1.',
      'Orange, $3.',
      'Emoji in Headers.',
      ':sparkles: Features :sparkles:'
    ])
  })

  test('handles Markdown content with link definition', () => {
    const markdown =
      'This is some [link definition][1] in Markdown.\n\n\n[1]: https://example.com/foo/bar#baz "Foo Bar"'
    expect(stopmarkdown(markdown)).toEqual([
      'This is some link definition in Markdown.'
    ])
  })

  test('handles Markdown content with inline code spans', () => {
    const markdown = 'This is some `inline code` in Markdown.'
    expect(stopmarkdown(markdown)).toEqual([
      'This is some inline code in Markdown.'
    ])
  })

  test('handles Markdown content with escaped characters', () => {
    const markdown = 'This is some \\*escaped\\* text.'
    expect(stopmarkdown(markdown)).toEqual(['This is some *escaped* text.'])
  })
})

describe('serializeInlineTokens', () => {
  test('returns a string with serialized inline Markdown tokens', () => {
    const tokens = [
      { type: 'text', text: 'This is ' },
      { type: 'strong', text: 'bold' },
      { type: 'text', text: ' and ' },
      { type: 'em', text: 'italic' },
      { type: 'text', text: ' text.' }
    ] as never
    expect(serializeInlineTokens(tokens)).toEqual(
      'This is bold and italic text.'
    )
  })
})

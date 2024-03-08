# stopmarkdown

A utility for Node.js and the browser that extracts plain text from Markdown strings. It's useful for Natural Language Processing (NLP) tasks that require only the textual content of Markdown documents.

## Install

```bash
npm install stopmarkdown
```

Or yarn:

```bash
yarn add stopmarkdown
```

Alternatively, you can also include this module directly in your HTML file from CDN:

```yml
UMD: https://cdn.jsdelivr.net/npm/stopmarkdown/dist/index.umd.js
ESM: https://cdn.jsdelivr.net/npm/stopmarkdown/+esm
CJS: https://cdn.jsdelivr.net/npm/stopmarkdown/dist/index.cjs
```

## Usage

```js
import stopmarkdown from 'stopmarkdown'

const markdownContent = `
# Heading 1

This is a paragraph with some *italic* and **bold** text.

- Item 1
- Item 2

## Heading 2

> Blockquote

\`\`\`js
console.log('Code block');
\`\`\`
`

const segments = stopmarkdown(markdownContent)
console.log(segments)
```

## API

### `stopmarkdown(input: string): string[]`

Returns an array of text segments extracted from the Markdown string.

- `input`: The Markdown string to tokenize.

## Related

- [boox](https://github.com/bent10/boox) – Performing full-text search across multiple documents by combining [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) score with [inverted index](https://en.wikipedia.org/wiki/Inverted_index) weight.
- [stophtml](https://github.com/bent10/stophtml) – Extracts plain text from an HTML string.
- [nomark](https://github.com/bent10/nomark) – Transforms hypertext strings (e.g., HTML, Markdown) into plain text for natural language processing (NLP) normalization.
- [stopword](https://github.com/fergiemcdowall/stopword) – Allows you to strip stopwords from an input text (supports a ton of languages).

## Contributing

We 💛&nbsp; issues.

When committing, please conform to [the semantic-release commit standards](https://www.conventionalcommits.org/). Please install `commitizen` and the adapter globally, if you have not already.

```bash
npm i -g commitizen cz-conventional-changelog
```

Now you can use `git cz` or just `cz` instead of `git commit` when committing. You can also use `git-cz`, which is an alias for `cz`.

```bash
git add . && git cz
```

## License

![GitHub](https://img.shields.io/github/license/bent10/stopmarkdown)

A project by [Stilearning](https://stilearning.com) &copy; 2024.

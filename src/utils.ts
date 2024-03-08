import type { Token } from 'marked'

/**
 * Serializes inline Markdown tokens into a string.
 *
 * @param tokens - The inline Markdown tokens to serialize.
 * @returns A string representing the serialized inline Markdown tokens.
 */
export function serializeInlineTokens(tokens: Token[] = []) {
  const chunks: string[] = []

  for (const token of tokens) {
    switch (token.type) {
      case 'text':
      case 'link':
      case 'strong':
      case 'em':
      case 'del':
        if ('tokens' in token && token.tokens && token.tokens.length) {
          chunks.push(serializeInlineTokens(token.tokens))
        } else {
          chunks.push(token.text)
        }
        break
      case 'codespan':
      case 'escape':
        chunks.push(token.text)
        break
      case 'image':
        const imgText = token.title || token.text
        if (imgText) {
          chunks.push(token.title || token.text)
        }
        break
      // inline HTML is disregarded because it merely consists of HTML tags
      case 'html':
        break
    }
  }

  return chunks.join('')
}

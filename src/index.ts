import { Lexer, type Token, type Tokens } from 'marked'
import stophtml from 'stophtml'
import { serializeInlineTokens } from './utils.js'

/**
 * Tokenizes Markdown strings and extracts plain text segments while
 * removing Markdown syntax.
 *
 * @param input - The Markdown string to process.
 * @returns An array of text segments extracted from the Markdown string.
 */
export default function stopmarkdown(input: string) {
  const lexer = new Lexer({ gfm: true, async: false })
  const segments: string[] = []

  walkTokens(lexer.lex(input))

  return segments.filter(segment => !!segment.trimEnd())

  /**
   * Recursively walks through Markdown tokens to extract text segments.
   *
   * @param tokenList - The list of Markdown tokens to process.
   */
  function walkTokens(tokenList: Token[]) {
    tokenList.forEach(token => {
      switch (token.type) {
        case 'code':
          segments.push(token.text)
          break
        case 'html':
          // inline HTML is disregarded because it merely consists of HTML tags
          if (token.block) {
            segments.push(stophtml(token.text).join('\n'))
          }
          break
        case 'heading':
        case 'paragraph':
          const hpText = serializeInlineTokens(token.tokens)

          if (hpText) {
            segments.push(
              hpText.endsWith('.') ||
                hpText.endsWith('!') ||
                hpText.endsWith('?') ||
                hpText.endsWith(':')
                ? hpText
                : hpText + '.'
            )
          }
          break
        case 'table':
          const table = token as Tokens.Table
          const tableHeaderCols: string[] = []

          table.header.forEach(col => {
            tableHeaderCols.push(serializeInlineTokens(col.tokens))
          })

          segments.push(tableHeaderCols.join(', ') + '.')

          table.rows.forEach(row => {
            const tableRowCols: string[] = []

            row.forEach(col => {
              tableRowCols.push(serializeInlineTokens(col.tokens))
            })

            segments.push(tableRowCols.join(', ') + '.')
          })
          break
        case 'blockquote':
          if ('tokens' in token && token.tokens?.length) {
            walkTokens(token.tokens)
          }
          break
        case 'list':
          walkTokens(token.items)
          break
        case 'list_item':
          token.tokens?.forEach(item => {
            if (
              item.type === 'heading' ||
              item.type === 'paragraph' ||
              item.type === 'blockquote' ||
              item.type === 'list' ||
              item.type === 'table'
            ) {
              walkTokens([item])
            } else if (item.type === 'text') {
              if ('tokens' in item) {
                const liText = serializeInlineTokens(item.tokens)
                segments.push(liText.endsWith('.') ? liText : liText + '.')
              }
            }
          })
          break
        // ignores 'space', 'hr', and inline elements
        default:
          break
      }
    })
  }
}

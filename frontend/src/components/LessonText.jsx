import React from 'react'

function InlineText({ text }) {
  const parts = String(text || '').split(/(\`[^\`]+\`)/g).filter(Boolean)
  return parts.map((part, index) => {
    if (part.startsWith('\`') && part.endsWith('\`')) {
      return <code key={index}>{part.slice(1, -1)}</code>
    }
    return <React.Fragment key={index}>{part}</React.Fragment>
  })
}

function parseTable(lines) {
  return lines
    .filter((line) => line.includes('|'))
    .map((line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim()))
    .filter((cells) => cells.some(Boolean))
}

function isTableSeparator(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line)
}

function parseBlocks(text) {
  const lines = String(text || '').split('\n')
  const blocks = []
  let index = 0

  while (index < lines.length) {
    if (!lines[index].trim()) {
      index += 1
      continue
    }

    if (lines[index].trim().startsWith('\`\`\`')) {
      const code = []
      index += 1
      while (index < lines.length && !lines[index].trim().startsWith('\`\`\`')) {
        code.push(lines[index])
        index += 1
      }
      index += 1
      blocks.push({ type: 'code', code: code.join('\n') })
      continue
    }

    if (lines[index].includes('|') && lines[index + 1] && isTableSeparator(lines[index + 1])) {
      const tableLines = [lines[index]]
      index += 2
      while (index < lines.length && lines[index].includes('|')) {
        tableLines.push(lines[index])
        index += 1
      }
      blocks.push({ type: 'table', rows: parseTable(tableLines) })
      continue
    }

    const ordered = lines[index].match(/^\s*\d+[.)]\s+(.+)/)
    const unordered = lines[index].match(/^\s*[-*•]\s+(.+)/)
    if (ordered || unordered) {
      const type = ordered ? 'orderedList' : 'unorderedList'
      const items = []
      while (index < lines.length) {
        const match = lines[index].match(type === 'orderedList' ? /^\s*\d+[.)]\s+(.+)/ : /^\s*[-*•]\s+(.+)/)
        if (!match) break
        items.push(match[1])
        index += 1
      }
      blocks.push({ type, items })
      continue
    }

    const paragraph = []
    while (
      index < lines.length &&
      lines[index].trim() &&
      !(lines[index].includes('|') && lines[index + 1] && isTableSeparator(lines[index + 1])) &&
      !/^\s*(\d+[.)]|[-*•])\s+/.test(lines[index]) &&
      !lines[index].trim().startsWith('\`\`\`')
    ) {
      paragraph.push(lines[index].trim())
      index += 1
    }
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') })
  }

  return blocks
}

function TableBlock({ rows }) {
  if (!rows.length) return null
  const [header, ...body] = rows
  return (
    <div className="lesson-table-wrap">
      <table className="lesson-table">
        <thead>
          <tr>{header.map((cell, index) => <th key={index}><InlineText text={cell} /></th>)}</tr>
        </thead>
        <tbody>
          {body.map((row, rowIndex) => (
            <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}><InlineText text={cell} /></td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function LessonText({ paragraphs = [] }) {
  return (
    <div className="lesson-text">
      {paragraphs.flatMap((paragraph, paragraphIndex) => (
        parseBlocks(paragraph).map((block, blockIndex) => {
          const key = paragraphIndex + '-' + blockIndex
          if (block.type === 'table') return <TableBlock key={key} rows={block.rows} />
          if (block.type === 'code') return <pre key={key} className="code-block lesson-code"><code>{block.code}</code></pre>
          if (block.type === 'orderedList') {
            return <ol key={key} className="lesson-list">{block.items.map((item, index) => <li key={index}><InlineText text={item} /></li>)}</ol>
          }
          if (block.type === 'unorderedList') {
            return <ul key={key} className="lesson-list">{block.items.map((item, index) => <li key={index}><InlineText text={item} /></li>)}</ul>
          }
          return <p key={key}><InlineText text={block.text} /></p>
        })
      ))}
    </div>
  )
}

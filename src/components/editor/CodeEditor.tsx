'use client'

import { useRef, useState } from 'react'
import Editor, { OnMount } from '@monaco-editor/react'
import { Play, Copy, Check, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  initialCode: string
  language?: string
  height?: string
  readOnly?: boolean
  runnable?: boolean
  title?: string
}

export function CodeEditor({
  initialCode,
  language = 'javascript',
  height = '300px',
  readOnly = false,
  runnable = false,
  title,
}: Props) {
  const [code, setCode] = useState(initialCode.trim())
  const [output, setOutput] = useState<string | null>(null)
  const [outputType, setOutputType] = useState<'success' | 'error'>('success')
  const [copied, setCopied] = useState(false)
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null)

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setCode(initialCode.trim())
    setOutput(null)
  }

  const handleRun = () => {
    if (language !== 'javascript' && language !== 'typescript') {
      setOutput('▶ Run is supported for JavaScript/TypeScript only in-browser.')
      setOutputType('success')
      return
    }

    const logs: string[] = []
    const originalConsole = console.log

    // Capture console.log
    console.log = (...args: unknown[]) => {
      logs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '))
      originalConsole(...args)
    }

    try {
      // eslint-disable-next-line no-new-func
      new Function(code)()
      setOutputType('success')
      setOutput(logs.length > 0 ? logs.join('\n') : '✓ Ran successfully (no output)')
    } catch (err) {
      setOutputType('error')
      setOutput(`✗ ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      console.log = originalConsole
    }
  }

  return (
    <div className="monaco-container not-prose my-8">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-bg-2 border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs font-mono text-ink-3">
            {title || language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!readOnly && (
            <button
              onClick={handleReset}
              className="p-1.5 text-ink-3 hover:text-ink-2 transition rounded"
              title="Reset to original"
            >
              <RotateCcw size={13} />
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-ink-2 hover:text-ink bg-surface border border-border hover:border-border-2 rounded transition"
          >
            {copied ? <Check size={12} className="text-accent-3" /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          {runnable && (
            <button
              onClick={handleRun}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-accent-3 bg-accent-3/10 border border-accent-3/20 hover:bg-accent-3/20 rounded transition"
            >
              <Play size={12} />
              Run
            </button>
          )}
        </div>
      </div>

      {/* Monaco Editor */}
      <Editor
        height={height}
        language={language}
        value={code}
        onChange={(val) => setCode(val || '')}
        onMount={handleMount}
        options={{
          readOnly,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 13,
          fontFamily: 'JetBrains Mono, Fira Code, monospace',
          fontLigatures: true,
          lineNumbers: 'on',
          folding: true,
          wordWrap: 'on',
          tabSize: 2,
          padding: { top: 12, bottom: 12 },
          scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          renderLineHighlight: 'line',
          contextmenu: false,
        }}
        theme="vs-dark"
        loading={
          <div className="flex items-center justify-center h-full text-ink-3 text-sm font-mono">
            Loading editor...
          </div>
        }
      />

      {/* Output panel */}
      {output !== null && (
        <div
          className={cn(
            'border-t border-border px-4 py-3 font-mono text-sm whitespace-pre-wrap',
            outputType === 'error' ? 'text-red-400 bg-red-500/5' : 'text-accent-3 bg-accent-3/5'
          )}
        >
          <div className="text-xs text-ink-3 mb-1 uppercase tracking-wider">Output</div>
          {output}
        </div>
      )}
    </div>
  )
}

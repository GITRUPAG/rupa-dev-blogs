//src/components/blog/MDXComponents.tsx
import type { MDXComponents as MDXComponentsType } from 'mdx/types'
import { cn } from '@/lib/utils'
import { CodeEditor } from '@/components/editor/CodeEditor'
import { JwtServiceEditor, TestAuthEditor } from '@/components/blog/post-components/JwtEditors'

import {
  HelloWorldEditor,
  VariablesEditor,
  StringOpsEditor,
  NumbersEditor,
  ControlFlowEditor,
  ListOpsEditor,
  FunctionsEditor,
  ClassBasicsEditor,
  InheritanceEditor,
  DataclassEditor,
  DecoratorsEditor,
  GeneratorsEditor,
  ComprehensionsEditor,
  FileOpsEditor,
  RequestsApiEditor,
} from '@/components/blog/post-components/PythonEditors'

function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: 'info' | 'warning' | 'error' | 'success'
  title?: string
  children: React.ReactNode
}) {
  const styles = {
    info: 'bg-accent/5 border-accent/30 text-ink-2',
    warning: 'bg-accent-4/5 border-accent-4/30 text-ink-2',
    error: 'bg-red-500/5 border-red-500/30 text-ink-2',
    success: 'bg-accent-3/5 border-accent-3/30 text-ink-2',
  }
  const icons = { info: 'ℹ', warning: '⚠', error: '✗', success: '✓' }

  return (
    <div className={cn('not-prose border rounded-xl p-5 my-6', styles[type])}>
      {title && (
        <div className="flex items-center gap-2 font-medium text-sm mb-2">
          <span>{icons[type]}</span>
          {title}
        </div>
      )}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}

function Step({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="not-prose flex gap-4 my-6">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center font-mono text-sm text-accent font-bold">
        {number}
      </div>
      <div className="flex-1 pt-0.5">
        <h4 className="font-heading font-semibold text-base mb-2 text-ink">{title}</h4>
        <div className="text-ink-2 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

function FileTree({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose bg-bg-2 border border-border rounded-xl p-5 my-6 font-mono text-sm text-ink-2 leading-relaxed">
      {children}
    </div>
  )
}

export const MDXComponents: MDXComponentsType = {
  h1: ({ children }) => (
    <h1 className="font-heading font-extrabold text-3xl mt-10 mb-4">{children}</h1>
  ),
  h2: ({ children, id }) => (
    <h2 id={id} className="font-heading font-bold text-2xl mt-10 mb-4 scroll-mt-24">
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="font-heading font-semibold text-xl mt-8 mb-3 scroll-mt-24">
      {children}
    </h3>
  ),
  pre: ({ children, ...props }) => (
    <div className="group relative not-prose my-6">
      <pre
        className="bg-bg-2 border border-border rounded-xl p-5 overflow-x-auto text-sm font-mono leading-relaxed"
        {...props}
      >
        {children}
      </pre>
    </div>
  ),
  CodeEditor: ({
    code,
    language,
    runnable,
    title,
    height,
  }: {
    code?: string
    language?: string
    runnable?: boolean
    title?: string
    height?: string
  }) => (
    <CodeEditor
      initialCode={code ?? ''}
      language={language}
      runnable={runnable}
      title={title}
      height={height}
    />
  ),
  JwtServiceEditor,
  TestAuthEditor,
  Callout,
  Step,
  FileTree,

  // Python Basics
  HelloWorldEditor,
  VariablesEditor,
  StringOpsEditor,
  NumbersEditor,
  ControlFlowEditor,
  ListOpsEditor,
  FunctionsEditor,
 
  // Python OOP
  ClassBasicsEditor,
  InheritanceEditor,
  DataclassEditor,
 
  // Python Advanced
  DecoratorsEditor,
  GeneratorsEditor,
  ComprehensionsEditor,
 
  // Python Automation
  FileOpsEditor,
  RequestsApiEditor,
}
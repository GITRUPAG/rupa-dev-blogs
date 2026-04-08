// src/components/blog/post-components/PythonEditors.tsx
'use client'

import { CodeEditor } from '@/components/editor/CodeEditor'
import { pythonBasicsSnippets } from '@/lib/post-snippets/python-basics-snippets'
import { pythonOopSnippets } from '@/lib/post-snippets/python-oop-snippets'
import { pythonAdvancedSnippets } from '@/lib/post-snippets/python-advanced-snippets'
import { pythonAutomationSnippets } from '@/lib/post-snippets/python-automation-snippets'

// ─── Basics ──────────────────────────────────────────────────────────────────

export function HelloWorldEditor() {
  return (
    <CodeEditor
      initialCode={pythonBasicsSnippets.helloWorld}
      language="python"
      title="hello.py"
      height="180px"
    />
  )
}

export function VariablesEditor() {
  return (
    <CodeEditor
      initialCode={pythonBasicsSnippets.variables}
      language="python"
      title="variables.py"
      height="280px"
    />
  )
}

export function StringOpsEditor() {
  return (
    <CodeEditor
      initialCode={pythonBasicsSnippets.stringOps}
      language="python"
      title="strings.py"
      height="300px"
    />
  )
}

export function NumbersEditor() {
  return (
    <CodeEditor
      initialCode={pythonBasicsSnippets.numbersOps}
      language="python"
      title="numbers.py"
      height="260px"
    />
  )
}

export function ControlFlowEditor() {
  return (
    <CodeEditor
      initialCode={pythonBasicsSnippets.controlFlow}
      language="python"
      title="control_flow.py"
      height="320px"
    />
  )
}

export function ListOpsEditor() {
  return (
    <CodeEditor
      initialCode={pythonBasicsSnippets.listOps}
      language="python"
      title="lists.py"
      height="320px"
    />
  )
}

export function FunctionsEditor() {
  return (
    <CodeEditor
      initialCode={pythonBasicsSnippets.functions}
      language="python"
      title="functions.py"
      height="300px"
    />
  )
}

// ─── OOP ─────────────────────────────────────────────────────────────────────

export function ClassBasicsEditor() {
  return (
    <CodeEditor
      initialCode={pythonOopSnippets.classBasics}
      language="python"
      title="dog.py"
      height="300px"
    />
  )
}

export function InheritanceEditor() {
  return (
    <CodeEditor
      initialCode={pythonOopSnippets.inheritance}
      language="python"
      title="animals.py"
      height="320px"
    />
  )
}

export function DataclassEditor() {
  return (
    <CodeEditor
      initialCode={pythonOopSnippets.dataclasses}
      language="python"
      title="product.py"
      height="320px"
    />
  )
}

// ─── Advanced ────────────────────────────────────────────────────────────────

export function DecoratorsEditor() {
  return (
    <CodeEditor
      initialCode={pythonAdvancedSnippets.decorators}
      language="python"
      title="decorators.py"
      height="360px"
    />
  )
}

export function GeneratorsEditor() {
  return (
    <CodeEditor
      initialCode={pythonAdvancedSnippets.generators}
      language="python"
      title="generators.py"
      height="320px"
    />
  )
}

export function ComprehensionsEditor() {
  return (
    <CodeEditor
      initialCode={pythonAdvancedSnippets.comprehensions}
      language="python"
      title="comprehensions.py"
      height="300px"
    />
  )
}

// ─── Automation ──────────────────────────────────────────────────────────────

export function FileOpsEditor() {
  return (
    <CodeEditor
      initialCode={pythonAutomationSnippets.fileOps}
      language="python"
      title="file_ops.py"
      height="320px"
    />
  )
}

export function RequestsApiEditor() {
  return (
    <CodeEditor
      initialCode={pythonAutomationSnippets.requestsApi}
      language="python"
      title="api_calls.py"
      height="320px"
    />
  )
}
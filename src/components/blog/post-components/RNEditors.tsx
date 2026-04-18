// src/components/blog/post-components/RNEditors.tsx
'use client'

import { CodeEditor } from '@/components/editor/CodeEditor'
import {
  rnBasicsSnippets,
  rnUiSnippets,
  rnApiSnippets,
} from '@/lib/post-snippets/rn-snippets'

// ─── Basics ──────────────────────────────────────────────────────────────────

export function RNHelloWorldEditor() {
  return (
    <CodeEditor
      initialCode={rnBasicsSnippets.helloWorld}
      language="javascript"
      title="App.tsx"
      height="320px"
    />
  )
}

export function RNCoreComponentsEditor() {
  return (
    <CodeEditor
      initialCode={rnBasicsSnippets.coreComponents}
      language="javascript"
      title="ComponentsDemo.tsx"
      height="400px"
    />
  )
}

export function RNFlexboxEditor() {
  return (
    <CodeEditor
      initialCode={rnBasicsSnippets.flexbox}
      language="javascript"
      title="FlexDemo.tsx"
      height="420px"
    />
  )
}

export function RNStateCounterEditor() {
  return (
    <CodeEditor
      initialCode={rnBasicsSnippets.stateCounter}
      language="javascript"
      title="Counter.tsx"
      height="360px"
    />
  )
}

// ─── UI ──────────────────────────────────────────────────────────────────────

export function RNCustomButtonEditor() {
  return (
    <CodeEditor
      initialCode={rnUiSnippets.customButton}
      language="javascript"
      title="Button.tsx"
      height="440px"
    />
  )
}

export function RNAnimatedCardEditor() {
  return (
    <CodeEditor
      initialCode={rnUiSnippets.animatedCard}
      language="javascript"
      title="FlipCard.tsx"
      height="380px"
    />
  )
}

// ─── API ─────────────────────────────────────────────────────────────────────

export function RNFetchProductsEditor() {
  return (
    <CodeEditor
      initialCode={rnApiSnippets.fetchProducts}
      language="javascript"
      title="ProductList.tsx"
      height="460px"
    />
  )
}
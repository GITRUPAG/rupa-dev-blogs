////src/components/JwtEditors.tsx
'use client'

import { CodeEditor } from '@/components/editor/CodeEditor'
import { jwtSnippets } from '@/lib/post-snippets/jwt-spring-boot-snippets'

export function JwtServiceEditor() {
  return (
    <CodeEditor
      initialCode={jwtSnippets.jwtService}
      language="java"
      title="JwtService.java"
      height="320px"
    />
  )
}

export function TestAuthEditor() {
  return (
    <CodeEditor
      initialCode={jwtSnippets.testAuth}
      language="javascript"
      title="test-auth.js"
      height="200px"
      runnable
    />
  )
}
'use client'

import { MDXRemote } from 'next-mdx-remote/rsc'
import { MDXComponents } from './MDXComponents'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

export function MDXClient({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={MDXComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeHighlight,
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          ],
        },
      } as any}
    />
  )
}
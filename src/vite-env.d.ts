/// <reference types="vite/client" />

export {}

// React 18 types omit `fetchpriority` (lowercase). The camelCase `fetchPriority`
// was only added in React 19 types. This augmentation silences the TS error
// while keeping the correct runtime attribute name for React 18.
declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto'
  }
}

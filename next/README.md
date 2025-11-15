# Next - SSR Framework

A comprehensive guide to next 16 basics.

## Topics Covered

- 01_lesson:

  - App Router
  - React Client & Server Components: https://nextjs.org/docs/app/getting-started/server-and-client-components#when-to-use-server-and-client-components
  - Page Based Routing
  - Dynamic Routes

- 02_lesson
  - Route Groups: Won’t appear in the URL path. Only one group layout is rendered at a time. If a `page.tsx` file exists as a direct child in the `(root)` group, make sure no other group has a direct child `page.tsx`. If you need a specific route to have its own `layout.tsx`, create a new one inside the route group or a folder — but it will only take effect if the route folder or group has a new `page.tsx` even works if child has a page.tsx.
  - Error Handling: The `error.tsx` file handles errors that occur within its directory and subdirectories. Even if a `global-error.tsx` exists, the nearest `error.tsx` file in the route hierarchy takes priority and handles the error first.
  - Data Fetching
  - API Routes
  - Caching
  - Metadata (Static, Dynamic & File Based): https://nextjs.org/docs/app/api-reference/file-conventions/layout#metadata

## Reference

- [File-system conventions](https://nextjs.org/docs/app/api-reference/file-conventions)

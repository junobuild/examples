## Introduction

The Internet Computer, including Juno, does not currently support Server Side Rendering. Therefore, it is recommended to generate a pre-rendered or client-side-only frontend application.

We suggest using the [static exports](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports) option from Next.js.

In `next.config.js` file:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
}

module.exports = nextConfig
```

After `npm run build`, the bundle output directory called `out` can be used as the source of the content to upload to a Juno's satellite.
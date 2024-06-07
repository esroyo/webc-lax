import { parse5, WebC } from './index.ts';
import { assertSnapshot } from '@std/testing/snapshot';

Deno.test('should replace slots contents and keep the positions in the document (head or body)', async (t) => {
    const page = new WebC();
    page.setContent(`<html>
  <head>
    <title>My website</title>
    <slot name="my-styles"><style>* { color: initial; }</style></slot>
  </head>
  <body>
    <slot name="my-js"></slot>
  </body>
</html>
`);
    const slots = {
        'my-styles': parse5.parseFragment('<style>* { color: red; }</style>'),
        'my-js': parse5.parseFragment(
            '<script>console.log("Hello world!");</script>',
        ),
    };
    const { html } = await page.compile({ slots });
    await assertSnapshot(t, html);
});

Deno.test('should replace slot contents if provided or use the default contents', async (t) => {
    const page = new WebC();
    page.setContent(`<html>
  <head>
    <title>My website</title>
  </head>
  <body>
    <slot name="my-js"></slot>
    <slot name="my-styles"><style>p { color: blue }</style></slot>
  </body>
</html>
`);
    const slots = {
        'my-js': parse5.parseFragment(
            '<script>console.log("Hello world!");</script>',
        ),
    };
    const { html } = await page.compile({ slots });
    await assertSnapshot(t, html);
});

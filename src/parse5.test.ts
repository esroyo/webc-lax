import { parse5 } from './index.ts';
import { assertSnapshot } from '@std/testing/snapshot';

Deno.test('should keep slot attrs, contents and position in the HTML (head or body)', async (t) => {
    const parsed = parse5.parse(`<html>
  <head>
    <title>My website</title>
    <slot name="my-styles"><style>* { color: inherit; }</style></slot>
  </head>
  <body>
    <slot>My default content</slot>
    <slot name="my-js"></slot>
  </body>
</html>
`);
    const html = parse5.serialize(parsed);
    await assertSnapshot(t, html);
});

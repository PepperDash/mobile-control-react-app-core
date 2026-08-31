# WebSocket Automatic Reconnection

This document has been superseded and its content merged into, corrected, and kept up to date at:

**[docs/websocket-middleware-contributors.md](./docs/websocket-middleware-contributors.md#disconnecting-and-reconnecting-close-code-handling)**

The close-code table and reconnection-loop details previously here had drifted from `src/lib/store/middleware/websocketMiddleware.ts` (e.g. this file described a `code === 1000`-specific branch and a `serverIsRunningOnProcessorHardware` source endpoint that no longer match the implementation). This file is kept only as a redirect so old links don't 404.

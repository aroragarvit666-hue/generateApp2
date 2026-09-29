# generateApp2 — Hello World

An Adobe App Builder app for Experience Cloud Shell: one authenticated web action
(`hello`) plus a React Spectrum UI that calls it.

## Structure
- `actions/hello/index.js` — web action returning a greeting (`require-adobe-auth: true`)
- `web-src/` — React SPA served from Adobe's CDN
- `web-src/src/components/App.js` — UI that calls the action with the IMS token
- `test/hello.test.js` — action unit tests (200 / provided-name / 500)

## Develop
```bash
npm install
aio app use            # select org / project / workspace
aio app run            # local dev with live reload
npm test               # run action tests
aio app deploy         # build + deploy to Adobe I/O Runtime
```

The `hello` action URL is written into `web-src/src/config.json` at deploy time —
never hardcode it.

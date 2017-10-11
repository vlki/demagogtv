import http from 'http'
import path from 'path'
import fs from 'fs'
import Express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'

import App from '../src/App'

const FORCE_PROTOCOL = 'https'
const FORCE_HOSTNAME = 'demagogtv.cz'

const app = Express();
app.server = http.createServer(app);

app.use((req, res, next) => {
  if (
    process.env.NODE_ENV === 'production' &&
    (
      req.headers['x-forwarded-proto'] !== FORCE_PROTOCOL ||
      req.hostname !== FORCE_HOSTNAME
    )
  ) {

    return res.redirect(`${FORCE_PROTOCOL}://${FORCE_HOSTNAME}${req.url}`)
  }

  return next();
})

app.use((req, res, next) => {
  // Don't serve index.html on the path /, it will be handled by react router
  if (req.path === '/') {
    return next();
  } else {
    return Express.static(path.join(__dirname, '..', 'build'))(req, res, next);
  }
});

app.get('*', (req, res) => {
  const staticContext = {}

  const sheet = new ServerStyleSheet()

  const appHtml = renderToString(sheet.collectStyles(
    <StaticRouter location={req.url} context={staticContext}>
      <App />
    </StaticRouter>
  ))
  const styleTags = sheet.getStyleTags()

  const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'build', 'index.html'), 'utf8')
  const html = indexHtml
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace('</head>', `${styleTags}</head>`)

  res.status(staticContext.statusCode ||  200).send(html)
});

app.server.listen(process.env.PORT || 8080);
console.log(`Listening on http://localhost:${app.server.address().port}`);

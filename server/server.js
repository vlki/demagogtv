import http from 'http'
import path from 'path'
import fs from 'fs'
import Express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import App from '../src/App'

const app = Express();
app.server = http.createServer(app);

// app.use(Express.static(path.join(__dirname, '..', 'build')))

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

  const appHtml = renderToString(
    <StaticRouter location={req.url} context={staticContext}>
      <App />
    </StaticRouter>
  )

  const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'build', 'index.html'), 'utf8')
  const html = indexHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  res.status(staticContext.statusCode ||  200).send(html)
});

app.server.listen(process.env.PORT || 8080);
console.log(`Listening on http://localhost:${app.server.address().port}`);

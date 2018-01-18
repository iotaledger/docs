import { parse as parseURL } from 'url'

import { Code } from '../text/code'

function formatCurl({ url, method = 'GET', headers, body }) {
  let request = `curl ${method !== 'GET' ? `-X ${method} ` : ''}"${url}"`

  if (headers && Object.keys(headers).length > 0) {
    request = Object.entries(headers).reduce((req, [key, value]) => {
      return req + ` \\\n  -H "${key}: ${value}"`
    }, request)
  }

  if (body) {
    if (typeof body !== 'string') {
      request = `${request} \\\n  -d '${JSON.stringify(body, null, 2)}'`
    } else {
      request = `${request} \\\n  -d '${body}'`
    }
  }

  return request
}

function formatJS({ url, ...opts }) {
  return `await fetch("${url}", ${JSON.stringify(opts, null, 2)})`
}

function formatHTTP({ url, method = 'GET', headers, body }) {
  const { path, host } = parseURL(url)

  return [
    `${method} ${path} HTTP/1.1`,
    `Host: ${host}`,
    ...Object.entries(headers).map(([key, value]) => `${key}: ${value}`),
    JSON.stringify(body, null, 2)
  ].join('\n')
}

export default function Request({ type = 'curl', ...request }) {
  if (type === 'fetch' || type === 'js' || type === 'javascript') {
    return <Code syntax="javascript">{formatJS(request)}</Code>
  }
  if (type === 'http') {
    return <Code syntax="plain">{formatHTTP(request)}</Code>
  }
  return <Code syntax="shell">{formatCurl(request)}</Code>
}

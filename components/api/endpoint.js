import { Code } from '../text/code'

function Endpoint({ method, url, children }) {
  return [
    <strong key={0}>Endpoint</strong>,
    children ? (
      <Code key={1}>{children}</Code>
    ) : (
      <Code key={1}>
        {method} {url}
      </Code>
    )
  ]
}

export default Endpoint

import Logo from './logo'

export default function Now(props) {
  const width = props.width || 9
  const height = props.height || 8
  const color = props.color || '#fff'
  return (
    <span className="now" style={{ color }}>
      <span style={{ width: `${width}px`, height: `${height}px` }}>
        <Logo color={color} />
      </span>now
      <style jsx>
        {`
        span span {
          display: inline-block;
          margin-right: 3px;
        }
        `}
      </style>
    </span>
  )
}

export default function Now(props) {
  const color = props.color || '#fff'

  return (
    <span className="now" style={{ color }}>
      Now
      <style jsx>
        {`
          span span {
            display: inline-block;
          }
        `}
      </style>
    </span>
  )
}

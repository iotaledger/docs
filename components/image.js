// This component might look a little complex
// because one could argue that keeping the aspect ratio
// of an image can be solved with `height: auto`,
// but it's actually not that easy if you want to prevent
// element flickering

// Because if you want to do that, you need to set the aspect
// ratio of the image's container BEFORE the image loads

const Image = ({
  src,
  width,
  height,
  margin = 40,
  caption,
  video = false,
  muted = true,
  autoPlay = false
}) => {
  if (!width) {
    throw new Error('Please define the width of the image!')
  }

  if (!height) {
    throw new Error('Please define the height of the image!')
  }

  const aspectRatio = String(height / width * 100) + '%'

  return (
    <figure style={{ margin: `${margin}px 0` }}>
      <main style={{ width }}>
        <div style={{ paddingBottom: aspectRatio }}>
          {video ? (
            <video src={src} muted={muted} autoPlay={autoPlay} />
          ) : (
            <img src={src} />
          )}
        </div>

        {caption && <p>{caption}</p>}
      </main>

      <style jsx>
        {`
          figure {
            text-align: center;
            display: block;
          }

          main {
            margin: 0 auto;
            max-width: 100%;
          }

          div {
            position: relative;
          }

          img,
          video {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
          }

          p {
            font-size: 11px;
            text-align: center;
            color: #999;
          }
        `}
      </style>
    </figure>
  )
}

export const Video = props => <Image {...props} video />

export default Image

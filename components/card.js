const Card = props => (
  <div className="card">
    <a
      text={props.text}
      href={props.link}
      target={props.link.substring(0, 5) != 'https' ? '_self' : '_blank'}
    >
      {props.img && <img src={props.img} />}
      {props.title && <h3>{props.title}</h3>}
      {props.text && <p>{props.text}</p>}
      {props.community && <div className="community">community</div>}
    </a>
    <style jsx>{`
      .card {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        background: #fff;
        width: 33.333%;
        min-width: 150px;
        padding: 20px 10px;
        box-sizing: border-box;
        transition: all 0.3s ease;
        color: #666666;
      }
      a {
        width: 100%;
        position: relative;
        text-decoration: none;
        color: inherit;
      }
      .card:hover {
        background: #efefef;
      }
      img {
        height: 50px;
        width: auto;
      }

      h3 {
        font-size: 95%;
      }

      p {
        font-size: 14px;
      }

      .community {
        position: absolute;
        top: 40px;
        right: -10px;
        transform: rotate(270deg);
        text-transform: uppercase;
        font-size: 10pt;
        letter-spacing: 3px;
        opacity: 0.25;
      }

      @media screen and (max-width: 640px) {
        .community {
          position: relative;
          transform: rotate(0deg);
          top: -5px;
          right: 0;
        }
      }
    `}</style>
  </div>
)

export default Card

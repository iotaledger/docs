import Embed from 'react-runkit'

const code = () => (
  <Embed
    source={`
// Require the use of IOTA library
const Iota = require('@iota/core')

// Create a new instance of the IOTA class object.
// Use 'provider' variable to specify which Full Node to talk to
const iota = Iota.composeAPI({
  provider: 'https://nodes.devnet.iota.org:443'
})

// Call the 'getNodeInfo call to check that the node is working
iota.getNodeInfo()
    .then(info => console.log(info))
    .catch(err => {})
`}
  />
)

export default code

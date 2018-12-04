import Embed from 'react-runkit'

const code = () => (
  <Embed
    source={`
const Iota = require('@iota/core')
const Converter = require('@iota/converter')

const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    })

iota.getNodeInfo()
    .then(info => console.log(info))
    .catch(err => {})

const address =
    'HELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD'
const seed =
    'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX'
const message = Converter.asciiToTrytes('Hello World!')

const transfers = [
    {
    value: 0,
    address: address,
    message: message
    }
]

iota.prepareTransfers(seed, transfers)
    .then(trytes => iota.sendTrytes(trytes, (depth = 3), (mwm = 9)))
    .then(bundle => {
        console.log(bundle)
    }).catch(err => {
        // catch any errors
    })
`}
  />
)

export default code

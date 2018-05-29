import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'
import Image from '../../../components/image'

import { lewi } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'Seed Generation',
  date: '3 May 2018',
  authors: [lewi],
  editUrl: 'pages/trinity/setup/seed-generation.js',
})(markdown(components)`
**Follow the wallet’s on-screen steps to generate a seed**

After the app has generated a random seed, we recommend you tap between 
5 and 10 individual letters to further randomize the seed. When the 
seed is finalized, you need to save it with at least one of the listed options. 

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/trinity/seed-generate.jpg`}
    width={320}
    height={630}
    caption="Seed generation matrix"
  />
}

Pressing a character in the grid will change it.

`)

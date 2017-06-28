# ZEIT Documentation

This is the public documentation for **ZEIT now** all other related services.<br/>
You can access this documentation online at https://zeit.co/docs .

### Running Locally

Download the copy of this repostory. 

~~~sh
git clone https://github.com/zeit/docs-public.git
~~~

Then visit to the downloaded repository and install dependencies with:

~~~sh
npm install 
~~~

Then you can run the app with:
(The app is written in [Next.js](https://github.com/zeit/next.js))

~~~sh
npm run dev
~~~

Now the documentation is running at http://localhost:5800

### Editing Docs Content

You can find the source of the documentation inside the `pages/docs` directory. Documentation is mostly written in markdown with the help of some React components.

Those components give us additional features which are not available in markdown.

### Adding New Docs

You can start writing the new docs page by adding it to the `pages/docs` directory starting with the following code:

~~~js
import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'The Title for the New Guide',
  date: '23 June 2017',
  authors: [],
})(markdown(components)`

This is the content written in Markdown.

${
  <TerminalInput># this is how we show the terminal input</TerminalInput>  
}

`)
~~~

Then you can add it to the sidebar by editing the file located at: `lib/data/docs.js`.

### Adding Images and Assets

You can add images and assets into the `static` directory. Always try to avoid using hosted images. 
If you are creating a new docs page, keep you images inside a subdirectory under `static/docs`.

### New Components

Always try to use the existing components and features in markdown. Create a new component or use a component from NPM, unless there is no other option.

### Submiting Changes / New Doc Pages

You can simply send a PR. It's simple as that.

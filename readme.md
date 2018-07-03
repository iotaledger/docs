# IOTA Documentation

This is the public documentation to introduce **IOTA**.<br/>
You can access this documentation online at https://docs.iota.org/ .

### Running Locally

Download the copy of this repostory.

```sh
git clone https://gitlab.com/iota-foundation/doc/documentation.git
```

Then visit to the downloaded repository and install dependencies with:

```sh
npm install
```

Then you can run the app with:
(The app is written in [Next.js](https://github.com/zeit/next.js))

```sh
npm run dev
```

Now the documentation is running at http://localhost:5800

### Editing Docs Content

You can find the source of the documentation inside the `pages` directory. Documentation is mostly written in markdown with the help of some React components.

Those components give us additional features which are not available in markdown.

### Adding New Docs

You can start writing the new docs page by adding it to the `pages` directory starting with the following code:

```md
import { withRouter } from 'next/router'
import WithMDX from '../../../lib/with-mdx'

import { TerminalInput } from "../../../components/text/terminal"

export const page = {
title: 'Example Page',
date: '19 Feburary 2018',
editUrl: 'pages/path/for-editing/on-github.mdx',
}

export default withRouter(props => WithMDX(props, page))

# H1 Title

This is the content written in Markdown.

<TerminalInput># this is how we show the terminal input</TerminalInput>x
```

Then you can add it to the sidebar by editing the file located at: `lib/data/docs.js`.

These docs use [MDX](https://github.com/mdx-js/mdx): a powerful parser, loader and renderer for JSX. See how the library works [here](https://github.com/mdx-js/specification).

### Adding Images and Assets

You can add images and assets into the `static` directory. Always try to avoid using hosted images.
If you are creating a new docs page, keep you images inside a subdirectory under `static/docs`.

### New Components

Always try to use the existing components and features in markdown. Create a new component or use a component from NPM, unless there is no other option.

### Submitting Changes / New Doc Pages

You can simply send a PR. It's simple as that.

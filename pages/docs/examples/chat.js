import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import Image from '../../../components/image'
import { Code } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'
import { InternalLink } from '../../../components/text/link'

// prettier-ignore
export default withDoc({
  title: 'Building a Realtime Chat Webapp',
  date: '23 Feb 2017',
  authors: [leo],
})(markdown(components)`

Writing a chat application with popular web applications stacks like LAMP (PHP) has traditionally been very hard. It involves polling the server for changes, keeping track of timestamps, and it’s a lot slower than it should be.

Sockets have traditionally been the solution around which most realtime chat systems are architected, providing a bi-directional communication channel between a client and a server.

This means that the server can push messages to clients. Whenever you write a chat message, the idea is that the server will get it and push it to all other connected clients.

## Requirements

Before we get started, please make sure that your instance of Node is up-to-date. You should have the latest "Current" release (compare it with [this](https://nodejs.org/)). If it's not, click on the download button on the site and get yourself the newest version.

You can use this command to check the version tag of your local instance:

${<TerminalInput>node -v</TerminalInput>}

Once the output of the command matches the latest version on the site, go on to the next section.

## Setup

As the first step, we need to setup a simple HTML webpage that shows a form (which can contain the message to sent) and a list of messages sent before.

In turn, the first thing we'll do is create a new directory and move into it:

${
  <Code>
    {`{
  "name": "realtime-chat",
  "scripts": {
    "start": "node index"
  },
  "dependencies": {
    "express": "latest"
  }
}`}
  </Code>
}

The code above tells ${<Now color="#000" />} the name of the project ("realtime-chat") and also indicates that [Node.js](https://nodejs.org/) needs to install the latest version of the [express](https://www.npmjs.com/package/express) package (which will be used for serving our code to the user). To install the \`dependencies\`, you now need to run this command inside your terminal:

${<TerminalInput>npm install</TerminalInput>}

Now that [express](https://www.npmjs.com/package/express) is handled, you need to create a \`index.js\` file inside the directory and insert the following code:

${
  <Code>
    {`const app = require('express')()
const server = require('http').Server(app)

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>')
})

server.listen(4000, () => {
  console.log('The server is running: http://localhost:4000')
})`}
  </Code>
}

This translates into the following:

* Express initializes \`app\` to be a function handler that you can supply to an HTTP server (as seen in line 2).
* We define a route handler \`/\` that gets called when we hit our website home.
* We make the HTTP server available on port 3000.

Now, when running \`npm run start\` inside your terminal, you should see the following:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/realtime-chat/server.png`}
    width={550}
    height={345}
  />
}

And when pointing your browser to the address shown (\`http://localhost:4000\`):

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/realtime-chat/hello-world.png`}
    width={550}
    height={307}
  />
}

## Serving HTML

So far in \`index.js\`, we’re calling \`res.send\` and passing it a HTML string. Our code would look very confusing if we just placed our entire application’s HTML there. Instead, we’re going to create a \`index.html\` file and serve it.

Let’s refactor our route handler to use \`sendFile\` instead:

${
  <Code>
    {`app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})`}
  </Code>
}

And populate \`index.html\` with the following:

${
  <Code>
    {`<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font: 13px Helvetica, Arial; }
  form { background: grey; padding: 10px; position: fixed; bottom: 0; width: 100%; }
  form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
  form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
  #messages { list-style-type: none; margin: 0; padding: 0; }
  #messages li { padding: 5px 10px; }
  #messages li:nth-child(odd) { background: #eee; }
</style>

<ul id="messages"></ul>

<form action="">
  <input id="m" autocomplete="off" /><button>Send</button>
</form>`}
  </Code>
}

If you restart the process (by hitting \`control + C\` and running \`npm run start\` again) and refresh the page it should look like this:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/realtime-chat/form.png`}
    width={550}
    height={307}
  />
}

## Integrating Web Sockets

To handle these, we'll be using the [socket.io](https://socket.io/) project. It consists of two packages:

* A server that integrates with (or mounts on) the Node.JS HTTP Server: \`socket.io\`
* A client library that loads on the browser side: \`socket.io-client\`

During development, \`socket.io\` serves the client automatically for us, as we’ll see, so for now we only have to install one module:

${<TerminalInput>npm install --save socket.io</TerminalInput>}

That will install the module and add the dependency to \`package.json\`. Now let’s edit \`index.js\` to load it:

${
  <Code>
    {`const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  console.log('a user connected')
})

server.listen(4000, () => {
  console.log('The server is running: http://localhost:4000')
})`}
  </Code>
}

Notice that I initialize a new instance of \`socket.io\` by passing the \`server\` (the HTTP server) object. Then I listen on the \`connection\` event for incoming sockets, and I log it to the console.

Now, in \`index.html\`, we need to add the following snippet before the \`</body>\` closing tag:

${
  <Code>
    {`<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js"></script>

<script>
  var socket = io()
</script>`}
  </Code>
}

That’s all it takes to load the \`socket.io-client\` package, which exposes a \`io\` global, and then connect.

Notice that I’m not specifying any URL when I call \`io()\`, since it defaults to trying to connect to the host that serves the page. If you now reload the server and the website you should see the console print “a user connected”.

Try opening several tabs, and you’ll see several messages:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/realtime-chat/connected.png`}
    width={550}
    height={345}
  />
}

Each socket also fires a special \`disconnect\` event:

${
  <Code>
    {`io.on('connection', socket => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})`}
  </Code>
}

Then if you refresh a tab several times you can see it in action:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/realtime-chat/disconnected.png`}
    width={550}
    height={345}
  />
}

## Emitting Events

The main idea behind Socket.IO is that you can send and receive any events you want, with any data you want. Any objects that can be encoded as JSON will do, and binary data is supported too.

Let’s make it so that when the user types in a message, the server gets it as a \`chat message\` event. The \`scripts\` section in \`index.html\` should now look as follows:

${
  <Code>
    {`<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js"></script>
<script src="https://code.jquery.com/jquery-1.11.1.js"></script>

<script>
  $(() => {
    var socket = io()

    $('form').submit(() => {
      socket.emit('chat message', $('#m').val())
      $('#m').val('')

      return false
    })
  })
</script>`}
  </Code>
}

And in the \`index.js\` file, we print out the chat message event:

${
  <Code>
    {`io.on('connection', socket => {
  socket.on('chat message', msg => {
    console.log('message: ' + msg)
  })
})`}
  </Code>
}

Now, after you've restarted the server again, you should see the messages you're typing and sending within the form appear inside the terminal. If that's the case, go on to the next section!

## Broadcasting

The next goal is for us to emit the event from the server to the rest of the users.

In order to send an event to everyone, Socket.IO gives us the \`io.emit\`:

${
  <Code>
    {`io.emit('some event', {
  for: 'everyone'
})`}
  </Code>
}

If you want to send a message to everyone except for a certain socket, we have the \`broadcast\` flag:

${
  <Code>
    {`io.on('connection', socket => {
  socket.broadcast.emit('hi')
})`}
  </Code>
}

In this case, for the sake of simplicity we’ll send the message to everyone, including the sender.

${
  <Code>
    {`io.on('connection', socket => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg)
  })
})`}
  </Code>
}

And on the client side when we capture a \`chat message\` event we’ll include it in the page. The total client-side JavaScript code now amounts to the following snippet:

${
  <Code>
    {`<script>
  $(() => {
    var socket = io()

    $('form').submit(() => {
      socket.emit('chat message', $('#m').val())
      $('#m').val('')

      return false
    })

    socket.on('chat message', msg => {
      $('#messages').append($('<li>').text(msg))
    })
  })
</script>`}
  </Code>
}

And that completes our chat application, in about **20 lines of code**! You can now send messages between two clients:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/realtime-chat/result.gif`}
    width={600}
    height={572}
  />
}

## Deploying the App

Once the realtime chat works as expected, we can deploy it by running this command:

${<TerminalInput>now</TerminalInput>}

Once ${<Now color="#000" />} has finished uploading the files, you'll see a URL that points to your freshly created chat. This means that you can already share the URL with other people across the globe and have them chat with you.


But in the case of a real website (not used for testing purposes), you would now have to ${<InternalLink href="/docs/features/aliases">assign an alias</InternalLink>} to it.
`)

import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { rase, rauchg, jamo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import Image from '../../../components/image'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'App Lifecycle and Scalability',
  date: '09 March 2017',
  authors: [rase, rauchg, jamo],
})(markdown(components)`

In this guide, we are going to have a look at how ${<Now color="#000"/>} deploy and manage your app inside it's infrastructure.

## App Lifecycle

${
  <Image
    src={`${IMAGE_ASSETS_URL}/api/deployment-state.png`}
    width={600}
    height={267}
  />
}

Your app's deployments flow through a certain set of states throughout their lifecycle.

* **DEPLOYING**: Files an deployment metadata is collected to boot it up.
* **BOOTED**: When a deployment is first created, it's running environment is prepared and started. After this is completed, the state is set to \`BOOTED\`.
* **BUILDING**: After the deplomyent infrastructure is up and running, the deployment is built. For \`docker\` based deployments, this means \`docker build\` and persisting the resulting docker image.<br/>
For \`npm\` based deployments it means running \`npm install\` and \`npm run build\`. Static deployments currently don't have a build step and jump directly to \`READY\`.
* **READY** or **BUILD_ERROR**: If the build as successful, the deployment will start and move to the \`READY\` state, which means it's ready to receive and serve traffic. For \`npm\` deploymenst it means \`npm start\`, and for \`docker\` deployments \`docker run\`.

If, however, the build is unsuccessful, the deployment ends up in a \`BUILD_ERROR\` state, and logs can be inspected to see what went wrong. In this case the deployment will not be retried.

In addition to the state flow of new deployments, there is a somewhat separate flow of states that the deployment transitions to after it has been successfully deployed.

A deployment can be frozen if its minimum instance count is set to 0 (the default), if it doesn't get much traffic. When it's accessed later, it will transition back to \`READY\` state from a snapshot.

The deployment can also permanently move to a \`DEPLOYMENT_ERROR\` state, if it starts to crash time and time again quickly after it's started.

## Instances & Scaling

A deployment by default runs between zero to one instance, meaning it eiter runs one copy of the application, or is frozen due to lack of traffic. This amount of instances can be decided manually using the \`now scale\` command.

If the minimum and maximum amount of instances are not the same, the deployment will be automatically scaled between those values depending on the amount of traffic and its throughput. For example, if an application has been scaled with the following command:

${<TerminalInput>{'now scale https://my-app-tnhnoahecha.now.sh 3 10'}</TerminalInput>}

Then at any given time, the application will have 3-10 active instances depending on how much it is receiving traffic, and the process of deciding the right amount of copies is automated.

Automatic scaling depends on the performance of the deployment, incoming bandwidth and overall instance throughput. Every time we make an automated scaling decision, or now scale affects the deployment's scale, it can be seen in events.

The minimum and the maximum can be equal, which means the application will never be scaled up or down until requested. The application never sleeps if minimum instances is set to a value larger than zero. For example, the following command will result in an application that always runs exactly one copy.

${<TerminalInput>{'now scale https://my-app-tnhnoahecha.now.sh 1'}</TerminalInput>}

Instances are reported as unique instance identifiers and their corresponding instance specific access URLs. An instance id is tied to a specific occurrence of the deployment, so if you scale an application up and down, the instance the removed and added instances will have different instance ids. Similarly, if an instance restarts due to for example, an error, the instance id will remain the same.

When an instance restarts for any reason (or exit code), we automatically restart the instance, so supervisor-like wrappers are not necessary. For example \`forever\`, \`nodemon\` or \`pm\` are not necessary for an application to always stay running.
`)

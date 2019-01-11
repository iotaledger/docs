import { withRouter } from 'next/router'
import WithMDX from '../../../lib/with-mdx'

import { lewi } from '../../../lib/data/team'

export const page = {
title: 'Compass Simple Setup',
date: '4 Sep 2018',
authors: [lewi],
editUrl: 'pages/compass/quick-start/simple-install.md',
}

export default withRouter(props => WithMDX(props, page))

In this guide, we set up a private IOTA network that includes the following components:
* A single IRI node
* A Compass Coordinator (Compass) that sends milestone transactions to the IRI node

For this basic setup we install both the IRI node and Compass on the same computer.

After you complete this tutorial you will be able to interact with your private IOTA network using your favorite tools and libraries.

## Requirements

* To run Compass, your computer must meet the following minimum requirements:

	* A Ubuntu 18.04 Server or a virtual machine
	* At least 8GB RAM
	* Preferably 4 or more CPU cores. The more CPU cores, the faster the Merkle tree will be generated.
	* At least a 10GB SSD

## Setting up the dependencies

Compass needs [Bazel](https://bazel.build/) to be built and [Docker](https://www.docker.com/) to be run, so make sure that both are installed on your computer.

1. Install the Bazel dependencies:
	
	```bash
	sudo apt-get install pkg-config zip g++ zlib1g-dev unzip python
	```

2. Download the latest Bazel installer:
	
	```bash
	wget https://github.com/bazelbuild/bazel/releases/download/0.18.0/bazel-0.18.0-installer-linux-x86_64.sh
	```

3. Execute this script:
	
	```bash
	chmod +x bazel-0.18.0-installer-linux-x86_64.sh
	```

4. Install Bazel under the current active user, using the `--user` flag:
	
	```bash
	./bazel-0.18.0-installer-linux-x86_64.sh --user
	```

5. Install Docker:
	
	```bash
	sudo apt install apt-transport-https ca-certificates curl software-properties-common
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
	sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
	sudo apt update
	sudo apt install docker-ce
	```

6. Install the jq tool:
	
	```bash
	sudo apt install curl jq
	```
	
**Note:** The jq tool is a command-line JSON processor that helps you to display and manipulate JSON data. This tool is optional.

## Creating the milestone Merkle tree

Before you can set up Compass, you need to generate a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree). This Merkle tree make sure that every milestone has the Compass's fixed address as its root, which is known by each IRI node in your private IOTA network. This way, the IRI can validate a milestone by finding the root of the Merkle tree and comparing it to the Compass's fixed address. Only a valid Compass has the correct seed that can create valid milestones on your IOTA network.

The amount of milestones that Compass can send is based on the depth of the Merkle tree. For example, a depth of 16 creates a Merkle tree that has 2<sup>16</sup> leaf nodes, resulting in a maximum of 65536 milestones. In this example, if Compass were to send milestones every minute, it would be able to run 2<sup>depth</sup> minutes before it ran out of milestones.

**Note:** The greater the depth, the longer it takes to generate the Merkle tree. For this guide, we use a depth of 16, which allows us to run Compass for 45 consecutive days at 1-minute milestone intervals. Calculating the Merkle tree for this depth will not take long. For a comparison, a depth of 24 would allow you to run Compass for over 31 years but it would take a lot of CPU hours to generate the Merkle tree. Whereas, a depth of 8 would allow you to run Compass for only a couple of hours, and will take a couple of seconds to generate the Merkle tree

1. Clone the GitHub repo for Compass:

	```bash
	git clone https://github.com/iotaledger/compass.git
	cd compass
	```

2. Build the layers_calculator tool that will generate the Merkle tree:

	```bash
	bazel run //docker:layers_calculator
	```

2. Generate a new seed for your Compass:

	```bash
	cat /dev/urandom |LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1
	```

Copy the output of this command. You'll need to paste it into your configuration file (config.json) in step 4.

3. The Compass repository includes scripts that make it easier for you to start your Compass:

	```bash
	cd docs/private_tangle
	```

4. In this directory, copy the example configuration file:

	```bash
	cp config.example.json config.json
	```

5. Open the `config.json` file in your favorite editor and replace the seed with the seed you generated in step 1: 

	```bash
	nano config.json
	```

6. Replace the `depth` parameter with your chosen depth (in our example we change it to 16). Your `config.json` file should look something like this:

	```json
	{
	  "seed": "MYSEEDHEREPLEASEREPLACEMEIMMEDIATELYWITHSOMETHINGSECURE99999999999999999999999999",
	  "powMode": "CURLP81",
	  "sigMode": "CURLP27",
	  "security": 1,
	  "depth": 16,
	  "milestoneStart": 0,
	  "mwm": 9,
	  "tick": 60000,
	  "host": "http://localhost:14265"
	}
	```

7. Make sure that Docker is aware of the layers_calculator image:

	```bash
	sudo ../../bazel-bin/docker/layers_calculator
	```

8. Generate the Merkle tree by executing the script in the `docs/private_tangle` directory:

	```bash
	sudo ./01_calculate_layers.sh
	```

This process will take a while (with a 4 core virtual machine it took around 15 minutes with a depth of 16), after the Merkle tree has been generated, the root should be printed to the console output:

```shell
[main] INFO org.iota.compass.LayersCalculator - Calculating 65536 addresses.
...
[main] INFO org.iota.compass.LayersCalculator - Successfully wrote Merkle Tree with root: JMRTYHMGNZGNOLPSSBVLWRPMGIAMOXPLURNDIBKXIFTCJCLOYKH9FMVNKPBVFVMGSUFEYVUUIEARFQXAK
```

This script stores your Merkle tree in the data directory for Compass to access.

## Running the IRI

Before you can run Compass, you need to run the IRI. this is a pretty straightforward process and we have a script for this as well taking our generated Merkle tree root into account. This script uses the default IRI Docker container with some additional parameters. The IRI node uses a snapshot file to set the initial state of the ledger.

1. Create and open the snapshot.txt file:

	```bash
	nano snapshot.txt
	```
	
2. Add the following to the file. The characters on the left of the semicolon are an IOTA address (public key). The number on the right of the semicolon is the amount of IOTAs in the address (the maximum supply).
	
	```shell
	FJHSSHBZTAKQNDTIKJYCZBOZDGSZANCZSWCNWUOCZXFADNOQSYAHEJPXRLOVPNOQFQXXGEGVDGICLMOXX;2779530283277761
	```

**Note:** Don't exceed the maximum supply, the IRI might not work if you do.

3. Run the IRI:

	```bash
	sudo ./02_run_iri.sh
	```

In the console output, you should see that the IRI is outputting data. You can use CTRL+C in the console to go back to your shell session. The IRI will continue to run in the background.

## Running Compass

After you've generated the Merkle tree and installed IRI, you can run Compass.

1. Build Compass in your compass directory:

	```bash
	cd ~/compass/
	bazel run //docker:coordinator
	```

2. Run the Docker container:

	```bash
	sudo ../../bazel-bin/docker/coordinator
	```

3. Run Compass:

	```bash
	sudo ./03_run_coordinator.sh -bootstrap -broadcast
	```

In the console output, you should see that Compass is issuing milestones. Great! You have a private IOTA network!

**Note:** Compass will stop working if it runs out of milestones. To avoid running out of milestones, you should specify a greater `depth` parameter when [creating the milestone Merkle tree](#creating-the-milestone-merkle-tree).

## Testing your network

Connect to your IRI node on port 14265 by using a client such as the Trinity wallet or a client library. After your client is connected to the IRI node, try interacting with the IRI through the [REST API](https://iota.readme.io/reference).

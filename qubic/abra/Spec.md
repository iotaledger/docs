## Abra

Abra describes recursive trinary dataflow. It is a dataflow-oriented computation language.
Abra is composed of lookup tables and trit vectors (and constants), which are combined to create functions and branches, which may be recursive.
Branches attached to environments are called entities.
The inputs to and outputs from entities are called effects.
Effects which are sent to environments defined by entity metadata affect other entities belonging to those environments.
Branches are defined as a list of sizes of inputs, and a list of dataflow sites which may be marked as stateful and output.

#### Terms

> Branch : much like a function. it can have state, and can recursively invoke itself. 
recursive invokations of branches are new instances of the branch; if it is stateful, then it is a new state in each recursive path.

> Knot: an invocation of a branch which outputs to a site in the dataflow of a branch

> Lookup Table: 3-input, 1-output, which only returns a non-null value where defined

> Entity: an entrypoint branch which receives input effects from many environments, sends output effects to many environments

> Environment: an address to which effects are sent. Effects are length-extended or cropped, depending on Entity input size.

> Effect: a non-null trit vector sent between effects

#### Trit encoding spec

Attachment metadata:

We have a list of entities and their attachment metadata. Incoming, they have a `limit`, per belonging environment, on the number of times they may be invoked in a time `quant` (positive integer). They have a `delay` in number of `quants`, per outgoing environment, before the effects will affect the entities of that environment. They have a maximum `depth` of recursion, counted as the maximum number of branches which may be attached. A depth of `0` will not traverse any branches.

Entity attachment:
[ code hash (243 trits)
, number of attachments (positive integer)
, attachments...
]

Attachment:
[ entity index (positive integer)
, maximum depth (positive integer)
, number of input environments (positive integer)
, input environment data...
, number of output environments (positive integer)
, output environment data...
]

code:
[ tritcode version (positive integer [0])
, number of blocks (positive integer)
, blocks ...
]

input environment data:
[ environment hash
, limit (positive integer)
]

output environment data:
[ environment hash
, delay (positive integer)
]


block:
[ number of trits in block definition (positive integer)
, branch / lut / import
, value...
]

branch:
[ number of inputs (positive integer)
, input lengths (positive integers)...
, number of sites (positive integer)
, sites...
]

site:
[ site is output? 1 trit (1/-)
, site is stateful? 1 trit (1/-)
, merge / constant / knot? 1 trit (1/0/-)
, merge/knot: {
  , number of sites as inputs to knot/merge (positive integer)
  , indices of sites (positive: inputs to knot; zero: current value of this site {requires stateful set}, negative: sites within current knot preceeding current site)
  }
, knot: { branch index (if knot is set) }
, constant: encoded value (positive integer number of trits, trinary value)
]

lut:
[ number of inputs (1,2,3): 1 trit (0/1/-)
, number of cells (positive integer)
, cells...
]

cell:
[ input values... (1-3 trits, dependent on number of inputs)
, output value (1 trit)
]

external block:
[ hash location of code
, block index in code (positive integer)
]


#### Encoding
Positive integers (as listed above) are encoded as binary.1/-, little endian, terminated with 0.

Site indices may be positive or negative, so the minimum number of trits to encode the site is given first (positive integer), followed by the site value. `0` indicates both 0 trits and the value `0`. `101` encodes `1`, `10-` encodes `minus 1`, `1101--` encodes `minus 11`.

##### To determine
Changes to this spec may be necessary to determine fitness for the following:

1. Distributed Computing - may be defined in branches and metadata
2. Parallel Computing
3. Concurrent Computing
4. Real-time Computing
5. Lockstep Computing
6. Virtualization
7. ANN-friendliness

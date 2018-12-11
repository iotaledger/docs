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
```
 Knot: an invocation of a branch which outputs to a site in the dataflow of a branch

 Lookup Table: 3-input, 1-output, which only returns a non-null value where defined

 Entity: an entrypoint branch which receives input effects from many environments, sends output effects to many environments

 Environment: an address to which effects are sent. Effects are length-extended or cropped, depending on Entity input size.

 Effect: a non-null trit vector sent between effects

 Branch: much like a function in traditional programming paradigms. It has an exact input size and an exact return size. Its output is serialized as each site marked as "output" in the order it appears.

 Site: a vertex in our dataflow graph within a branch, representing a constant, a result of a branch invocation, or a merging of other sites.
 
 Memory Latch: a stateful site whose new value will be usable in the next invocation of the same branch.
 
 Merge: in a water analogy, a wye terminating in one output. Multiple sites can be selected from, where the merging site's value will be the unique non-null vector of the many site inputs to the merger.
```

#### Trit encoding spec

Attachment metadata:

We have a list of entities and their attachment metadata. Incoming, they have a `limit`, per belonging environment, on the number of times they may be invoked in a time `quant` (positive integer). They have a `delay` in number of `quants`, per outgoing environment, before the effects will affect the entities of that environment. They have a maximum `depth` of recursion, counted as the maximum number of branches which may be attached. A depth of `0` will not traverse any branches.

Attachment transactions are kept separate from the dataflow definition transactions for purposes of reusability, to keep entities (instantiations) separate from branches (definitions).

```
Entity attachment:
[ code hash (243 trits)
, number of attachments (positive integer)
, attachments...
]

Attachment:
[ entity index (positive integer) // The index of the block/branch in the code which this entity becomes
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
, branch / lut / [external import ] (1 trit: 1/0/-)
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
, site is a memory latch (stateful)? 1 trit (1/-)
, merge / constant / knot? 1 trit (1/0/-)
, merge/knot: {
  , number of sites as inputs to knot/merge (positive integer)
  , indices of sites
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
```

#### Merge / Knot / Sites

A merge has all input sites of identical length; but a knot (a branch invocation) would simply take all vectors as little-endian-packed input, as `b(xxxxyyyyzzzzzz)`.

A knot's definition (as opposed to inputs) may be defined by any of the blocks listed in the definition - branch, lookup table, or externally imported block (which may be lookup table or branch).

In a branch, because these are packed to little-endian, n input vectors could be concatenated or shuffled to select, concatenate, or rearrange by ordering of sites which each merge one input index, and marking the site as output to the branch. In a concatenation example, it uses no lookup tables. A branch which selects a range of trits at an offset which changes dependent on one of its inputs (an index), however, may have many input sites of 1-trit vectors, and use many lookup tables and mergers.

##### Inputs to knot/merge

A site in the dataflow graph is wired feed-forward. However, memory latches may be used anywhere within a branch. Thus, a negative index would refer to any site prior to the current site (-1 would refer to the immediately prior site, -(M+N) for M sites input to the branch plus N internal sites declared before the current site being parsed). An index of 0 would refer to the first site marked as a memory latch in the branch definition.

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

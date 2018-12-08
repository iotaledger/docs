### Background

IOTA transactions reference only 2 other txs, but there are many cases, like in qubic, where arbitrary data be tied to arbitrary number of other data pieces.

### Bundle Fragment

A bundle fragment is a subset of a bundle (an ordered list of transactions through the trunk). A signature for a given input address to a value transfer may take more than one transaction, is one instance of a bundle fragment.

The first transaction in a bundle fragment which points to the rest of it in its trunk direction could be referred to as the bundle fragment tail.

### Vertex

A vertex is a bundle fragment. It points to one data and many vertices. The data is referenced by hash (of its bundle fragment tail) in the extra data digest of the vertex (in its bundle fragment tail). The signature or message fragment of the rest of the bundle fragment contains a list of edges to other vertices (by their bundle fragment tail hash).

The first trit of the tag of each transaction in the vertex bundle fragment can indicate if it is the last transaction in the bundle fragment (1 if last). The last transaction in the vertex bundle fragment can indicate the number of edges following this trit (in 3 or 4 trits, it's a maximum of 27).

### Compound Vertex

One data fragment may have many vertices which point to it. Each vertex is independent of the others, but collectively, these are known as a compound vertex, and may be used to create cyclic graphs in context of data relationships.

### Reflection

For purposes of code reuse and the general advantages of a single-level-store, it is suggested that the graph ixi reflects internally the vertices (published on the tangle, with the edges in the message) into bundles which are not published to neighbors.

The serialized vertex is what is broadcast through the network. The reflected vertex is what we generate locally to reason about these arbitrary graphs.

The head of this bundle should point in its trunk direction to the reflected vertex bundle fragment tail, and to the data bundle fragment tail in its branch. This allows us to find a generated reflected vertex given a serialized vertex, and to find a compound vertex given a data hash, using a `referringTransactions` method.

Every transaction above this should point in its branch direction to the tail hash of the other reflected vertices, one transaction reflected per edge.

### Exposed Functions

```
Hash[] getCompoundVertex(Hash data) // returns all vertices for data hash
Hash[] getReferencingVertices(Hash vertex) // returns all vertices with edges incoming to given vertex.
Hash[] getEdges(Hash vertex) // returns all outgoing edges for the current vertex hash.
Hash getData(Hash vertex) // returns the hash of the data bundle fragment tail

Hash createVertex(Hash data, Hash[] edges) // creates a vertex bundle fragment, returns the tail of it

// attempt to parse/reflect transactions with a given tag fragment at a specified offset
void watchTagFragment(TritVec tagFragment, int offset)

// In iterator fashion:
// returns the next vertex
// if previousVertex is NULL (or is the NULL hash?), give the first vertex
Hash getNextCompoundVertex(Hash data, Hash previousVertex) 
Hash getNextReferencingVertex(Hash vertex, Hash previousVertex)
Hash getNextEdge(Hash vertex, Hash previousEdge)

Hash startVertex(Hash data) // returns the hash of the head created, branch pointing to data
Hash addEdge(Hash edge, Hash midVertexHash, Bool last) // adds a transaction to the bundle started in startVertex, branch pointing to the edge, returns the new transaction hash
Hash finalizeVertex(Hash reflectedTail) // create the bundle fragment ready to attach to the tangle, or to put into a bundle, return the fragment tail 
```

#### Visualization

A bundle containing a vertex bundle fragment
```
                o bundle tail
               /
              o 
             /
            x vertex bundle fragment tail (with up to 27 edges)
           /
          . more vertex edges
         /
        . last tx of vertex edges
       /
      o continuation of bundle ...
     /
    o bundle head
```

The vertex fragment reflected in iota transactions on the local tangle
```
        T
       / \
      o   x
     / \
    o   x
   / \
  o   x
 / \
1   2

T: tail transaction (last created) of reflected vertex bundle
x: tail hash of outgoing reflected vertex edges (like above T)
1: vertex fragment tail (to the serialized vertex)
2: data fragment tail
```

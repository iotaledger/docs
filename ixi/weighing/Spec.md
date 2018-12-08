### Weighing IXI


### Dependent IXI

Timestamp, Graph 

### Background

An arbitrary graph vertex may be referred to by many other graph vertices.
A compound vertex is composed of many vertices which refer to one data hash.
The weight of each compound vertex in a subtangle is the number of individual vertices (same data hash) found within this graph.


### Goals 

The goal of this extension is to calculate the weights of each compound vertex in a subtangle referencing a given root hash over a bounded time window. It will need to make use of the Timestamping IXI to determine confidence intervals for each vertex. 

If the calculated timestamp lower bound of a vertex is greater than the end time, it will not be included. Likewise, if the calculated timestamp upper bound of the vertex is less than the start time, it will not be included. If the start time or end time is to be found within these limits, then the given vertex weight upper bound will be increased, but its lower bound will not change.

It should also be able to return the vertices at the lower and upper bound of the time window so that the calling extension may be able to perform other functions on the window.

### suggested functions

```

// returns total weight of all compound vertices independent of time
Map<Hash, Long> getTotalWeights(Hash root)

// calculates the compound vertex weights over a given time window
// returns a pointer (may be a hash on a local tangle, depending on implementation) 
// to an identifier for iterating or referencing the results of this calculation
Hash calculateVertexWeights(Hash root, Long startTime, Long endTime)

// Should count the number of vertices in the acyclic graph referencing the root vertex
// in a bounded window between startTime and endTime
// weights are in form of lower bound and upper bound
Map<Hash, Pair<Long, Long>> getWeights(Hash identifier)

// returns a list of vertices at the lower bound of the time frame
List<Hash> getLowerVertices(Hash identifier)
// returns a list of vertices at the upper bound of the time frame
List<Hash> getUpperVertices(Hash identifier)

// Alternatively, in iterable form

// get the next id for the iterator
Hash getNextIdentifier(Hash iterator, Hash previousIdentifier)

// get the weight associated with identifier for the given iterator
Pair<Long, Long> getWeight(Hash iterator, Hash identifier)

// iterable form of getLowerVertices,getUpperVertices
Hash getNextLowerVertex(Hash iterator, Hash previousVertex)
Hash getNextUpperVertex(Hash iterator, Hash previousVertex)
```

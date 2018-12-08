### Timestamping IXI

IOTA transactions can declare any timestamp they desire. There are many scenarios when it would be useful to gain as reliable a timestamp as possible given the available information, but were we to just trust the declared time, we would be none the wiser. Once a transaction is attached to the tangle, it cannot change its declared timestamp. We also expect that most transactions would declare as accurate and precise of a time as they can. 

Through the inspection of the declared timestamp as well as other timestamps relative to a transaction in a subtangle, we expect to be able to determine with some confidence the time at which it was attached.

There are ontologies outside the context of the two edges of a single iota transaction, such as arbitrary graphs, which can help us determine timestamps for other transactions which may not fall within the naive tangle. With this, we can hope to reduce our margins of error, and also be able to include normally orphaned transactions into the tangle to determine at the very least some confidence interval.

It should also be noted that enforcement of timestamp (such that time only moves forward) in iota tip selection would also help to minimize our margins of error.

### Goals

Given an IOTA Transaction hash, determine a confidence interval of the time at which it was issued.
Since there are multiple ontologies of the tangle, extra hashes may be given to narrow the confidence interval, thus providing a more precise time.
A user of the Timestamping IXI should be able to provide a transaction hash to inspect for timestamp intervals, as well as provide additional hashes of transactions not known to the native ontology of trunk/branch which can be used to provide the best possible time intervals.

### More info

See [this paper](https://assets.ctfassets.net/r1dr6vzfxhev/4XgiKaTkUgEyW8O8qGg6wm/32f3a7c28022e35e4d5d0e858c0973a9/On_the_timestamps_in_the_tangle_-_20182502.pdf) for more info.

### Suggested Functions

```
// return an identifier (hash reference) for the calculation to be performed
Hash beginTimestampCalculation(Hash txToInspect)

// add helpers from other ontologies
// returns identifiers for these, if more helpers are to be given for each of them
Hash addTimestampHelper(Hash identifier, Hash referringTx)
Hash addTimestampHelpers(Hash identifier, Hash[] referringTx)

// the actual computation should probably be performed on this call
Pair<Long, Long> getTimestampIntervals(Hash identifier)

// return the confidence level (p value) of the calculation
Double getTimestampConfidence(Hash identifier)
```

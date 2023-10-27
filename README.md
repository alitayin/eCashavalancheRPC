# eCashavalancheRPC


## Overview

This is an extremely minimal tool. allow u to use bitcoin-abc's avalanche cli via http api.
If you want to bind it to your own node, 
all you need to do is add the following to your node's `bitcoin.conf`:
rpcuser=yourname
rpcpassword=yourpassword
rpcport=port
rpcallowip=your.ip.address.here
rpcbind=0.0.0.0
server=1

After this, you can simply clone the repository, install the dependencies, and start the application:
npm install
npm start


This document outlines the eCashRPC API endpoints for interacting with the bitcoin-abc(alita's). 
`http://ecashrpc.alitayin.com:3080`

## Endpoints

### `GET /getavalanchepeerinfo`

Returns information about Avalanche peers.

**Parameters:**
- `proofid` (string): The ID of the proof.

**Example:**
```
http://ecashrpc.alitayin.com:3080/getavalanchepeerinfo?proofid=<proofid>
```

### `GET /getavalancheproofs`

Retrieves Avalanche proofs.

**Example:**
```
http://ecashrpc.alitayin.com:3080/getavalancheproofs
```

### `GET /decodeavalanchedelegation`

Decodes an Avalanche delegation.

**Parameters:**
- `delegation` (string): The delegation to decode.

**Example:**
```
http://ecashrpc.alitayin.com:3080/decodeavalanchedelegation?delegation=<delegation>
```

### `GET /verifyavalanchedelegation`

Verifies an Avalanche delegation.

**Parameters:**
- `delegation` (string): The delegation to verify.

**Example:**
```
http://ecashrpc.alitayin.com:3080/verifyavalanchedelegation?delegation=<delegation>
```

### `GET /decodeavalancheproof`

Decodes an Avalanche proof.

**Parameters:**
- `proof` (string): The proof to decode.

**Example:**
```
http://ecashrpc.alitayin.com:3080/decodeavalancheproof?proof=<proof>
```

### `GET /getrawavalancheproof`

Retrieves a raw Avalanche proof.

**Parameters:**
- `proofid` (string): The ID of the proof.

**Example:**
```
http://ecashrpc.alitayin.com:3080/getrawavalancheproof?proofid=<proofid>
```

### `GET /verifyavalancheproof`

Verifies an Avalanche proof.

**Parameters:**
- `proof` (string): The proof to verify.

**Example:**
```
http://ecashrpc.alitayin.com:3080/verifyavalancheproof?proof=<proof>
```

### `GET /getremoteproofs`

Gets the list of remote proofs for the given node id.

**Parameters:**
- `nodeid` (numeric): The node identifier.

**Example:**
```
http://ecashrpc.alitayin.com:3080/getremoteproofs?nodeid=<nodeid>
```

### `GET /getstakingreward`

Returns the staking reward winner based on the previous block hash.

**Parameters:**
- `blockhash` (string): The previous block hash, hex encoded.
- `recompute` (boolean, optional, default=false): Whether to recompute the staking reward winner if there is a cached value.

**Example:**
```
http://ecashrpc.alitayin.com:3080/getstakingreward?blockhash=<blockhash>&recompute=<recompute>


```

### `GET /getproofstatus`

Retrieves the status of the given proof, and validates each UTXO under it.
This is not the native CLI of Bitcoin-ABC, but a hybrid endpoint.

**Parameters:**
- `proof` (string)

**Example:**
```

http://ecashrpc.alitayin.com:3080/getproofstatus?proof=<proof>
```

## Error Handling

In case of an error, the API will respond with a HTTP status code `500` and a JSON object containing more details about what went wrong.

## General Notes

- All endpoints require HTTP GET requests.
- This API is read-only and does not support creating, updating, or deleting data.
- All endpoints return data in JSON format.

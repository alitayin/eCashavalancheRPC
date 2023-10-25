# eCashavalancheRPC

# Documentation

:-)

## Overview

This document outlines the eCashRPC API endpoints for interacting with the Avalanche network. 
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

## Error Handling

In case of an error, the API will respond with a HTTP status code `500` and a JSON object containing more details about what went wrong.

## General Notes

- All endpoints require HTTP GET requests.
- This API is read-only and does not support creating, updating, or deleting data.
- All endpoints return data in JSON format.

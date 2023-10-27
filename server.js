const express = require('express');
const axios = require('axios');
const app = express();
const port = 3080;
const rateLimit = require("express-rate-limit");

// Your RPC info
const rpcURL = '';
const rpcUser = '';
const rpcPassword = '';

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

app.get('/getavalanchepeerinfo', async (req, res) => {
  const proofid = req.query.proofid;

  try {
    const response = await axios.post(rpcURL, {
      jsonrpc: '1.0',
      id: 'curltest',
      method: 'getavalanchepeerinfo',
      params: [proofid]
    }, {
      auth: {
        username: rpcUser,
        password: rpcPassword
      }
    });

    res.send(response.data.result);
  } catch (error) {
    handleRPCError(error, res);
  }
});

app.get('/getavalancheproofs', async (req, res) => {
  try {
    const response = await axios.post(rpcURL, {
      jsonrpc: '1.0',
      id: 'curltest',
      method: 'getavalancheproofs'
    }, {
      auth: {
        username: rpcUser,
        password: rpcPassword
      }
    });

    res.send(response.data.result);
  } catch (error) {
    handleRPCError(error, res);
  }
});

app.get('/decodeavalanchedelegation', async (req, res) => {
  const delegation = req.query.delegation;

  try {
    const response = await axios.post(rpcURL, {
      jsonrpc: '1.0',
      id: 'curltest',
      method: 'decodeavalanchedelegation',
      params: [delegation]
    }, {
      auth: {
        username: rpcUser,
        password: rpcPassword
      }
    });

    res.send(response.data.result);
  } catch (error) {
    handleRPCError(error, res);
  }
});

app.get('/verifyavalanchedelegation', async (req, res) => {
  const delegation = req.query.delegation;

  try {
    const response = await axios.post(rpcURL, {
      jsonrpc: '1.0',
      id: 'curltest',
      method: 'verifyavalanchedelegation',
      params: [delegation]
    }, {
      auth: {
        username: rpcUser,
        password: rpcPassword
      }
    });

    res.send(response.data.result);
  } catch (error) {
    handleRPCError(error, res);
  }
});


app.get('/decodeavalancheproof', async (req, res) => {
  const proof = req.query.proof;

  try {
    const response = await axios.post(rpcURL, {
      jsonrpc: '1.0',
      id: 'curltest',
      method: 'decodeavalancheproof',
      params: [proof]
    }, {
      auth: {
        username: rpcUser,
        password: rpcPassword
      }
    });

    res.send(response.data.result);
  } catch (error) {
    handleRPCError(error, res);
  }
});

app.get('/getrawavalancheproof', async (req, res) => {
  const proofid = req.query.proofid;

  try {
    const response = await axios.post(rpcURL, {
      jsonrpc: '1.0',
      id: 'curltest',
      method: 'getrawavalancheproof',
      params: [proofid]
    }, {
      auth: {
        username: rpcUser,
        password: rpcPassword
      }
    });

    res.send(response.data.result);
  } catch (error) {
    handleRPCError(error, res);
  }
});

app.get('/verifyavalancheproof', async (req, res) => {
  const proof = req.query.proof;

  try {
    const response = await axios.post(rpcURL, {
      jsonrpc: '1.0',
      id: 'curltest',
      method: 'verifyavalancheproof',
      params: [proof]
    }, {
      auth: {
        username: rpcUser,
        password: rpcPassword
      }
    });

    res.send(response.data.result);
  } catch (error) {
    handleRPCError(error, res);
  }
});

app.get('/getremoteproofs', async (req, res) => {
  const nodeid = req.query.nodeid;

  try {
    const response = await axios.post(rpcURL, {
      jsonrpc: '1.0',
      id: 'curltest',
      method: 'getremoteproofs',
      params: [nodeid]
    }, {
      auth: {
        username: rpcUser,
        password: rpcPassword
      }
    });

    res.send(response.data.result);
  } catch (error) {
    handleRPCError(error, res);
  }
});

app.get('/getstakingreward', async (req, res) => {
  const blockhash = req.query.blockhash;
  const recompute = req.query.recompute;

  try {
    const response = await axios.post(rpcURL, {
      jsonrpc: '1.0',
      id: 'curltest',
      method: 'getstakingreward',
      params: [blockhash, recompute]
    }, {
      auth: {
        username: rpcUser,
        password: rpcPassword
      }
    });

    res.send(response.data.result);
  } catch (error) {
    handleRPCError(error, res);
  }
});

app.get('/getproofstatus', async (req, res) => {
  const proof = req.query.proof;

  try {
    // First, decode the proof
    const decodeResponse = await axios.post(rpcURL, {
      jsonrpc: '1.0',
      id: 'curltest',
      method: 'decodeavalancheproof',
      params: [proof]
    }, {
      auth: {
        username: rpcUser,
        password: rpcPassword
      }
    });

    if (!decodeResponse.data.result || !decodeResponse.data.result.stakes) {
      res.status(500).send('Invalid proof or no stakes found');
      return;
    }

    // Then, validate each stake (UTXO)
    const stakes = decodeResponse.data.result.stakes;
    const results = [];
    for (let i = 0; i < stakes.length; i++) {
      const stake = stakes[i];
      const txoutResponse = await axios.post(rpcURL, {
        jsonrpc: '1.0',
        id: 'curltest',
        method: 'gettxout',
        params: [stake.txid, stake.vout]
      }, {
        auth: {
          username: rpcUser,
          password: rpcPassword
        }
      });

      const status = txoutResponse.data.result ? 'valid' : 'invalid';
      results.push({
        index: i + 1,
        txid: stake.txid,
        vout: stake.vout,
        amount: stake.amount,
        height: stake.height, // Added this line
        address: stake.address,
        ecash: stake.ecash,
        status: status
      });
    }

    res.status(200).send(results);
  } catch (error) {
    handleRPCError(error, res);
  }
});

function handleRPCError(error, res) {
  if (error.response) {
    res.status(500).send(error.response.data);
  } else if (error.request) {
    res.status(500).send('No response from RPC server');
  } else {
    res.status(500).send('Error setting up RPC request');
  }
}

app.listen(port, () => {
  console.log(`Server B API is running at http://localhost:${port}`);
});

#!/bin/bash

echo '======================================================================'
echo '============start new ethereum node on R.E.A.P.R.A===================min  ='
#=enode://6d025adb141721c4e35350662f53bb358dba47be39caac071adf3e2b52cd86c69c7ba54fee86c23eeb1c54a1e3d66da5a36734dd05d07595ee21029410261220@52.74.3.198:30301
./geth --datadir ./nodedata --cache 512 init reapraGenesis.json
./geth --networkid 972018 --datadir ./nodedata --cache 512 --port 30303 --maxpeers 50  --ethstats node_$USER:reapra@52.74.3.198:8080  --rpc --rpcport "8545" --rpccorsdomain "*"  --rpcapi "admin,miner,db,eth,net,web3,personal" --bootnodes enode://59efe7e3e9c841751f0253a52c5cade141f102bd8508d431422c95563f185308dfd33c6e9c2929ac581e7e1fdf0266e4adabed5ffda5f32f187316d44c234192@52.74.3.198:30303,enode://6d025adb141721c4e35350662f53bb358dba47be39caac071adf3e2b52cd86c69c7ba54fee86c23eeb1c54a1e3d66da5a36734dd05d07595ee21029410261220@52.74.3.198:30301,enode://8115471b2eb32a748b5c1f0be0a58902a81e4e82427e22b8156094a92b35d23cd8da623c8494f3b0d672f5d326e56c1b44f12c2abd0939a848b70f257f318b56@112.213.91.81:30303  --targetgaslimit 4700000 --gasprice 0
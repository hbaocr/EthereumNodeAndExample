#!/bin/bash

echo '======================================================================'
echo '============start new ethereum node on R.E.A.P.R.A===================min  ='
#=enode://6d025adb141721c4e35350662f53bb358dba47be39caac071adf3e2b52cd86c69c7ba54fee86c23eeb1c54a1e3d66da5a36734dd05d07595ee21029410261220@52.74.3.198:30301
#./geth --datadir ./nodedata --cache 512 init reapraGenesis.json
./parity --chain=./parityChainReapra.json --network-id=972018 --port=30304 --base-path=./parityNode --db-path=./parityNode/data --keys-path=./parityNode/key --identity=$USER --jsonrpc-port=9545  
    --jsonrpc-interface="0.0.0.0"  --jsonrpc-apis="all"  --min-gas-price="0"  --ethstats=node_$USER:reapra@52.74.3.198:8080 --bootnodes=enode://59efe7e3e9c841751f0253a52c5cade141f102bd8508d431422c95563f185308dfd33c6e9c2929ac581e7e1fdf0266e4adabed5ffda5f32f187316d44c234192@52.74.3.198:30303,enode://6d025adb141721c4e35350662f53bb358dba47be39caac071adf3e2b52cd86c69c7ba54fee86c23eeb1c54a1e3d66da5a36734dd05d07595ee21029410261220@52.74.3.198:30301
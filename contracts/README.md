## Lint

```
npm i -g solhint

// Example: lint Track.sol
solhint src/Track.sol
```

## Deploy ERC20 token

```
source .env
forge script script/TestERC20.s.sol:TestERC20Script --fork-url http://localhost:8545 --private-key $PRIVATE_KEY --broadcast 
```

## Deploy Track

```
source .env
forge script script/Track.s.sol:TrackScript --private-key $PRIVATE_KEY --broadcast --rpc-url $RPC_URL
```

## Verify

```
source .env
forge verify-contract 0xd7A661D0503a8c1aa59b235698CeA78DE39481E9 Track --watch --etherscan-api-key $BASESCAN_API_KEY --chain-id 8453 --constructor-args $(cast abi-encode "constructor(address,uint256)" 0x4ed4e862860bed51a9570b96d89af5e1b0efefed 42)
```

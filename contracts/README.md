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

## Deploy Track and verify

```
source .env
forge script script/Track.s.sol:TrackScript --private-key $PRIVATE_KEY --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY --rpc-url $RPC_URL

```

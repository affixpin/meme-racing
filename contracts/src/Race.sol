// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

enum RaceState {
    Betting,
    Racing,
    Finished
}

struct Race {
    mapping(uint256 assetId => uint256) bets;
    mapping(uint256 assetId => mapping(address user => uint256)) userBets;
    mapping(address user => uint256) claimed;
    uint256 feeClaimed;
    uint256 totalPot;
    RaceState state;
    uint256 winnerAssetId;
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

import {RaceState} from "./Race.sol";

interface ITrack {
    function bet(uint256 raceId, uint256 assetId, uint256 value) external;
    function claim(uint256 raceId) external;
    function claimFee(uint256 raceId) external;
    function finish(uint256 raceId, uint256 winnerAssetId) external;
    function getAssetBets(uint256 raceId, uint256 assetId) external view returns (uint256 bets);
    function getAvailableFee(uint256 raceId) external view returns (uint256 available);
    function getBettingToken() external view returns (address bettingToken);
    function getClaimed(uint256 raceId, address user) external view returns (uint256 claimed);
    function getFee() external view returns (uint256 fee);
    function getFeeClaimed(uint256 raceId) external view returns (uint256 feeClaimed);
    function getRewards(uint256 raceId, address user) external view returns (uint256 rewards);
    function getState(uint256 raceId) external view returns (RaceState state);
    function getTotalPot(uint256 raceId) external view returns (uint256 totalPot);
    function getUserBets(uint256 raceId, uint256 assetId, address user) external view returns (uint256 userBets);
    function getWinnerAssetId(uint256 raceId) external view returns (uint256 winnerAssetId);
    function start(uint256 raceId) external;
}

// SPDX-License-I/entifier: UNLICENSED
pragma solidity 0.8.25;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {Race, RaceState} from "./Race.sol";
import {ITrack} from "./ITrack.sol";

contract Track is ITrack, Ownable {
    using SafeERC20 for ERC20;

    mapping(uint256 raceId => Race race) private _races;
    address private immutable _bettingToken;
    uint256 private immutable _fee;

    error NothingToClaim();
    error WrongState();

    modifier onlyBettingState(uint256 raceId) {
        if (_races[raceId].state != RaceState.Betting) {
            revert WrongState();
        }
        _;
    }

    modifier onlyFinishedState(uint256 raceId) {
        if (_races[raceId].state != RaceState.Finished) {
            revert WrongState();
        }
        _;
    }

    modifier onlyRacingState(uint256 raceId) {
        if (_races[raceId].state != RaceState.Racing) {
            revert WrongState();
        }
        _;
    }
    

    // fee specified in perthousand, e.g. 500 means 50%
    constructor(address bettingToken, uint256 fee) Ownable(msg.sender) {
        _bettingToken = bettingToken;
        _fee = fee;
    }

    function start(uint256 raceId) public override onlyOwner {
        _races[raceId].state = RaceState.Racing;
    }

    function finish(uint256 raceId, uint256 winnerAssetId) public override onlyOwner onlyRacingState(raceId) {
        Race storage race = _races[raceId];

        race.winnerAssetId = winnerAssetId;
        race.state = RaceState.Finished;
    }

    function bet(uint256 raceId, uint256 assetId, uint256 value) public override onlyBettingState(raceId) {
        Race storage race = _races[raceId];

        SafeERC20.safeTransferFrom(ERC20(_bettingToken), msg.sender, address(this), value);
        race.bets[assetId] += value;
        race.userBets[assetId][msg.sender] += value;
        race.totalPot += value;
    }

    function claim(uint256 raceId) public override onlyFinishedState(raceId) {
        uint256 rewards = getRewards(raceId, msg.sender);

        if (rewards == 0) {
            revert NothingToClaim();
        }

        _races[raceId].claimed[msg.sender] += rewards;

        SafeERC20.safeTransfer(ERC20(_bettingToken), msg.sender, rewards);
    }

    function claimFee(uint256 raceId) public override onlyFinishedState(raceId) onlyOwner {
        uint256 available = getAvailableFee(raceId);

        if (available == 0) {
            revert NothingToClaim();
        }

        _races[raceId].feeClaimed += available;

        SafeERC20.safeTransfer(ERC20(_bettingToken), msg.sender, available);
    }

    function getUserBets(uint256 raceId, uint256 assetId, address user)
        public
        view
        override
        returns (uint256 userBets)
    {
        userBets = _races[raceId].userBets[assetId][user];
    }

    function getFeeClaimed(uint256 raceId) public view override returns (uint256 feeClaimed) {
        feeClaimed = _races[raceId].feeClaimed;
    }

    function getAssetBets(uint256 raceId, uint256 assetId) public view override returns (uint256 bets) {
        bets = _races[raceId].bets[assetId];
    }

    function getTotalPot(uint256 raceId) public view override returns (uint256 totalPot) {
        totalPot = _races[raceId].totalPot;
    }

    function getState(uint256 raceId) public view override returns (RaceState state) {
        state = _races[raceId].state;
    }

    function getClaimed(uint256 raceId, address user) public view override returns (uint256 claimed) {
        claimed = _races[raceId].claimed[user];
    }

    function getWinnerAssetId(uint256 raceId) public view override returns (uint256 winnerAssetId) {
        winnerAssetId = _races[raceId].winnerAssetId;
    }

    function getBettingToken() public view override returns (address bettingToken) {
        bettingToken = _bettingToken;
    }

    function getFee() public view override returns (uint256 fee) {
        fee = _fee;
    }

    function getAvailableFee(uint256 raceId) public view override returns (uint256 available) {
        Race storage race = _races[raceId];

        uint256 winnerAssetId = race.winnerAssetId;
        uint256 bets = race.bets[winnerAssetId];
        uint256 claimed = _races[raceId].feeClaimed;
        uint256 totalPot = race.totalPot;

        // case when no one bet on the winner asset
        if (bets == 0 && totalPot != 0) {
            available = totalPot - claimed;
        } else {
            available = (_fee * totalPot) / 1e3 - claimed;
        }
    }

    function getRewards(uint256 raceId, address user) public view override returns (uint256 rewards) {
        Race storage race = _races[raceId];

        uint256 winnerAssetId = race.winnerAssetId;
        uint256 userClaimed = race.claimed[user];
        uint256 userBet = race.userBets[winnerAssetId][user];
        uint256 bets = race.bets[winnerAssetId];

        if (bets == 0) {
            return 0;
        }

        uint256 totalPot = race.totalPot;

        uint256 rewardsWithoutFee = userBet * 1e9 / bets * totalPot / 1e9;
        uint256 rewardsWithFee = rewardsWithoutFee - rewardsWithoutFee * _fee / 1e3;
        rewards = rewardsWithFee - userClaimed;
    }
}

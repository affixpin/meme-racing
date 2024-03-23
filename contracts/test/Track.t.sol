// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

import "forge-std/Test.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {TestERC20} from "../src/TestERC20.sol";
import {Track} from "../src/Track.sol";

contract TrackTest is Test {
    ERC20 erc20;

    function setUp() public {
        erc20 = new TestERC20();
    }

    function test_Claim() public {
        Track track = new Track(address(erc20), 0);
        uint256 raceId = 0;
        address user = address(1);
        deal(address(erc20), user, 600);
        vm.startPrank(user);
        erc20.approve(address(track), 600);

        track.bet(raceId, 0, 200);
        track.bet(raceId, 1, 200);
        track.bet(raceId, 2, 200);

        assertEq(track.getUserBets(raceId, 0, user), 200);
        assertEq(track.getUserBets(raceId, 1, user), 200);
        assertEq(track.getUserBets(raceId, 2, user), 200);
        assertEq(track.getAssetBets(raceId, 0), 200);
        assertEq(track.getAssetBets(raceId, 1), 200);
        assertEq(track.getAssetBets(raceId, 2), 200);
        assertEq(track.getTotalPot(raceId), 600);

        assertEq(erc20.balanceOf(user), 0);
        vm.stopPrank();
        track.start(raceId);
        track.finish(raceId, 0);
        assertEq(track.getRewards(raceId, user), 600);

        vm.startPrank(user);
        track.claim(raceId);

        assertEq(track.getRewards(raceId, user), 0);

        vm.startPrank(user);
        vm.expectRevert(Track.NothingToClaim.selector);
        track.claim(raceId);
        vm.stopPrank();

        vm.expectRevert(Track.NothingToClaim.selector);
        track.claimFee(raceId);
    }

    function test_ClaimWithFee() public {
        // 50% fee
        Track track = new Track(address(erc20), 500);
        uint256 raceId = 0;
        address user = address(1);
        deal(address(erc20), user, 600);

        vm.startPrank(user);
        erc20.approve(address(track), 600);
        track.bet(raceId, 0, 300);
        track.bet(raceId, 1, 300);
        vm.stopPrank();

        track.start(raceId);
        track.finish(raceId, 0);
        assertEq(track.getRewards(raceId, user), 300);
        assertEq(track.getAvailableFee(raceId), 300);

        vm.startPrank(user);
        track.claim(raceId);
        vm.stopPrank();
        track.claimFee(raceId);

        assertEq(track.getRewards(raceId, user), 0);
        assertEq(track.getAvailableFee(raceId), 0);

        vm.startPrank(user);
        vm.expectRevert(Track.NothingToClaim.selector);
        track.claim(raceId);
        vm.stopPrank();

        vm.expectRevert(Track.NothingToClaim.selector);
        track.claimFee(raceId);
    }

    function test_ClaimNoWinnerBets() public {
        // 50% fee
        Track track = new Track(address(erc20), 500);
        uint256 raceId = 0;
        address user = address(1);
        deal(address(erc20), user, 600);

        vm.startPrank(user);
        erc20.approve(address(track), 600);
        track.bet(raceId, 0, 300);
        track.bet(raceId, 1, 300);
        vm.stopPrank();

        track.start(raceId);
        track.finish(raceId, 2);
        assertEq(track.getRewards(raceId, user), 0);
        assertEq(track.getAvailableFee(raceId), 600);

        track.claimFee(raceId);

        assertEq(track.getRewards(raceId, user), 0);
        assertEq(track.getAvailableFee(raceId), 0);

        vm.expectRevert(Track.NothingToClaim.selector);
        track.claimFee(raceId);

        vm.startPrank(user);
        vm.expectRevert(Track.NothingToClaim.selector);
        track.claim(raceId);
        vm.stopPrank();
    }
}

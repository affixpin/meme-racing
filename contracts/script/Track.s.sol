// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

import "forge-std/Script.sol";
import {Track} from "src/Track.sol";

contract TrackScript is Script {
    function run() public {
        vm.broadcast();
        new Track(vm.envAddress("BETTING_TOKEN"), vm.envUint("FEE"));
    }
}

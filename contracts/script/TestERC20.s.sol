// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

import "forge-std/Script.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {TestERC20} from "src/TestERC20.sol";

contract TestERC20Script is Script {
    function run() public {
        vm.broadcast();
        new TestERC20();
    }
}

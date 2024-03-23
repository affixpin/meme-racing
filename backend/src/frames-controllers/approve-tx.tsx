import { TransactionContext } from "frog";

import { config } from "../config";
import { trackContract } from "../dependencies";
import { ERC20Resource } from "../resources/ERC20Resource";

export async function approveTxController(
  c: TransactionContext,
  approveValue: bigint
) {
  const bettingTokenAddress = await trackContract.read.getBettingToken();

  // Send transaction response.
  return c.contract({
    abi: ERC20Resource.abi,
    chainId: config.chainId,
    functionName: "approve",
    args: [trackContract.address, approveValue],
    to: bettingTokenAddress,
  });
}

import { foundry } from "viem/chains";
import {
	createTestClient,
	getContract,
	getContractAddress,
	http,
	parseEther,
	publicActions,
	walletActions,
} from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { TrackResource } from "../src/resources/TrackResource";
import { ERC20Resource } from "../src/resources/ERC20Resource";

export const client = createTestClient({
	chain: foundry,
	mode: "anvil",
	transport: http(),
	account: privateKeyToAccount(generatePrivateKey()),
})
	.extend(publicActions)
	.extend(walletActions);

export async function deployContracts() {
	await client.setBalance({
		address: client.account.address,
		value: parseEther("1"),
	});

	await client.deployContract({
		abi: ERC20Resource.abi,
		account: client.account,
		bytecode: ERC20Resource.bytecode.object,
	});
	const erc20ContractAddress = getContractAddress({
		from: client.account.address,
		nonce: 0n,
	});

	await client.deployContract({
		args: [erc20ContractAddress, 0n],
		abi: TrackResource.abi,
		account: client.account,
		bytecode: TrackResource.bytecode.object,
	});
	const trackContractAddress = getContractAddress({
		from: client.account.address,
		nonce: 1n,
	});

	return {
		erc20ContractAddress,
		trackContractAddress,
		trackContract: getContract({
			abi: TrackResource.abi,
			address: trackContractAddress,
			client,
		}),
		erc20Contract: getContract({
			abi: ERC20Resource.abi,
			address: erc20ContractAddress,
			client,
		}),
	};
}

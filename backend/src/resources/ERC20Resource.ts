export const ERC20Resource = {
	abi: [
		{
			type: "function",
			name: "allowance",
			inputs: [
				{ name: "owner", type: "address", internalType: "address" },
				{ name: "spender", type: "address", internalType: "address" },
			],
			outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "approve",
			inputs: [
				{ name: "spender", type: "address", internalType: "address" },
				{ name: "value", type: "uint256", internalType: "uint256" },
			],
			outputs: [{ name: "", type: "bool", internalType: "bool" }],
			stateMutability: "nonpayable",
		},
		{
			type: "function",
			name: "balanceOf",
			inputs: [{ name: "account", type: "address", internalType: "address" }],
			outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "decimals",
			inputs: [],
			outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "name",
			inputs: [],
			outputs: [{ name: "", type: "string", internalType: "string" }],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "symbol",
			inputs: [],
			outputs: [{ name: "", type: "string", internalType: "string" }],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "totalSupply",
			inputs: [],
			outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "transfer",
			inputs: [
				{ name: "to", type: "address", internalType: "address" },
				{ name: "value", type: "uint256", internalType: "uint256" },
			],
			outputs: [{ name: "", type: "bool", internalType: "bool" }],
			stateMutability: "nonpayable",
		},
		{
			type: "function",
			name: "transferFrom",
			inputs: [
				{ name: "from", type: "address", internalType: "address" },
				{ name: "to", type: "address", internalType: "address" },
				{ name: "value", type: "uint256", internalType: "uint256" },
			],
			outputs: [{ name: "", type: "bool", internalType: "bool" }],
			stateMutability: "nonpayable",
		},
		{
			type: "event",
			name: "Approval",
			inputs: [
				{
					name: "owner",
					type: "address",
					indexed: true,
					internalType: "address",
				},
				{
					name: "spender",
					type: "address",
					indexed: true,
					internalType: "address",
				},
				{
					name: "value",
					type: "uint256",
					indexed: false,
					internalType: "uint256",
				},
			],
			anonymous: false,
		},
		{
			type: "event",
			name: "Transfer",
			inputs: [
				{
					name: "from",
					type: "address",
					indexed: true,
					internalType: "address",
				},
				{ name: "to", type: "address", indexed: true, internalType: "address" },
				{
					name: "value",
					type: "uint256",
					indexed: false,
					internalType: "uint256",
				},
			],
			anonymous: false,
		},
		{
			type: "error",
			name: "ERC20InsufficientAllowance",
			inputs: [
				{ name: "spender", type: "address", internalType: "address" },
				{ name: "allowance", type: "uint256", internalType: "uint256" },
				{ name: "needed", type: "uint256", internalType: "uint256" },
			],
		},
		{
			type: "error",
			name: "ERC20InsufficientBalance",
			inputs: [
				{ name: "sender", type: "address", internalType: "address" },
				{ name: "balance", type: "uint256", internalType: "uint256" },
				{ name: "needed", type: "uint256", internalType: "uint256" },
			],
		},
		{
			type: "error",
			name: "ERC20InvalidApprover",
			inputs: [{ name: "approver", type: "address", internalType: "address" }],
		},
		{
			type: "error",
			name: "ERC20InvalidReceiver",
			inputs: [{ name: "receiver", type: "address", internalType: "address" }],
		},
		{
			type: "error",
			name: "ERC20InvalidSender",
			inputs: [{ name: "sender", type: "address", internalType: "address" }],
		},
		{
			type: "error",
			name: "ERC20InvalidSpender",
			inputs: [{ name: "spender", type: "address", internalType: "address" }],
		},
	],
	bytecode: {
		object:
			"0x608060405234801561001057600080fd5b50604080518082018252600480825263151154d560e21b602080840182905284518086019095529184529083015290600361004b8382610101565b5060046100588282610101565b5050506101c0565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061008a57607f821691505b6020821081036100aa57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156100fc576000816000526020600020601f850160051c810160208610156100d95750805b601f850160051c820191505b818110156100f8578281556001016100e5565b5050505b505050565b81516001600160401b0381111561011a5761011a610060565b61012e816101288454610076565b846100b0565b602080601f831160018114610163576000841561014b5750858301515b600019600386901b1c1916600185901b1785556100f8565b600085815260208120601f198616915b8281101561019257888601518255948401946001909101908401610173565b50858210156101b05787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610721806101cf6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063313ce56711610066578063313ce567146100fe57806370a082311461010d57806395d89b4114610136578063a9059cbb1461013e578063dd62ed3e1461015157600080fd5b806306fdde0314610098578063095ea7b3146100b657806318160ddd146100d957806323b872dd146100eb575b600080fd5b6100a061018a565b6040516100ad919061056a565b60405180910390f35b6100c96100c43660046105d5565b61021c565b60405190151581526020016100ad565b6002545b6040519081526020016100ad565b6100c96100f93660046105ff565b610236565b604051601281526020016100ad565b6100dd61011b36600461063b565b6001600160a01b031660009081526020819052604090205490565b6100a061025a565b6100c961014c3660046105d5565b610269565b6100dd61015f36600461065d565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461019990610690565b80601f01602080910402602001604051908101604052809291908181526020018280546101c590610690565b80156102125780601f106101e757610100808354040283529160200191610212565b820191906000526020600020905b8154815290600101906020018083116101f557829003601f168201915b5050505050905090565b60003361022a818585610277565b60019150505b92915050565b600033610244858285610289565b61024f85858561030c565b506001949350505050565b60606004805461019990610690565b60003361022a81858561030c565b610284838383600161036b565b505050565b6001600160a01b03838116600090815260016020908152604080832093861683529290522054600019811461030657818110156102f757604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064015b60405180910390fd5b6103068484848403600061036b565b50505050565b6001600160a01b03831661033657604051634b637e8f60e11b8152600060048201526024016102ee565b6001600160a01b0382166103605760405163ec442f0560e01b8152600060048201526024016102ee565b610284838383610440565b6001600160a01b0384166103955760405163e602df0560e01b8152600060048201526024016102ee565b6001600160a01b0383166103bf57604051634a1406b160e11b8152600060048201526024016102ee565b6001600160a01b038085166000908152600160209081526040808320938716835292905220829055801561030657826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161043291815260200190565b60405180910390a350505050565b6001600160a01b03831661046b57806002600082825461046091906106ca565b909155506104dd9050565b6001600160a01b038316600090815260208190526040902054818110156104be5760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016102ee565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166104f957600280548290039055610518565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161055d91815260200190565b60405180910390a3505050565b60006020808352835180602085015260005b818110156105985785810183015185820160400152820161057c565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b03811681146105d057600080fd5b919050565b600080604083850312156105e857600080fd5b6105f1836105b9565b946020939093013593505050565b60008060006060848603121561061457600080fd5b61061d846105b9565b925061062b602085016105b9565b9150604084013590509250925092565b60006020828403121561064d57600080fd5b610656826105b9565b9392505050565b6000806040838503121561067057600080fd5b610679836105b9565b9150610687602084016105b9565b90509250929050565b600181811c908216806106a457607f821691505b6020821081036106c457634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561023057634e487b7160e01b600052601160045260246000fdfea26469706673582212203c80febc3187b5d3652cbd4ae13f0fa306914f83f7eb9c840e2a7e549c88a1a664736f6c63430008190033",
		sourceMap:
			"70:46:36:-:0;;;;;;;;;;;;-1:-1:-1;1896:113:26;;;;;;;;;;;;-1:-1:-1;;;1896:113:26;;;;;;;;;;;;;;;;;;;;;;;1962:5;:13;1896:113;1962:5;:13;:::i;:::-;-1:-1:-1;1985:7:26;:17;1995:7;1985;:17;:::i;:::-;;1896:113;;70:46:36;;14:127:39;75:10;70:3;66:20;63:1;56:31;106:4;103:1;96:15;130:4;127:1;120:15;146:380;225:1;221:12;;;;268;;;289:61;;343:4;335:6;331:17;321:27;;289:61;396:2;388:6;385:14;365:18;362:38;359:161;;442:10;437:3;433:20;430:1;423:31;477:4;474:1;467:15;505:4;502:1;495:15;359:161;;146:380;;;:::o;657:543::-;759:2;754:3;751:11;748:446;;;795:1;819:5;816:1;809:16;863:4;860:1;850:18;933:2;921:10;917:19;914:1;910:27;904:4;900:38;969:4;957:10;954:20;951:47;;;-1:-1:-1;992:4:39;951:47;1047:2;1042:3;1038:12;1035:1;1031:20;1025:4;1021:31;1011:41;;1102:82;1120:2;1113:5;1110:13;1102:82;;;1165:17;;;1146:1;1135:13;1102:82;;;1106:3;;;748:446;657:543;;;:::o;1376:1345::-;1496:10;;-1:-1:-1;;;;;1518:30:39;;1515:56;;;1551:18;;:::i;:::-;1580:97;1670:6;1630:38;1662:4;1656:11;1630:38;:::i;:::-;1624:4;1580:97;:::i;:::-;1732:4;;1789:2;1778:14;;1806:1;1801:663;;;;2508:1;2525:6;2522:89;;;-1:-1:-1;2577:19:39;;;2571:26;2522:89;-1:-1:-1;;1333:1:39;1329:11;;;1325:24;1321:29;1311:40;1357:1;1353:11;;;1308:57;2624:81;;1771:944;;1801:663;604:1;597:14;;;641:4;628:18;;-1:-1:-1;;1837:20:39;;;1955:236;1969:7;1966:1;1963:14;1955:236;;;2058:19;;;2052:26;2037:42;;2150:27;;;;2118:1;2106:14;;;;1985:19;;1955:236;;;1959:3;2219:6;2210:7;2207:19;2204:201;;;2280:19;;;2274:26;-1:-1:-1;;2363:1:39;2359:14;;;2375:3;2355:24;2351:37;2347:42;2332:58;2317:74;;2204:201;-1:-1:-1;;;;;2451:1:39;2435:14;;;2431:22;2418:36;;-1:-1:-1;1376:1345:39:o;:::-;70:46:36;;;;;;",
		linkReferences: {},
	},
	deployedBytecode: {
		object:
			"0x608060405234801561001057600080fd5b50600436106100935760003560e01c8063313ce56711610066578063313ce567146100fe57806370a082311461010d57806395d89b4114610136578063a9059cbb1461013e578063dd62ed3e1461015157600080fd5b806306fdde0314610098578063095ea7b3146100b657806318160ddd146100d957806323b872dd146100eb575b600080fd5b6100a061018a565b6040516100ad919061056a565b60405180910390f35b6100c96100c43660046105d5565b61021c565b60405190151581526020016100ad565b6002545b6040519081526020016100ad565b6100c96100f93660046105ff565b610236565b604051601281526020016100ad565b6100dd61011b36600461063b565b6001600160a01b031660009081526020819052604090205490565b6100a061025a565b6100c961014c3660046105d5565b610269565b6100dd61015f36600461065d565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461019990610690565b80601f01602080910402602001604051908101604052809291908181526020018280546101c590610690565b80156102125780601f106101e757610100808354040283529160200191610212565b820191906000526020600020905b8154815290600101906020018083116101f557829003601f168201915b5050505050905090565b60003361022a818585610277565b60019150505b92915050565b600033610244858285610289565b61024f85858561030c565b506001949350505050565b60606004805461019990610690565b60003361022a81858561030c565b610284838383600161036b565b505050565b6001600160a01b03838116600090815260016020908152604080832093861683529290522054600019811461030657818110156102f757604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064015b60405180910390fd5b6103068484848403600061036b565b50505050565b6001600160a01b03831661033657604051634b637e8f60e11b8152600060048201526024016102ee565b6001600160a01b0382166103605760405163ec442f0560e01b8152600060048201526024016102ee565b610284838383610440565b6001600160a01b0384166103955760405163e602df0560e01b8152600060048201526024016102ee565b6001600160a01b0383166103bf57604051634a1406b160e11b8152600060048201526024016102ee565b6001600160a01b038085166000908152600160209081526040808320938716835292905220829055801561030657826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161043291815260200190565b60405180910390a350505050565b6001600160a01b03831661046b57806002600082825461046091906106ca565b909155506104dd9050565b6001600160a01b038316600090815260208190526040902054818110156104be5760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016102ee565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166104f957600280548290039055610518565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161055d91815260200190565b60405180910390a3505050565b60006020808352835180602085015260005b818110156105985785810183015185820160400152820161057c565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b03811681146105d057600080fd5b919050565b600080604083850312156105e857600080fd5b6105f1836105b9565b946020939093013593505050565b60008060006060848603121561061457600080fd5b61061d846105b9565b925061062b602085016105b9565b9150604084013590509250925092565b60006020828403121561064d57600080fd5b610656826105b9565b9392505050565b6000806040838503121561067057600080fd5b610679836105b9565b9150610687602084016105b9565b90509250929050565b600181811c908216806106a457607f821691505b6020821081036106c457634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561023057634e487b7160e01b600052601160045260246000fdfea26469706673582212203c80febc3187b5d3652cbd4ae13f0fa306914f83f7eb9c840e2a7e549c88a1a664736f6c63430008190033",
		sourceMap:
			"70:46:36:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2074:89:26;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;4293:186;;;;;;:::i;:::-;;:::i;:::-;;;1169:14:39;;1162:22;1144:41;;1132:2;1117:18;4293:186:26;1004:187:39;3144:97:26;3222:12;;3144:97;;;1342:25:39;;;1330:2;1315:18;3144:97:26;1196:177:39;5039:244:26;;;;;;:::i;:::-;;:::i;3002:82::-;;;3075:2;1853:36:39;;1841:2;1826:18;3002:82:26;1711:184:39;3299:116:26;;;;;;:::i;:::-;-1:-1:-1;;;;;3390:18:26;3364:7;3390:18;;;;;;;;;;;;3299:116;2276:93;;;:::i;3610:178::-;;;;;;:::i;:::-;;:::i;3846:140::-;;;;;;:::i;:::-;-1:-1:-1;;;;;3952:18:26;;;3926:7;3952:18;;;:11;:18;;;;;;;;:27;;;;;;;;;;;;;3846:140;2074:89;2119:13;2151:5;2144:12;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2074:89;:::o;4293:186::-;4366:4;735:10:32;4420:31:26;735:10:32;4436:7:26;4445:5;4420:8;:31::i;:::-;4468:4;4461:11;;;4293:186;;;;;:::o;5039:244::-;5126:4;735:10:32;5182:37:26;5198:4;735:10:32;5213:5:26;5182:15;:37::i;:::-;5229:26;5239:4;5245:2;5249:5;5229:9;:26::i;:::-;-1:-1:-1;5272:4:26;;5039:244;-1:-1:-1;;;;5039:244:26:o;2276:93::-;2323:13;2355:7;2348:14;;;;;:::i;3610:178::-;3679:4;735:10:32;3733:27:26;735:10:32;3750:2:26;3754:5;3733:9;:27::i;8989:128::-;9073:37;9082:5;9089:7;9098:5;9105:4;9073:8;:37::i;:::-;8989:128;;;:::o;10663:477::-;-1:-1:-1;;;;;3952:18:26;;;10762:24;3952:18;;;:11;:18;;;;;;;;:27;;;;;;;;;;-1:-1:-1;;10828:37:26;;10824:310;;10904:5;10885:16;:24;10881:130;;;10936:60;;-1:-1:-1;;;10936:60:26;;-1:-1:-1;;;;;2961:32:39;;10936:60:26;;;2943:51:39;3010:18;;;3003:34;;;3053:18;;;3046:34;;;2916:18;;10936:60:26;;;;;;;;10881:130;11052:57;11061:5;11068:7;11096:5;11077:16;:24;11103:5;11052:8;:57::i;:::-;10752:388;10663:477;;;:::o;5656:300::-;-1:-1:-1;;;;;5739:18:26;;5735:86;;5780:30;;-1:-1:-1;;;5780:30:26;;5807:1;5780:30;;;3237:51:39;3210:18;;5780:30:26;3091:203:39;5735:86:26;-1:-1:-1;;;;;5834:16:26;;5830:86;;5873:32;;-1:-1:-1;;;5873:32:26;;5902:1;5873:32;;;3237:51:39;3210:18;;5873:32:26;3091:203:39;5830:86:26;5925:24;5933:4;5939:2;5943:5;5925:7;:24::i;9949:432::-;-1:-1:-1;;;;;10061:19:26;;10057:89;;10103:32;;-1:-1:-1;;;10103:32:26;;10132:1;10103:32;;;3237:51:39;3210:18;;10103:32:26;3091:203:39;10057:89:26;-1:-1:-1;;;;;10159:21:26;;10155:90;;10203:31;;-1:-1:-1;;;10203:31:26;;10231:1;10203:31;;;3237:51:39;3210:18;;10203:31:26;3091:203:39;10155:90:26;-1:-1:-1;;;;;10254:18:26;;;;;;;:11;:18;;;;;;;;:27;;;;;;;;;:35;;;10299:76;;;;10349:7;-1:-1:-1;;;;;10333:31:26;10342:5;-1:-1:-1;;;;;10333:31:26;;10358:5;10333:31;;;;1342:25:39;;1330:2;1315:18;;1196:177;10333:31:26;;;;;;;;9949:432;;;;:::o;6271:1107::-;-1:-1:-1;;;;;6360:18:26;;6356:540;;6512:5;6496:12;;:21;;;;;;;:::i;:::-;;;;-1:-1:-1;6356:540:26;;-1:-1:-1;6356:540:26;;-1:-1:-1;;;;;6570:15:26;;6548:19;6570:15;;;;;;;;;;;6603:19;;;6599:115;;;6649:50;;-1:-1:-1;;;6649:50:26;;-1:-1:-1;;;;;2961:32:39;;6649:50:26;;;2943:51:39;3010:18;;;3003:34;;;3053:18;;;3046:34;;;2916:18;;6649:50:26;2741:345:39;6599:115:26;-1:-1:-1;;;;;6834:15:26;;:9;:15;;;;;;;;;;6852:19;;;;6834:37;;6356:540;-1:-1:-1;;;;;6910:16:26;;6906:425;;7073:12;:21;;;;;;;6906:425;;;-1:-1:-1;;;;;7284:13:26;;:9;:13;;;;;;;;;;:22;;;;;;6906:425;7361:2;-1:-1:-1;;;;;7346:25:26;7355:4;-1:-1:-1;;;;;7346:25:26;;7365:5;7346:25;;;;1342::39;;1330:2;1315:18;;1196:177;7346:25:26;;;;;;;;6271:1107;;;:::o;14:548:39:-;126:4;155:2;184;173:9;166:21;216:6;210:13;259:6;254:2;243:9;239:18;232:34;284:1;294:140;308:6;305:1;302:13;294:140;;;403:14;;;399:23;;393:30;369:17;;;388:2;365:26;358:66;323:10;;294:140;;;298:3;483:1;478:2;469:6;458:9;454:22;450:31;443:42;553:2;546;542:7;537:2;529:6;525:15;521:29;510:9;506:45;502:54;494:62;;;;14:548;;;;:::o;567:173::-;635:20;;-1:-1:-1;;;;;684:31:39;;674:42;;664:70;;730:1;727;720:12;664:70;567:173;;;:::o;745:254::-;813:6;821;874:2;862:9;853:7;849:23;845:32;842:52;;;890:1;887;880:12;842:52;913:29;932:9;913:29;:::i;:::-;903:39;989:2;974:18;;;;961:32;;-1:-1:-1;;;745:254:39:o;1378:328::-;1455:6;1463;1471;1524:2;1512:9;1503:7;1499:23;1495:32;1492:52;;;1540:1;1537;1530:12;1492:52;1563:29;1582:9;1563:29;:::i;:::-;1553:39;;1611:38;1645:2;1634:9;1630:18;1611:38;:::i;:::-;1601:48;;1696:2;1685:9;1681:18;1668:32;1658:42;;1378:328;;;;;:::o;1900:186::-;1959:6;2012:2;2000:9;1991:7;1987:23;1983:32;1980:52;;;2028:1;2025;2018:12;1980:52;2051:29;2070:9;2051:29;:::i;:::-;2041:39;1900:186;-1:-1:-1;;;1900:186:39:o;2091:260::-;2159:6;2167;2220:2;2208:9;2199:7;2195:23;2191:32;2188:52;;;2236:1;2233;2226:12;2188:52;2259:29;2278:9;2259:29;:::i;:::-;2249:39;;2307:38;2341:2;2330:9;2326:18;2307:38;:::i;:::-;2297:48;;2091:260;;;;;:::o;2356:380::-;2435:1;2431:12;;;;2478;;;2499:61;;2553:4;2545:6;2541:17;2531:27;;2499:61;2606:2;2598:6;2595:14;2575:18;2572:38;2569:161;;2652:10;2647:3;2643:20;2640:1;2633:31;2687:4;2684:1;2677:15;2715:4;2712:1;2705:15;2569:161;;2356:380;;;:::o;3299:222::-;3364:9;;;3385:10;;;3382:133;;;3437:10;3432:3;3428:20;3425:1;3418:31;3472:4;3469:1;3462:15;3500:4;3497:1;3490:15",
		linkReferences: {},
	},
	methodIdentifiers: {
		"allowance(address,address)": "dd62ed3e",
		"approve(address,uint256)": "095ea7b3",
		"balanceOf(address)": "70a08231",
		"decimals()": "313ce567",
		"name()": "06fdde03",
		"symbol()": "95d89b41",
		"totalSupply()": "18160ddd",
		"transfer(address,uint256)": "a9059cbb",
		"transferFrom(address,address,uint256)": "23b872dd",
	},
	rawMetadata:
		'{"compiler":{"version":"0.8.25+commit.b61c2a91"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],"devdoc":{"errors":{"ERC20InsufficientAllowance(address,uint256,uint256)":[{"details":"Indicates a failure with the `spender`\\u2019s `allowance`. Used in transfers.","params":{"allowance":"Amount of tokens a `spender` is allowed to operate with.","needed":"Minimum amount required to perform a transfer.","spender":"Address that may be allowed to operate on tokens without being their owner."}}],"ERC20InsufficientBalance(address,uint256,uint256)":[{"details":"Indicates an error related to the current `balance` of a `sender`. Used in transfers.","params":{"balance":"Current balance for the interacting account.","needed":"Minimum amount required to perform a transfer.","sender":"Address whose tokens are being transferred."}}],"ERC20InvalidApprover(address)":[{"details":"Indicates a failure with the `approver` of a token to be approved. Used in approvals.","params":{"approver":"Address initiating an approval operation."}}],"ERC20InvalidReceiver(address)":[{"details":"Indicates a failure with the token `receiver`. Used in transfers.","params":{"receiver":"Address to which tokens are being transferred."}}],"ERC20InvalidSender(address)":[{"details":"Indicates a failure with the token `sender`. Used in transfers.","params":{"sender":"Address whose tokens are being transferred."}}],"ERC20InvalidSpender(address)":[{"details":"Indicates a failure with the `spender` to be approved. Used in approvals.","params":{"spender":"Address that may be allowed to operate on tokens without being their owner."}}]},"events":{"Approval(address,address,uint256)":{"details":"Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}. `value` is the new allowance."},"Transfer(address,address,uint256)":{"details":"Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero."}},"kind":"dev","methods":{"allowance(address,address)":{"details":"See {IERC20-allowance}."},"approve(address,uint256)":{"details":"See {IERC20-approve}. NOTE: If `value` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address."},"balanceOf(address)":{"details":"See {IERC20-balanceOf}."},"decimals()":{"details":"Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the default value returned by this function, unless it\'s overridden. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}."},"name()":{"details":"Returns the name of the token."},"symbol()":{"details":"Returns the symbol of the token, usually a shorter version of the name."},"totalSupply()":{"details":"See {IERC20-totalSupply}."},"transfer(address,uint256)":{"details":"See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `value`."},"transferFrom(address,address,uint256)":{"details":"See {IERC20-transferFrom}. Emits an {Approval} event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of {ERC20}. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `value`. - the caller must have allowance for ``from``\'s tokens of at least `value`."}},"version":1},"userdoc":{"kind":"user","methods":{},"version":1}},"settings":{"compilationTarget":{"src/TestERC20.sol":"TestERC20"},"evmVersion":"paris","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/"]},"sources":{"lib/openzeppelin-contracts/contracts/interfaces/draft-IERC6093.sol":{"keccak256":"0x60c65f701957fdd6faea1acb0bb45825791d473693ed9ecb34726fdfaa849dd7","license":"MIT","urls":["bzz-raw://ea290300e0efc4d901244949dc4d877fd46e6c5e43dc2b26620e8efab3ab803f","dweb:/ipfs/QmcLLJppxKeJWqHxE2CUkcfhuRTgHSn8J4kijcLa5MYhSt"]},"lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol":{"keccak256":"0xc3e1fa9d1987f8d349dfb4d6fe93bf2ca014b52ba335cfac30bfe71e357e6f80","license":"MIT","urls":["bzz-raw://c5703ccdeb7b1d685e375ed719117e9edf2ab4bc544f24f23b0d50ec82257229","dweb:/ipfs/QmTdwkbQq7owpCiyuzE7eh5LrD2ddrBCZ5WHVsWPi1RrTS"]},"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol":{"keccak256":"0xc6a8ff0ea489379b61faa647490411b80102578440ab9d84e9a957cc12164e70","license":"MIT","urls":["bzz-raw://0ea104e577e63faea3b69c415637e99e755dcbf64c5833d7140c35a714d6d90c","dweb:/ipfs/Qmau6x4Ns9XdyynRCNNp3RhLqijJjFm7z5fyZazfYFGYdq"]},"lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol":{"keccak256":"0xaa761817f6cd7892fcf158b3c776b34551cde36f48ff9703d53898bc45a94ea2","license":"MIT","urls":["bzz-raw://0ad7c8d4d08938c8dfc43d75a148863fb324b80cf53e0a36f7e5a4ac29008850","dweb:/ipfs/QmcrhfPgVNf5mkdhQvy1pMv51TFokD3Y4Wa5WZhFqVh8UV"]},"lib/openzeppelin-contracts/contracts/utils/Context.sol":{"keccak256":"0x493033a8d1b176a037b2cc6a04dad01a5c157722049bbecf632ca876224dd4b2","license":"MIT","urls":["bzz-raw://6a708e8a5bdb1011c2c381c9a5cfd8a9a956d7d0a9dc1bd8bcdaf52f76ef2f12","dweb:/ipfs/Qmax9WHBnVsZP46ZxEMNRQpLQnrdE4dK8LehML1Py8FowF"]},"src/TestERC20.sol":{"keccak256":"0x97a5067d74dd556da07ddf787b4573bf35bdcdfe8ff7371b3b43bc9252e8bc94","urls":["bzz-raw://ea2a0cff116390924d0d4f62067a9614577561d38368243ad039c924b5319511","dweb:/ipfs/QmdxWEPgbS65BRAF2d7DgsoP5h9ZBQrqiUD1ScbYCezW2S"]}},"version":1}',
	metadata: {
		compiler: { version: "0.8.25+commit.b61c2a91" },
		language: "Solidity",
		output: {
			abi: [
				{
					inputs: [
						{ internalType: "address", name: "spender", type: "address" },
						{ internalType: "uint256", name: "allowance", type: "uint256" },
						{ internalType: "uint256", name: "needed", type: "uint256" },
					],
					type: "error",
					name: "ERC20InsufficientAllowance",
				},
				{
					inputs: [
						{ internalType: "address", name: "sender", type: "address" },
						{ internalType: "uint256", name: "balance", type: "uint256" },
						{ internalType: "uint256", name: "needed", type: "uint256" },
					],
					type: "error",
					name: "ERC20InsufficientBalance",
				},
				{
					inputs: [
						{ internalType: "address", name: "approver", type: "address" },
					],
					type: "error",
					name: "ERC20InvalidApprover",
				},
				{
					inputs: [
						{ internalType: "address", name: "receiver", type: "address" },
					],
					type: "error",
					name: "ERC20InvalidReceiver",
				},
				{
					inputs: [
						{ internalType: "address", name: "sender", type: "address" },
					],
					type: "error",
					name: "ERC20InvalidSender",
				},
				{
					inputs: [
						{ internalType: "address", name: "spender", type: "address" },
					],
					type: "error",
					name: "ERC20InvalidSpender",
				},
				{
					inputs: [
						{
							internalType: "address",
							name: "owner",
							type: "address",
							indexed: true,
						},
						{
							internalType: "address",
							name: "spender",
							type: "address",
							indexed: true,
						},
						{
							internalType: "uint256",
							name: "value",
							type: "uint256",
							indexed: false,
						},
					],
					type: "event",
					name: "Approval",
					anonymous: false,
				},
				{
					inputs: [
						{
							internalType: "address",
							name: "from",
							type: "address",
							indexed: true,
						},
						{
							internalType: "address",
							name: "to",
							type: "address",
							indexed: true,
						},
						{
							internalType: "uint256",
							name: "value",
							type: "uint256",
							indexed: false,
						},
					],
					type: "event",
					name: "Transfer",
					anonymous: false,
				},
				{
					inputs: [
						{ internalType: "address", name: "owner", type: "address" },
						{ internalType: "address", name: "spender", type: "address" },
					],
					stateMutability: "view",
					type: "function",
					name: "allowance",
					outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
				},
				{
					inputs: [
						{ internalType: "address", name: "spender", type: "address" },
						{ internalType: "uint256", name: "value", type: "uint256" },
					],
					stateMutability: "nonpayable",
					type: "function",
					name: "approve",
					outputs: [{ internalType: "bool", name: "", type: "bool" }],
				},
				{
					inputs: [
						{ internalType: "address", name: "account", type: "address" },
					],
					stateMutability: "view",
					type: "function",
					name: "balanceOf",
					outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
				},
				{
					inputs: [],
					stateMutability: "view",
					type: "function",
					name: "decimals",
					outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
				},
				{
					inputs: [],
					stateMutability: "view",
					type: "function",
					name: "name",
					outputs: [{ internalType: "string", name: "", type: "string" }],
				},
				{
					inputs: [],
					stateMutability: "view",
					type: "function",
					name: "symbol",
					outputs: [{ internalType: "string", name: "", type: "string" }],
				},
				{
					inputs: [],
					stateMutability: "view",
					type: "function",
					name: "totalSupply",
					outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
				},
				{
					inputs: [
						{ internalType: "address", name: "to", type: "address" },
						{ internalType: "uint256", name: "value", type: "uint256" },
					],
					stateMutability: "nonpayable",
					type: "function",
					name: "transfer",
					outputs: [{ internalType: "bool", name: "", type: "bool" }],
				},
				{
					inputs: [
						{ internalType: "address", name: "from", type: "address" },
						{ internalType: "address", name: "to", type: "address" },
						{ internalType: "uint256", name: "value", type: "uint256" },
					],
					stateMutability: "nonpayable",
					type: "function",
					name: "transferFrom",
					outputs: [{ internalType: "bool", name: "", type: "bool" }],
				},
			],
			devdoc: {
				kind: "dev",
				methods: {
					"allowance(address,address)": { details: "See {IERC20-allowance}." },
					"approve(address,uint256)": {
						details:
							"See {IERC20-approve}. NOTE: If `value` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address.",
					},
					"balanceOf(address)": { details: "See {IERC20-balanceOf}." },
					"decimals()": {
						details:
							"Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the default value returned by this function, unless it's overridden. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.",
					},
					"name()": { details: "Returns the name of the token." },
					"symbol()": {
						details:
							"Returns the symbol of the token, usually a shorter version of the name.",
					},
					"totalSupply()": { details: "See {IERC20-totalSupply}." },
					"transfer(address,uint256)": {
						details:
							"See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `value`.",
					},
					"transferFrom(address,address,uint256)": {
						details:
							"See {IERC20-transferFrom}. Emits an {Approval} event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of {ERC20}. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `value`. - the caller must have allowance for ``from``'s tokens of at least `value`.",
					},
				},
				version: 1,
			},
			userdoc: { kind: "user", methods: {}, version: 1 },
		},
		settings: {
			remappings: [
				"@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",
				"ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",
				"erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
				"forge-std/=lib/forge-std/src/",
				"openzeppelin-contracts/=lib/openzeppelin-contracts/",
			],
			optimizer: { enabled: true, runs: 200 },
			metadata: { bytecodeHash: "ipfs" },
			compilationTarget: { "src/TestERC20.sol": "TestERC20" },
			evmVersion: "paris",
			libraries: {},
		},
		sources: {
			"lib/openzeppelin-contracts/contracts/interfaces/draft-IERC6093.sol": {
				keccak256:
					"0x60c65f701957fdd6faea1acb0bb45825791d473693ed9ecb34726fdfaa849dd7",
				urls: [
					"bzz-raw://ea290300e0efc4d901244949dc4d877fd46e6c5e43dc2b26620e8efab3ab803f",
					"dweb:/ipfs/QmcLLJppxKeJWqHxE2CUkcfhuRTgHSn8J4kijcLa5MYhSt",
				],
				license: "MIT",
			},
			"lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol": {
				keccak256:
					"0xc3e1fa9d1987f8d349dfb4d6fe93bf2ca014b52ba335cfac30bfe71e357e6f80",
				urls: [
					"bzz-raw://c5703ccdeb7b1d685e375ed719117e9edf2ab4bc544f24f23b0d50ec82257229",
					"dweb:/ipfs/QmTdwkbQq7owpCiyuzE7eh5LrD2ddrBCZ5WHVsWPi1RrTS",
				],
				license: "MIT",
			},
			"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol": {
				keccak256:
					"0xc6a8ff0ea489379b61faa647490411b80102578440ab9d84e9a957cc12164e70",
				urls: [
					"bzz-raw://0ea104e577e63faea3b69c415637e99e755dcbf64c5833d7140c35a714d6d90c",
					"dweb:/ipfs/Qmau6x4Ns9XdyynRCNNp3RhLqijJjFm7z5fyZazfYFGYdq",
				],
				license: "MIT",
			},
			"lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol":
				{
					keccak256:
						"0xaa761817f6cd7892fcf158b3c776b34551cde36f48ff9703d53898bc45a94ea2",
					urls: [
						"bzz-raw://0ad7c8d4d08938c8dfc43d75a148863fb324b80cf53e0a36f7e5a4ac29008850",
						"dweb:/ipfs/QmcrhfPgVNf5mkdhQvy1pMv51TFokD3Y4Wa5WZhFqVh8UV",
					],
					license: "MIT",
				},
			"lib/openzeppelin-contracts/contracts/utils/Context.sol": {
				keccak256:
					"0x493033a8d1b176a037b2cc6a04dad01a5c157722049bbecf632ca876224dd4b2",
				urls: [
					"bzz-raw://6a708e8a5bdb1011c2c381c9a5cfd8a9a956d7d0a9dc1bd8bcdaf52f76ef2f12",
					"dweb:/ipfs/Qmax9WHBnVsZP46ZxEMNRQpLQnrdE4dK8LehML1Py8FowF",
				],
				license: "MIT",
			},
			"src/TestERC20.sol": {
				keccak256:
					"0x97a5067d74dd556da07ddf787b4573bf35bdcdfe8ff7371b3b43bc9252e8bc94",
				urls: [
					"bzz-raw://ea2a0cff116390924d0d4f62067a9614577561d38368243ad039c924b5319511",
					"dweb:/ipfs/QmdxWEPgbS65BRAF2d7DgsoP5h9ZBQrqiUD1ScbYCezW2S",
				],
				license: null,
			},
		},
		version: 1,
	},
	id: 36,
} as const;

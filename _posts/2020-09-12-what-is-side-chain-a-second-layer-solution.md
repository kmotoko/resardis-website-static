---
layout: posts
title: "What is Side Chain: A 2nd Layer Solution"
date: 2020-09-23 16:00:00 +0300
last_modified_at: 2020-09-23 16:00:00 +0300
published: true
tags: ["Side Chain", "Second Layer", "2nd Layer", "Plasma", "Matic Network", "Liquid Network", "Blockchain"]
summary: "Side Chain technology is a second layer solution to the existing blockchains. It allows for free / cheap and instant transactions, solving the congestion and high fee problems of the main chains e.g. Ethereum."
thumbnail:
    name: "side_chain_second_layer"
    webp: true
author_id: "ilhancemduru"
---

Side Chain technology is a second layer solution to the existing blockchains. It allows for free / cheap and instant transactions, solving the congestion and high fee problems of the main chains e.g. Ethereum.

Resardis Decentralized Exchange is built on a side chain, specifically on top of Matic Network, which allows instant and (almost) free transactions on the blockchain. But what is a side chain, what makes it fast, and what makes it secure ?

## The Origins of the Side Chain Technology
Let’s first understand the original concept of the side chain. The idea of side chain was created for Bitcoin by Bitcoin developers in 2014 as a new scaling solution. The idea was to create and run a new blockchain (a side chain) alongside the main Bitcoin blockchain. Then, these blockchains communicate with each other to move the Bitcoin between the two chains. In order to achieve scalability, the newly created blockchain (side chain) uses a less secure consensus mechanism that makes the side chain faster, but less secure. The working application of the side chain in Bitcoin is Liquid Network. Liquid Network’s side chain uses Proof-of-Authority (PoA) consensus mechanism, in which the selected parties create blocks only by signing. There is no huge electricity cost needed to create a single block as in Bitcoin. The working mechanism of Liquid is as the following: Users send Bitcoin to the Liquid escrow account, and the Bitcoin is locked in this account. The same amount of Bitcoin is minted in the Liquid side chain. The Bitcoin transactions happen in the side chain fast and cheap due to the “soft” consensus mechanism. When a user wants to move Bitcoin to the main chain, the amount of Bitcoin is burnt in the side chain, and escrow sends Bitcoin to the user address. As you can understand, it is a custodial solution and can be censored. Any problem inside the side chain can cause loss of funds. Sources {% cite intro_liquid_technical_blockstream pegged_sidechains_blockstream --file web %}.

## An Advanced Side Chain Solution: Matic Network
Let’s now understand how Resardis uses the side chain concept, so that it is non-custodial, trustless and secure. With the aim of the inter-chain trust minimization, Ethereum developers created several different Plasma implementations. Currently Matic Network’s own Plasma implementation, Plasma, is one of the most solid Plasma implementations. Hence, Resardis team decided to build Resardis Decentralized Exchange on top of Matic Network’s own Plasma side chain. The main concept of the Plasma side chain is the same as the standard side chain: the Plasma side chain is created as a new blockchain with a different consensus mechanism alongside the main blockchain. Matic network’s side chain uses Delegated Proof of Stake (DPoS) consensus mechanism, in which delegates produce blocks every second on average. Unlike the standard side chain, Plasma side chain escrow account is a non-custodial smart contract, which no one has control on, and that means it is uncensorable. In the Plasma side chain, any fund that is sent to escrow smart contract is created in the Plasma side chain by another smart contract in the side chain. One trust mechanism of the Plasma side chain is utilization of “checkpoints''. Plasma side chain reports a Merkle proof of each of its blocks to Ethereum mainnet as checkpoints. This allows the verification of token ownership changes in the mainnet. Therefore, users do not have to trust the Plasma side chain, because each block gets finalized in the main chain. This mechanism allows users to exit the Plasma side chain without problem and/or security concern. The general working mechanism of the Plasma side chain is as follows: Users send Etherum or token to the escrow smart contract. The same amount of fund is minted in the Plasma side chain by another smart contract. Transactions happen inside the side chain fast and cheap due to the soft consensus mechanism, at the same time checkpoints of every block are sent to the main chain automatically from the side chain, to secure the transactions. When users want to move to the main chain, the fund burns inside the side chain by the smart contract and then users withdraw their funds from the main chain smart contract. As you see, the Plasma side chain is trustless because the side chain secures itself using checkpoints. It is non-custodial because escrow accounts are smart contracts that no one has power on. Sources {% cite what_is_matic_matic matic_architecture_matic sidechains_plasma_matic --file web %}.

## Conclusion
Matic Network’s side chain implementation is a perfect playground for a decentralized exchange. It ultimately protects users from losing their funds by leveraging Plasma contracts. It is blazingly fast, and almost feeless. Therefore, Resardis has decided to build on top of Matic Network. Unlike other DEXs which bring certain “solutions” such as off-chain orders, Resardis does not compromise security and decentralization while improving the user experience.

## References
{% bibliography --file web --cited_in_order %}

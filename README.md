

---

# 🗂️ TabTamer

**Deployed on Lisk Sepolia Testnet**: [Vercel App](https://tab-tamer-lisk-nextjs.vercel.app/)
**TabTamer Smart Contract Address**: `0x0Bff7C1303776FfAf7A3cF4E97fD5f93043D2f46`
**View on Blockscout**: [Lisk Sepolia Blockscout](https://sepolia-blockscout.lisk.com/address/0x9Df44D4f5BC6F05248Af8E2d6dBbdaA002860dFC?tab=txs)

---

## 📝 Project Overview

TabTamer is a **web3 productivity app** designed to help users **organize, track, and manage their web links** while interacting seamlessly with blockchain.

**Key Features:**

* Create categories and add links.
* Mark links as read.
* **Set reminders with sound notifications**.
* Customize link colors.
* **Reorder links and categories via drag-and-drop**.
* All interactions tracked on blockchain for verification.

This project uses **Scaffold-Lisk**, combining the **power of Scaffold-ETH tooling** with **Lisk Sepolia Testnet** for smart contract deployment.

---

## 🛠️ Tech Stack

| Layer                | Tech / Framework                                   | Notes                                         |
| -------------------- | -------------------------------------------------- | --------------------------------------------- |
| **Frontend**         | Next.js + React                                    | User interface, connects to wallet & contract |
| **State Management** | React hooks / Context                              | Tracks app state and blockchain events        |
| **Smart Contracts**  | Solidity via Scaffold-Lisk                         | TabTamer contract for link management         |
| **Blockchain**       | Lisk Sepolia Testnet                               | Testnet network for development               |
| **Wallet**           | MetaMask                                           | Ethereum-compatible wallet integration        |
| **Deployment**       | Vercel                                             | Frontend hosting                              |
| **APIs / RPC**       | `https://rpc.sepolia-api.lisk.com`                 | Connect frontend to Lisk Sepolia network      |
| **Block Explorer**   | [Blockscout](https://sepolia-blockscout.lisk.com/) | Monitor transactions and contracts            |

---

## 🔗 Smart Contract Details

| Contract | Address                                      | Functionality                                                           |
| -------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| TabTamer | `0x0Bff7C1303776FfAf7A3cF4E97fD5f93043D2f46` | Category & link management, reminders, read tracking, blockchain events |

> This contract is deployed on **Lisk Sepolia Testnet**. The address above can be verified on [Blockscout](https://sepolia-blockscout.lisk.com/).

---

## 🚀 Workflow Diagram

```mermaid
flowchart LR
    subgraph USER[👤 User]
        A[💼 MetaMask / Wallet]
    end

    subgraph FRONTEND[💻 Frontend (Next.js)]
        B[🖥️ React Components]
        B1[🗂️ TabTamer UI]
        B2[🔔 Event Listeners]
        B3[🎨 Customization & Drag-Drop Handlers]
        B4[⏰ Reminder System & Sound Notifications]
    end

    subgraph CONTRACTS[📜 Smart Contracts (Scaffold-Lisk)]
        C1[🔗 TabTamer]
    end

    subgraph BLOCKCHAIN[⛓️ Lisk Sepolia Testnet]
        D[📖 Blockchain Ledger]
    end

    A -->|Connect Wallet| B
    B1 -->|Call Contract Functions| C1
    C1 -->|Read/Write Data| D
    C1 -->|Emit Events| B2
    B2 -->|Update UI in Real-Time| B1
    B3 -->|Drag & Drop Reordering, Custom Colors| B1
    B4 -->|Trigger Reminders & Sounds| B1
```

---

### 🔹 Workflow Summary

1. **👤 User** connects wallet (MetaMask) to the **frontend**.
2. **React Components** interact with **TabTamer smart contract** via **Scaffold-Lisk**.
3. Smart contract **stores data on Lisk Sepolia** and **emits events**.
4. Frontend **listens to events** and dynamically **updates the UI**.
5. Users can **track links, create categories, reorder them, customize colors, and receive reminder notifications** seamlessly.

---

## 🏗️ Deployment & Environment

### Local Development

* Use **Hardhat** via Scaffold-Lisk to deploy the TabTamer contract locally.
* `.env` and `.env.local` files contain:

  * `NEXT_PUBLIC_CHAIN_ID=4202` (Sepolia)
  * `NEXT_PUBLIC_TABTAMER_ADDRESS`
  * `NEXT_PUBLIC_RPC_URL=https://rpc.sepolia-api.lisk.com`
  * Wallet private key for deployment

### Vercel Deployment

* Add all `NEXT_PUBLIC_*` variables in **Vercel Environment Variables**:

  * `NEXT_PUBLIC_CHAIN_ID=4202`
  * `NEXT_PUBLIC_TABTAMER_ADDRESS=0x0Bff7C1303776FfAf7A3cF4E97fD5f93043D2f46`
  * `NEXT_PUBLIC_RPC_URL=https://rpc.sepolia-api.lisk.com`
  * `NEXT_PUBLIC_DEV_MODE=false`

* Frontend is automatically connected to Lisk Sepolia.

---

## 📚 References & Integrations

* **Scaffold-Lisk**: Simplifies smart contract deployment & frontend integration
* **MetaMask**: Wallet connection
* **RPC Provider**: JSON-RPC connection to Lisk Sepolia
* **Blockscout**: View transactions & contract state
* **Sound Notifications**: Alerts users for reminders
* **Drag & Drop UI**: Rearrange links and categories visually
* **Custom Colors**: Personalize links and categories

---

This README now covers:

* Project description & features ✅
* **All TabTamer functionalities** ✅
* Full tech stack ✅
* TabTamer smart contract address & blockchain link ✅
* Frontend deployment link ✅
* Environment variables for local & Vercel ✅
* Visual workflow diagram with interactions ✅

---


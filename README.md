# CryptoSwap

CryptoSwap is a decentralized application that allows users to swap cryptocurrencies in a simulated environment, similar to the popular Uniswap platform. The app is built using Web3 and React, and provides an easy-to-use interface for listing and swapping different cryptocurrencies.
This project is a React-based decentralized application (DApp) that interacts with the Ethereum blockchain. It utilizes Truffle Ganache for local development and deployment of smart contracts. The frontend application, written in React, communicates with the smart contracts deployed on Ganache.

## Getting Started

To get started, first clone this repository to your local machine:

```
git clone https://github.com/jaydedevyn/CryptoSwap.git
```

Next, install the required packages using npm:

```
npm install
```

## Project Setup

Make sure you have Truffle Ganache installed for local blockchain development. If not, install it following the instructions provided by the Ganache documentation.

## Running the Application

To run the application, use the following command:

```
npm start
```

The application should now be running at `http://localhost:3000`.

## Smart Contracts

The project includes two smart contracts:

### EthSwap

The `EthSwap` contract is responsible for facilitating the transfer of Ethereum between accounts. It enables users to exchange Ether for custom tokens.

### Token

The `Token` contract creates the DApp token that can be traded using the `EthSwap` contract.

## Running the Application

To run the application locally, follow these steps:

1. Start Ganache and ensure it is running on the default port (7545).
2. Compile and migrate the smart contracts to Ganache using Truffle. Run `truffle compile` followed by `truffle migrate` in the project root directory.
3. Start the React frontend by running `npm start` in the project root directory.
4. Open your browser and navigate to `http://localhost:3000` to access the application.

## Interacting with the DApp

Once the application is running, you can perform the following actions:

- View your account's ETH and DApp token balances.
- Swap ETH for DApp tokens using the EthSwap contract.
- Swap DApp tokens for ETH using the EthSwap contract.

Please note that these interactions are simulated on the local Ganache blockchain and do not involve real funds.

## Testing

To run the tests for the smart contracts, use the following command:

```
truffle test
```

Make sure you have Ganache running before executing the tests.

## Deployment

To deploy the smart contracts to a public Ethereum network, follow these steps:

1. Update the `truffle-config.js` file with your network configurations.
2. Run the migration command appropriate for your desired network, such as `truffle migrate --network ropsten` for the Ropsten test network.
3. After a successful migration, the smart contracts will be deployed to the specified network.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thanks for checking out this project! Feel free to reach out if you have any questions or need further assistance.


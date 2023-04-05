// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./BridgeAdmin.sol";

contract TokenRegistry is BridgeAdmin {
    mapping(bytes32 => address) private tokenAddresses;

    event TokenRegistered(bytes32 indexed symbol, address indexed tokenAddress);

    function registerToken(bytes32 symbol, address tokenAddress) external onlyAdmin {
        require(tokenAddresses[symbol] == address(0), "TokenRegistry: Token already registered");
        require(tokenAddress != address(0), "TokenRegistry: Token address cannot be zero");
        tokenAddresses[symbol] = tokenAddress;
        emit TokenRegistered(symbol, tokenAddress);
    }

    function getTokenAddress(bytes32 symbol) external view returns (address) {
        address tokenAddress = tokenAddresses[symbol];
        require(tokenAddress != address(0), "TokenRegistry: Token not registered");
        return tokenAddress;
    }
}

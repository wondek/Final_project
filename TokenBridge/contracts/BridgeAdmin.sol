// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract BridgeAdmin {
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "BridgeAdmin: Only admin can call this function");
        _;
    }

    function changeAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "BridgeAdmin: New admin cannot be zero address");
        admin = newAdmin;
    }
}

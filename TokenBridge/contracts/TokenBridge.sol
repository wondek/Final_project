// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TokenBridge {
    using SafeMath for uint256;

    address public owner;
    address public goerliBridge;
    address public sopheliaBridge;
    IERC20 public token;

    event TransferInitiated(
        address indexed from,
        address indexed to,
        uint256 amount
    );
    event TransferCompleted(
        address indexed from,
        address indexed to,
        uint256 amount
    );

    constructor(address _token, address _goerliBridge, address _sopheliaBridge) {
        owner = msg.sender;
        token = IERC20(_token);
        goerliBridge = _goerliBridge;
        sopheliaBridge = _sopheliaBridge;
    }

    function initiateTransfer(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        token.transferFrom(msg.sender, address(this), _amount);

        emit TransferInitiated(msg.sender, address(this), _amount);
    }

    function withdraw(address _to, uint256 _amount) external {
        require(msg.sender == owner, "Only the owner can withdraw tokens");
        require(_amount > 0, "Amount must be greater than 0");
        require(token.balanceOf(address(this)) >= _amount, "Insufficient balance");

        token.transfer(_to, _amount);
        emit TransferCompleted(address(this), _to, _amount);
    }

    function confirmTransfer(address _to, uint256 _amount) external {
        require(msg.sender == goerliBridge || msg.sender == sopheliaBridge, "Only the bridge can confirm transfers");

        uint256 balance = token.balanceOf(address(this));
        require(balance >= _amount, "Insufficient balance");

        token.transfer(_to, _amount);
        emit TransferCompleted(address(this), _to, _amount);
    }
}

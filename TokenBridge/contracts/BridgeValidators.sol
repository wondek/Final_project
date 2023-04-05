pragma solidity 0.8.7;

contract BridgeValidators {
    address public owner;
    mapping(address => bool) public validators;

    constructor() {
        owner = msg.sender;
        validators[msg.sender] = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function addValidator(address _validator) public onlyOwner {
        validators[_validator] = true;
    }

    function removeValidator(address _validator) public onlyOwner {
        validators[_validator] = false;
    }

    function isValidator(address _validator) public view returns (bool) {
        return validators[_validator];
    }
}

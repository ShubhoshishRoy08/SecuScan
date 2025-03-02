// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableContract {
    mapping(address => uint256) public balances;
    address public owner;
    uint256 public totalSupply;

    constructor() {
        owner = msg.sender;
        totalSupply = 1000000;
        balances[owner] = totalSupply;
    }

    // 1. Reentrancy Vulnerability
    function withdraw(uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Transfer failed");
        balances[msg.sender] -= _amount;
    }

    // 2. Integer Overflow/Underflow (Fixed in Solidity 0.8.0, but included for demonstration)
    function transfer(address _to, uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    // 3. Denial of Service (DoS) with Block Gas Limit
    function distribute(address[] memory _recipients, uint256 _amount) public {
        for (uint256 i = 0; i < _recipients.length; i++) {
            balances[_recipients[i]] += _amount;
        }
    }

    // 4. Unrestricted Write to Storage
    function setBalance(address _user, uint256 _amount) public {
        balances[_user] = _amount;
    }

    // 5. Missing Access Control
    function changeOwner(address _newOwner) public {
        owner = _newOwner;
    }

    // 6. Use of tx.origin for Authentication
    function transferToOwner(uint256 _amount) public {
        require(tx.origin == owner, "Not the owner");
        balances[owner] += _amount;
    }

    // 7. Uninitialized Storage Pointer
    function uninitializedStorage() public {
        address payable recipient;
        recipient.transfer(address(this).balance);
    }

    // 8. Delegatecall Injection
    function delegateCall(address _contract, bytes memory _data) public {
        (bool success, ) = _contract.delegatecall(_data);
        require(success, "Delegatecall failed");
    }
}
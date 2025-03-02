// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SevereVulnerable {
    mapping(address => uint256) public balances;

    // 🛑 Deposit function with no checks
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    // 🛑 Unprotected Withdraw (Reentrancy vulnerability)
    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficient funds");
        
        // Call external contract before updating state (Reentrancy Attack)
        (bool success, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(success, "Transfer failed");

        // Updating state after external call (vulnerable)
        balances[msg.sender] = 0;
    }

    // 🛑 Unrestricted selfdestruct (Anyone can destroy the contract)
    function destroy() public {
        selfdestruct(payable(msg.sender));
    }

    // 🛑 Integer overflow/underflow in calculations (Not using SafeMath)
    function unsafeMath(uint256 a, uint256 b) public pure returns (uint256) {
        return a - b; // This can cause an underflow!
    }
}

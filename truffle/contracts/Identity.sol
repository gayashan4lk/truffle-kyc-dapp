// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Identity {
    uint32 private credentialId;
    uint32 private credentialRecordId;
    uint32 private verifyRecordId;
    uint32 private issueRecordId;

    constructor(){
        credentialId = 0;
        credentialRecordId = 0;
        verifyRecordId = 0;
        issueRecordId = 0;
    }

    enum UserType {
        Issuer,
        Holder,
        Verifier
    }

    struct User {
        string userName;
        UserType userType;
    }

    mapping(address => User) private Users;

    struct CredentialRecord {
        address holderAddress;
        uint32 credentialId;
        string credentialDefinition;
        uint32 createdAt;
    }

    mapping(address => mapping(uint32 => CredentialRecord)) private CredentialsRecordBook;

    struct IssueRecord {
        address holderAddress;
        address IssuerAddress;
        uint32 credentialId;
        bool isSigned;
        uint32 createdAt;
    }

    mapping(address => mapping(uint32 => IssueRecord)) private IssueRecordBook;

    struct VerifyRecord {
        address holderAddress;
        address verifierAddress;
        uint32 credentialId;
        bool isShared;
        uint32 createdAt;
    }

    mapping(address => mapping(uint32 => VerifyRecord)) private VerifyRecordBook;


    // This function creats a user.
    // requires two parameters, Username and Usertype
    // If Usertype equals one of "Issuer", "Holder", or "Verifier", a user is created and returns true.
    // If Usertype is not equal to any of above, user is not created and returns false.
    function addUser(
        string memory _name,
        string memory _type
    ) public returns (bool) {
        if (
            keccak256(abi.encodePacked(_type)) == keccak256("Issuer") ||
            keccak256(abi.encodePacked(_type)) == keccak256("Holder") ||
            keccak256(abi.encodePacked(_type)) == keccak256("Verifier")
        ) {
            UserType _userType;
            if (keccak256(abi.encodePacked(_type)) == keccak256("Issuer")) {
                _userType = UserType.Issuer;
            } else if (
                keccak256(abi.encodePacked(_type)) == keccak256("Holder")
            ) {
                _userType = UserType.Holder;
            } else if (
                keccak256(abi.encodePacked(_type)) == keccak256("Verifier")
            ) {
                _userType = UserType.Verifier;
            }
            Users[msg.sender] = User(_name, _userType);

            return true;
        }
        return false;
    }

    function getUserByAddress(address _address) public view returns (User memory) {
        return (Users[_address]);
    }

    // This function creates a credential record.
    // Only holders can create credentials.
    // If msg.sender is a holder, credential is created and returns credentialsId.
    // Otherwise credential is not created returns 0.
    function addCredentialRecord(string memory _def) public returns (uint32) {
        if (Users[msg.sender].userType == UserType.Holder) {
            uint32 _recordId = credentialRecordId++;
            uint32 _credId = credentialId++;
            CredentialsRecordBook[msg.sender][_recordId] = CredentialRecord(
                msg.sender,
                _credId,
                _def,
                uint32(block.timestamp)
            );
            return _credId;
        }
        return 0;
    }

    // This function returns a credentialRecord by address and credentialRecordId
    function getCredentialsByOwner(address _address, uint32 _credRecordId)
        public
        view
        returns (CredentialRecord memory)
    {

        return (CredentialsRecordBook[_address][_credRecordId]);
    }

    // This function shares credentials with a verifier.
    // Only a holder can share credentials.
    function shareCredentials(
        address _verifier,
        uint32 _credentialRecordId
    ) public returns (uint32) {
        if (Users[msg.sender].userType == UserType.Holder && Users[_verifier].userType == UserType.Verifier) {
            uint32 _id = verifyRecordId++;
            VerifyRecordBook[msg.sender][_id] = VerifyRecord(
                msg.sender,
                _verifier,
                _credentialRecordId,
                true,
                uint32(block.timestamp)
            );
            return (_id);
        }
        return 0;
    }

    // This function requests credentials from a holder.
    // Only a verifier can request credentials.
    function requestCredentials(
        address _holder,
        uint32 _credentialsId
    ) public returns (uint32) {
        if (Users[msg.sender].userType == UserType.Verifier && Users[_holder].userType == UserType.Holder) {
            uint32 _id = verifyRecordId++;
            VerifyRecordBook[msg.sender][_id] = VerifyRecord(
                _holder,
                msg.sender,
                _credentialsId,
                false,
                uint32(block.timestamp)
            );
            return (_id);
        }
        return 0;
    }

    // This function returns a verify record by holder address and credential id.
    function getRevealRecord(address _holder, uint32 _id)
        public
        view
        returns (VerifyRecord memory)
    {
        return (VerifyRecordBook[_holder][_id]);
    }

    // This function creates a issue record to issue a credential.
    // Only a issuer can create a issue record.
    function issueCredentials(
        address _holder,
        uint32 _credentialsId
    ) public returns (uint32) {
        if (Users[msg.sender].userType == UserType.Issuer && Users[_holder].userType == UserType.Holder) {
            uint32 _id = issueRecordId++;
            IssueRecordBook[_holder][_id] = IssueRecord(
                _holder,
                msg.sender,
                _credentialsId,
                true,
                uint32(block.timestamp)
            );
            return (_id);
        }
        return 0;
    }

    // This function creates a issue record to un-issue credential.
    // Only a issuer can create a issue record.
    function unIssueCredentials(
        address _holder,
        uint32 _credentialsId
    ) public returns (uint32) {
        if (Users[msg.sender].userType == UserType.Issuer && Users[_holder].userType == UserType.Holder) {
            uint32 _id = issueRecordId++;
            IssueRecordBook[msg.sender][_id] = IssueRecord(
                _holder,
                msg.sender,
                _credentialsId,
                false,
                uint32(block.timestamp)
            );
            return (_id);
        }
        return 0;
    }

    // This function returns a verify record by holder address and credential id.
    function getIssueRecord(address _holder, uint32 _id)
        public
        view
        returns (IssueRecord memory)
    {
        return (IssueRecordBook[_holder][_id]);
    }
}
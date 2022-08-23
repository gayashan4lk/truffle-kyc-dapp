// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Identity {
  uint32 private userId;
  uint32 private credentialId;
  uint32 private credentialRecordId;
  uint32 private verifyRecordId;
  uint32 private issueRecordId;

  constructor(){
    userId = 0;
    credentialId = 0;
    credentialRecordId = 0;
    verifyRecordId = 0;
    issueRecordId = 0;
  }

  // This enum defines types of users.
  enum UserType {
    Issuer,
    Holder,
    Verifier
  }

  // This struct stores data related to a 'User'.
  struct User {
    uint32 Id;
    string Name;
    UserType Type;
  }

  // This mapping stores 'User' according to address.
  mapping(address => User) private Users;

  // This struct stores data related to a 'Credential'.
  struct Credential {
    uint32 CredentialId;
    address Holder;
    string Definition;
    uint32 CreatedAt;
  }

  Credential[] private CredentialsList;

  // This mapping stores 'Credential' according to CredentialId.
  // credential id => Credential
  mapping(uint32 => Credential) private Credentials;

  // This mapping stores array of credential id per user id.
  // user id => array of credential id.
  mapping(uint32 => uint32[]) private CredentialsListByHolder;

  // This function creates a user.
  // User data is added in 'Users' mapping.
  // If a user created successfully retuns user id (user id is always greated than 0), otherwise retuns 0.
  function addUser(string memory _name, string memory _type) public returns (uint32) {
    if(
      keccak256(abi.encodePacked(_type)) == keccak256("Issuer") ||
      keccak256(abi.encodePacked(_type)) == keccak256("Holder") ||
      keccak256(abi.encodePacked(_type)) == keccak256("Verifier")
      )
      {
        uint32 _id = userId++;
        UserType _userType;
        if (keccak256(abi.encodePacked(_type)) == keccak256("Issuer")) {
          _userType = UserType.Issuer;
        } else if ( keccak256(abi.encodePacked(_type)) == keccak256("Holder")) {
          _userType = UserType.Holder;
        } else if ( keccak256(abi.encodePacked(_type)) == keccak256("Verifier")) {
          _userType = UserType.Verifier;
        }
        Users[msg.sender] = User(_id, _name, _userType);
        return _id;
      }
        return 0;
  }

  // This function returns user details.
  function getUser() public view returns (User memory) {
    return (Users[msg.sender]);
  }

  // If msg.sender is a Issuer and _holder is a Holder, a new credentials can be created.
  // Data of new credential is stored in Credentials mapping. Id of new credential is stored in CredentialsListByHolder mapping.
  // Holder address, credential definition has to be provided.
  // if success credential id is retured. Otherwise 0 is returned.
  function createCredential(address _holder, string memory _definition) public returns (uint32) {
    if (Users[msg.sender].Type == UserType.Issuer && Users[_holder].Type == UserType.Holder) {
      uint32 _credId = credentialId++;
      uint32 _holderId = Users[_holder].Id;
      Credentials[_credId] = Credential(_credId, _holder, _definition, uint32(block.timestamp));
      CredentialsListByHolder[_holderId].push(_credId); 
      CredentialsList.push(Credential(_credId, _holder, _definition, uint32(block.timestamp)));
      return _credId;
    }
    return 0;
  }

  // This functions retuns array of Credential ids according to the Holder.
  function getAllCredentialIdsByHolder() public view returns (uint32[] memory) {
    if (Users[msg.sender].Type == UserType.Holder) {
      uint32 _holderId = getUser().Id;
    return (CredentialsListByHolder[_holderId]);
    }
    revert('NotFound');
  }

  function getCredentialById(uint32 _id) public view returns (Credential memory) {
    return Credentials[_id];
  }

  function getAllCredentials() public view returns (Credential[] memory) {
    return CredentialsList;
  }
}
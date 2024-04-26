// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract Election {
    address public admin;
    uint256 candidateCount;
    uint256 voterCount;
    uint256 ballotCount;
    bool start;
    bool end;

    constructor() public {
        // Initilizing default values
        admin = msg.sender;
        candidateCount = 0;
        voterCount = 0;
        ballotCount = 0;
        start = false;
        end = false;
    }

    // Modeling a Election Details
    struct ElectionDetails {
        string adminName;
        string adminEmail;
        string electionTitle;
        string electionDescription;
    }
    ElectionDetails electionDetails;

    // Modeling a candidate
    struct Candidate {
        uint256 candidateId;
        string header;
        string description;
        uint256 voteCount;
        address[] votersList;
    }
    mapping(uint256 => Candidate) public candidateDetails;

    // Modeling a voter
    struct Voter {
        address voterAddress;
        string name;
        string email;
        bool isVerified;
        bool hasVoted;
        bool isRegistered;
    }
    address[] public voters; // Array of address to store address of voters
    mapping(address => Voter) public voterDetails;

    struct Ballot {
        uint256 ballotId;
        address voterAddress;
        uint256 candidateId;
        bytes32 ballotHash;
    }
    mapping(uint256 => Ballot) public ballotDetails;
    
    function getAdmin() public view returns (address) {
        return admin;
    }

    modifier onlyAdmin() {
        // Modifier for only admin access
        require(msg.sender == admin);
        _;
    }

    function setElectionDetails(
        string memory _adminName,
        string memory _adminEmail,
        string memory _electionTitle,
        string memory _electionDescription
    )
        public
        // Only admin can add
        onlyAdmin
    {
        electionDetails = ElectionDetails(
            _adminName,
            _adminEmail,
            _electionTitle,
            _electionDescription
        );
        start = true;
        end = false;
    }

    // Get Elections details
    function getElectionDetails()
    public
    view
    returns(string memory adminName, 
    string memory adminEmail, 
    string memory electionTitle, 
    string memory electionDescription){
        return(electionDetails.adminName, 
        electionDetails.adminEmail,  
        electionDetails.electionTitle, 
        electionDetails.electionDescription);
    }

    // Adding new candidates
    function addCandidate(string memory _header, string memory _description)
        public
        // Only admin can add
        onlyAdmin
    {
        address[] memory votersAddress;
        Candidate memory newCandidate =
            Candidate({
                candidateId: candidateCount,
                header: _header,
                description: _description,
                voteCount: 0,
                votersList: votersAddress
            });
        candidateDetails[candidateCount] = newCandidate;
        candidateCount += 1;
    }

    // Get candidates count
    function getTotalCandidate() public view returns (uint256) {
        return candidateCount;
    }

    // Get voters count
    function getTotalVoter() public view returns (uint256) {
        return voterCount;
    }

    // Request to be added as voter
    function registerAsVoter(string memory _name, string memory _email) public {
        Voter memory newVoter =
            Voter({
                voterAddress: msg.sender,
                name: _name,
                email: _email,
                hasVoted: false,
                isVerified: false,
                isRegistered: true
            });
        voterDetails[msg.sender] = newVoter;
        voters.push(msg.sender);
        voterCount += 1;
    }

    // Verify voter
    function verifyVoter(bool _verifedStatus, address voterAddress)
        public
        // Only admin can verify
        onlyAdmin
    {
        voterDetails[voterAddress].isVerified = _verifedStatus;
    }

    // Vote
    function vote(uint256 _candidateId) public {
        require(voterDetails[msg.sender].hasVoted == false);
        require(voterDetails[msg.sender].isVerified == true);
        require(start == true);
        require(end == false);

        Ballot memory newBallot =
            Ballot({
                ballotId: ballotCount,
                voterAddress: msg.sender,
                candidateId: _candidateId,
                ballotHash: keccak256(abi.encodePacked(ballotCount, msg.sender, _candidateId))
            });
        ballotDetails[ballotCount] = newBallot;
        ballotCount += 1;

        voterDetails[msg.sender].hasVoted = true;
    }

    // End election
    function endElection() public onlyAdmin {
        end = true;
        start = false;

        // Count number of vote for each candidate
        for (uint256 i = 0; i < ballotCount; i++) {
            if (ballotDetails[i].ballotHash == keccak256(abi.encodePacked(ballotDetails[i].ballotId, ballotDetails[i].voterAddress, ballotDetails[i].candidateId))) {
                candidateDetails[ballotDetails[i].candidateId].voteCount += 1;
                candidateDetails[ballotDetails[i].candidateId].votersList.push(ballotDetails[i].voterAddress);
            }
        }
    }

    // Get election start and end values
    function getStart() public view returns (bool) {
        return start;
    }

    function getEnd() public view returns (bool) {
        return end;
    }
}

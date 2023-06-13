uint256 daiRatioPayout;
uint256 stakedGns;
uint256 borrowedUsdc;
uint256 unlockTime;
uint256 maxBorrowedUsdc;
uint256 maxHealthFactor;
uint256 lowerLiq;
uint256 higherLiq;

function getLoanDaiRatioPayout(uint256 loanId_) external view returns(uint256) {
    return _outstandingLoans[loanId_].daiRatioPayout;
}

function getLoanStakedGns(uint256 loanId_) external view returns(uint256){
    return _outstandingLoans[loanId_].stakedGns;
}

function getLoanBorrowedUsdc(uint256 loanId_) external view returns(uint256){
    return _outstandingLoans[loanId_].borrowedUsdc;
}

function getLoanUnlockTime(uint256 loanId_) external view returns(uint256){
    return _outstandingLoans[loanId_].unlockTime;
}

function getLoanMaxBorrowedUsdc(uint256 loanId_) external view returns(uint256){
    return _outstandingLoans[loanId_].maxBorrowedUsdc;
}

function getLoanMaxHealthFactor(uint256 loanId_) external view returns(uint256){
    return _outstandingLoans[loanId_].maxHealthFactor;
}

function getLoanLowerLiq(uint256 loanId_) external view returns(uint256){
    return _outstandingLoans[loanId_].lowerLiq;
}

function getLoanHigherLiq(uint256 loanId_) external view returns(uint256){
    return _outstandingLoans[loanId_].higherLiq;
}

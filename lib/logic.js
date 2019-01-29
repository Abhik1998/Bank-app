/**
* Sample transaction
* @param {test.AccountTransfer} accountTransfer
* @transaction
*/

function accountTransfer(accountTransfer) {
    if (accountTransfer.from.balance < accountTransfer.to.balance) {
    throw new Error ("Insufficient funds");
    }
    
    accountTransfer.from.balance -= accountTransfer.amount;
    accountTransfer.to.balance += accountTransfer.amount;
    
    return getAssetRegistry('test.Account')
    .then (function (assetRegistry) {
    return assetRegistry.update(accountTransfer.from);
    })
    .then (function () {
    return getAssetRegistry('test.Account');
    })
    .then(function (assetRegistry) {
    return assetRegistry.update(accountTransfer.to);
    });
    
    }
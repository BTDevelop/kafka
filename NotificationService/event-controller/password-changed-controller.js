exports.passwordChangedController =  ((topic, partition, data) => {
    console.log('message from '+ topic +' topic : '+ data, partition);
    return true;
 })
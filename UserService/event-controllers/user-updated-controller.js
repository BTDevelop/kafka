exports.userUpdatedController =  ((topic, partition, data) => {
    console.log('Message from '+ topic +' topic : '+ data, partition);
    return true;
 })
exports.userCreatedController =  ((topic, partition, data) => {
   console.log('---------------')
   console.log('message from '+ topic +' topic : '+ data, partition);
   console.log('---------------')
   return true;
})
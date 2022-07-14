module.exports =
{
     post: function(options,requestData){
        const request = https.request(options, (res) => {
            let data = '';  
            res.on('data', (chunk) => {
              data += chunk;
            });
            res.on('close', () => {
              console.log(JSON.parse(data));
            });
          });
          request.write(JSON.stringify(requestData));
          console.log(request);
          request.end();
          request.on('error', (err) => {
           console.error(`Encountered an error trying to make a request: ${err.message}`);
         });
        return;
     }
}
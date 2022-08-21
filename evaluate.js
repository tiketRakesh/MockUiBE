//User can write any new function in this file using similar syntax as below and give same name in key field of config file
//Use req variable is exposed to access request object which cntains request body,header
//Use req.query to access URL parameters for example req.query[req_key]
//Use req.body to access body parameters for example for accessing any key in body of a post request use req.body[req_key] where req_key variable is fixed you can use any variable name while defining function arguements
var date = new Date();
module.exports =
{

      random: function () {
            //This function computes a random 10 digit value. Use this function in config if 10 digit random value is needed
            random = 1000000000000 + Math.floor(Math.random() * 9000000000000);
            return random
      },
      getRequest: function (req, req_key,delimiter,indexOfValue)
      //This function takes the request object named as req and parses the endpoint to find the value of req_key in request parameters
      {     
            if(delimiter!=null && indexOfValue!=null){
                  return req.query[req_key].toString().split(delimiter)[indexOfValue];
                }
               return req.query[req_key];
      },
      getRequestArrayMapping: function (req, req_key,delimiter)
      //This function takes the request object named as req and parses the endpoint to find the value of req_key in request parameters
      {
            return req.query[req_key].toString().split(delimiter);
      },
      getRequestInteger: function (req, req_key)
      {
            return parseInt(req.query[req_key]);
      },
      static: function (i)
      //This function will return a static value which is passed inside the function
      {
            return i;
      },
      getHeader: function (req)
      //User can set any specific header according to requirement. By default request Content type will be set as response content type
      {
            contentType = req.headers['content-type'];
            return contentType;
      },
      postRequest: function (req, req_key,delimiter,indexOfValue)
      //Use below function in config file for parsing nested Json and XML
      {
            var id = jsonQ(JSON.stringify(req.body));
            console.log("value is "+JSON.stringify(id));
            if(Array.isArray(key)){
                  replace=id.pathValue(req_key);
              }
            newVal = id.find(req_key).value();
            if(delimiter!=null && indexOfValue!=null){
                  return newVal[0].toString().split(delimiter)[indexOfValue];
                }
            return newVal[0];
      },
      getPathParam: function (req, i)
      //This function takes the request object named as req and parses the endpoint to find the value of req_key in request parameters
      {
            return req.params[0].split('/')[i];
      },
      trimingNonSignificantZero: function (req, req_key)
      // 
      {
            var id = jsonQ(JSON.stringify(req.body));
            val = id.find(req_key).value();
            //console.log(" value is "+ val);

            //remove the trailing zeros 
            valTrail=val.toString().slice(0, -2);
           // console.log(" value after removing tariling zeros "+ valTrail);
            //remove the leading zeros 
            var newVal =valTrail.toString().replace(/^0+/, '');
            return Number(newVal);
      },
      convertingIntegerToString: function (req, req_key)
      // 
      {
            var id = jsonQ(JSON.stringify(req.body));
            val = id.find(req_key).value();
            //console.log(" value is "+ val);
            //convert the integer to string 

            return val.toString();
      },
      decodeRequestBodyAndFindValueString: function (req, req_key)
      // 
      {
            const keyApp = 'GSDganoBT8PvP4YE3sMpHo12EpnY9$4y'
            const algorithm = 'aes-256-cbc'
            console.log(req.headers['timestamp'])
            const timestamp = req.headers['timestamp']
            const timestampLength = 16
            let iv=timestamp.padEnd(timestampLength, '0')
            let decipher = crypto.createDecipheriv(algorithm, Buffer.from(keyApp), iv)
            let encrypted = Buffer.from(req.body.toString(), 'base64')
            let decrypted = decipher.update(encrypted)
            decrypted = Buffer.concat([decrypted, decipher.final()])
            text = decrypted.toString()
            var id = jsonQ(text);
            val = id.find(req_key).value();
            //console.log(" value is "+ val);
            //convert the integer to string 
            return val.toString() ;
      },
      decodeRequestBodyAndFindValueInteger: function (req, req_key)
      // 
      {
            const keyApp = 'GSDganoBT8PvP4YE3sMpHo12EpnY9$4y'
            const algorithm = 'aes-256-cbc'
            console.log(req.headers['timestamp'])
            const timestamp = req.headers['timestamp']
            const timestampLength = 16
            let iv=timestamp.padEnd(timestampLength, '0')
            let decipher = crypto.createDecipheriv(algorithm, Buffer.from(keyApp), iv)
            let encrypted = Buffer.from(req.body.toString(), 'base64')
            let decrypted = decipher.update(encrypted)
            decrypted = Buffer.concat([decrypted, decipher.final()])
            text = decrypted.toString()
            var id = jsonQ(text);
            val = id.find(req_key).value();
            //console.log(" value is "+ val);
            //convert the integer to string 
            return Number(val);
      },
      generateSakukuSignature: function(req){
            accessToken = "5c562d58-844d-4129-b61b-74250f5ade0e"
            paymentId = "E112D0E6B38459D1E05400144FFBA584"
            raw = accessToken + req.body.TransactionID + Number(req.body.Amount) + ".00" + paymentId
            const signature = crypto.createHash('sha256').update(raw).digest('hex');
            return signature
      },
      generateKlikPayAuthKey: function(req){
            transactionNo= req.body.transactionNo;
            console.log(" transactionNo is "+ transactionNo);
            const klikPayKeyId = "303279334B546C4B6F52506530306965"
            const klikPayCode = "1234567890".padEnd(10,'0')
            transactionNo = transactionNo.padEnd(18, 'A')
            const currency = "IDR".padEnd(5, '1')
            const transactionDate = "1970-01-01 00:00:00".padStart(19, 'C')
            let keyId1 = klikPayKeyId.padEnd(32, 'E')
            let keyId2 = keyId1.padEnd(48, keyId1)
            let raw = klikPayCode + transactionNo + currency + transactionDate + keyId1
            let md5 = crypto.createHash('md5').update(raw).digest('hex')
            let authKey = md5.toUpperCase()
            authKey = evaluate.encrypt3DES(keyId2, authKey)
            console.log(" Authentication key  is "+ authKey.toUpperCase());
            return authKey.toUpperCase()
      },
      encrypt3DES : function(key,data){
            const algorithm = 'des-ede3'
            let keySpec = Buffer.from(key, 'hex').toString('utf8')
            let cipher = crypto.createCipheriv(algorithm, keySpec, null)
            let encrypted = cipher.update(data, 'hex')
            return encrypted.toString('hex')
      }
}





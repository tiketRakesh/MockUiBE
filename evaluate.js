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
            return newVal;
      }
}





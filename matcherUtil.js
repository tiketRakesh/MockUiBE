var matchedValue={};

module.exports ={
 headersMatched :function (req,headersLength, mock) {
    allHeadersValueMatched=true;
    for(let j =0 ; j< headersLength ;j++){
        key = mock.headers[j].key
        expectedValue = mock.headers[j].value
        if(req.headers[key] ==null || expectedValue!=req.headers[key]){
          allHeadersValueMatched=false;
        }
    }
    return allHeadersValueMatched;
},
qParamMatched :function (req,queryParamLength, mock) {
    allValueMatched=true;
    for(let k =0 ; k< queryParamLength ;k++){
        key = mock.qparams[k].key
        expectedValue = mock.qparams[k].value
        console.log("testing "+req.query[key])
        if(req.query==null || expectedValue!=req.query[key]){
          allValueMatched=false;
        }
    }
    return allValueMatched;
},
reqBodyMatched :function (req,requestBodyLength, mock) {
    allValueMatched=true;
    for(let k =0 ; k< requestBodyLength ;k++){
        //console.log("test " +mocks[i].requestBody)
        path = mock.requestBody[k].path
        expectedValue = mock.requestBody[k].value
        if(mock.contentType=='application/xml'){
             json =JSON.stringify(req.body)
             console.log(json)
        }
        actualValue =util.jsonPathToValue(req.body,path)
        if( expectedValue!=actualValue){
          allValueMatched=false;
        }
    }
    return allValueMatched;
},

updateResponseBody :function (req, mock, dynamicResponselength) {
        //console.log("test " +mocks[i].requestBody)
        fileExtension="";    
        if(mock.contentType=='application/xml'){
             //need to fix the xml part
             fileExtension='xml';
             vauleToUpdate =util.xmlPathToValue(req.body,reqPath);
             json = JSON.parse(parser.toJson(req.body, {reversible: true})); 
             json=matcherUtil.updateObject(json,vauleToUpdate,resPath,fileExtension);  
          }else{
            json= JSON.parse(mock.body);
           
            for(let i =0 ;i<dynamicResponselength; i++ ){
               reqPath=mock.dynamicResponse[i].key;
               resPath=mock.dynamicResponse[i].value;
               vauleToUpdate =util.jsonPathToValue(req.body,reqPath);
               vauleToBeUpdate =util.jsonPathToValue(json,resPath);
               console.log("value to  updated "+vauleToUpdate);
               console.log("value to be updated "+vauleToBeUpdate)
               json=matcherUtil.updateObject(json,vauleToUpdate,resPath,fileExtension);  
          }
        }        
  return json;
},
updateRequestBodyCallback :function (req, mock, dynamicRequestCBlength) {
    //console.log("test " +mocks[i].requestBody)
    fileExtension="";    
    if(mock.contentType=='application/xml'){
         //need to fix the xml part
         fileExtension='xml';
         vauleToUpdate =util.xmlPathToValue(req.body,reqPath);
         json = JSON.parse(parser.toJson(req.body, {reversible: true})); 
         json=matcherUtil.updateObject(json,vauleToUpdate,resPath,fileExtension);  
      }else{
        json= JSON.parse(mock.callBack[0].requestBody);
       
        for(let i =0 ;i<dynamicRequestCBlength; i++ ){
           reqPath=mock.dynamicRequestCallback[i].key;
           reqPathCB=mock.dynamicRequestCallback[i].value;
           customMethod=mock.dynamicRequestCallback[i].method;
           if(customMethod){
             console.log("Custom method found for the callback request "+customMethod);
             vauleToUpdate=eval(customMethod);
             console.log("value to  update "+vauleToUpdate);
           }else{
            vauleToUpdate =util.jsonPathToValue(req.body,reqPath);
           }
           vauleToBeUpdate =util.jsonPathToValue(json,reqPathCB);
           console.log("value to  update "+vauleToUpdate);
           console.log("value to be updated "+vauleToBeUpdate)
           json=matcherUtil.updateObject(json,vauleToUpdate,reqPathCB,fileExtension);  
      }
    }        
  return json;

},

//This will replace the key stored in var key with new value stored in new_val
updateObject : function(json,new_val,key,fileExtension)
{  
     var id = jsonQ(json);
     keyArr = key.split(',')
     console.log(keyArr);
     var replace = id.find(keyArr).value(new_val);//searches key and replaces it with new_val
     var responseSuccessData = json;
     if(fileExtension == 'xml')
     {
       var responseSuccessData = parser.toXml(responseSuccessData);
     }
  return responseSuccessData;
},
prepareResponseObjectAndCheckForCallback :function (req,res, mock,responseHeadersLength,index) {
    matchedValue.configURL = mock.endPoint;
    matchedValue.responseSuccessData = mock.body;
    matchedValue.statusCode= mock.statusCodes;
    matchedValue.responseTime = dynamicResponse(index);
    if(responseHeadersLength>0){
    for(let a= 0 ;a<responseHeadersLength ;a++){
      res.header(mock.responseHeaders[a].key,mock.responseHeaders[a].value)
    }
    }
    dynamicResponselength =mocks[index].dynamicResponse.length;
    if(dynamicResponselength>0){
      matchedValue.responseSuccessData=updateResponseBody(req,mock ,dynamicResponselength)
    }

    console.log(mock.callBack.length);
    console.log(mock.callBack);

    if(mock.callBack.length>0){
      sendCallback.callback(req,mock,start_time);
    }
    return matchedValue;
}
}

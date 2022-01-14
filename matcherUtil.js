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
prepareResponseObject :function (res, mock,responseHeadersLength,index) {
    matchedValue.configURL = mock.endPoint;
    matchedValue.responseSuccessData = mock.body;
    matchedValue.statusCode= mock.statusCodes;
    matchedValue.responseTime = dynamicResponse(index);
    if(responseHeadersLength>0){
    for(let a= 0 ;a<responseHeadersLength ;a++){
      res.header(mock.responseHeaders[a].key,mock.responseHeaders[a].value)
    }
    }
    return matchedValue;
}
}

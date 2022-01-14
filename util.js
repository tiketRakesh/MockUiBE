module.exports ={
        /**
 * Converts a string path to a value that is existing in a json object.
 * 
 * @param {Object} jsonData Json data to use for searching the value.
 * @param {Object} path the path to use to find the value.
 * @returns {valueOfThePath|null}
 */
     jsonPathToValue :function (jsonData, path) {
        if (!(jsonData instanceof Object) || typeof (path) === "undefined") {
            throw "Not valid argument:jsonData:" + jsonData + ", path:" + path;
        }
        path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        path = path.replace(/^\./, ''); // strip a leading dot
        var pathArray = path.split('.');
        for (var i = 0, n = pathArray.length; i < n; ++i) {
            var key = pathArray[i];
            if (key in jsonData) {
                if (jsonData[key] !== null) {
                    jsonData = jsonData[key];
                } else {
                    return null;
                }
            } else {
                return key;
            }
        }
        return jsonData;
    },
    xmlPathToValue :function (xmlData, key) {
        json = JSON.parse(xmlData); 
        var id = jsonQ(xmlData);
        value = id.find(key)[0] 
        console.log(value)
        return value
    }
}

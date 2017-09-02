module.exports = function(_) {
    
    // Lang
    
    if (!_.coalesce) _.coalesce = function() {
        
        for (let i=0, l=arguments.length; i<l; i++) {
            if (!_.isNil(arguments[i])) {
                return arguments[i];
            }
        }
        
        return null;
        
    };
    
    if (!_.nz) _.nz = function(value, valueIfNull) {
        
        if (_.isNil(value)) {
            return valueIfNull;
        }
        else {
            return value;
        }
        
    };
    
    if (!_.toBoolean) _.toBoolean = function(value) {
        
        let bool = null;
        
        if (!_.isNil(value)) {
            if (value === "true") {
                bool = true;
            }
            else if (value === "false") {
                bool = false;
            }
            else {
                try {
                    bool = Boolean(value);
                }
                catch(err) {
                    throw Error("Unable to convert '" + value + "' to a valid boolean");
                }
            }
        }
        
        return bool;
        
    };
    
    if (!_.pack) _.pack = function(data) {
        
        if (data instanceof Array) {
            return "Array[" + data.length + "]"
        }
        else if (typeof data === "object") {
            return "Object{" + Object.keys(data).length + "}"
        }
        else {
            if (data.length) {
                if (data.length > 500) {
                    return "Data(" + data.length + ")";
                }
                else {
                    return data;
                }
            }
            else {
                return data;
            }
        }
        
    };
    
    if (!_.blobify) _.blobify = function(data) {
        
        try {
            
            if (data) {
                
                if (data instanceof Array) {
                    
                    if (data.length > 50) {
                        data = "Array[" + data.length + "]"
                    }
                    
                }
                else if (typeof data === "object") {
                    
                    let keyCount = Object.keys(data).length;
                    
                    if (keyCount > 50) {
                        data = "Object{" + keyCount + "}"
                    }
                    
                }
                else {
                    
                    if (data.length) {
                        if (data.length > 500) {
                            data = "Data(" + data.length + ")";
                        }
                    }
                    
                }
                
            }
            else {
                data = {};
            }
            
            return JSON.stringify(data);
            
        }
        catch(err) {
            
            return "{}";
            
        }
        
    };
    
};
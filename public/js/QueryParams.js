function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1].replace(/\+/g, ' ')); //replace a +sign with space in the query
        }   //g stands for global, meaning it will replace the  +'s everywhere.'
    }
    
    return undefined;
}
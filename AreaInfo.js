function AreaInfo(url){
    this.locations = new Array();
    this.xml = null;
    
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.addEventListener('load', function(){
        this.xml = req.responseXML;
        console.log(this.xml);
    }, false);
    req.send(null);
    
    //エリア情報の取得
    this.getAreaInfo = function(){
        //debug
        console.log(this.xml);
        //県名が格納されているタグを取得
        var prefs = this.xml.getElementsByTagName('pref');
        
        //配列に格納
        for ( var i = 0; prefs.length > i; i ++ ) {
            var pref = prefs.item(i);
            
            var cities = pref.childNodes;
            
            this.locations[i] = { 'pref' : pref.getAttribute('title'), 'city' : new Array() };
            
            for ( var s = 0; cities.length > s; s ++ ) {
                var city = cities.item(s);
                
                if ( city.tagName == 'city' ) {
                    this.locations[i]['city'] = [ {'name' : city.getAttribute('title'), 'id' : city.getAttribute('id')} ];
                }
            }
        }
        
        return this.locations;
    }
}

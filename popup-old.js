document.addEventListener('DOMContentLoaded', function(){
    var req = new XMLHttpRequest();
    
    var url = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=110020';
    
    req.open('GET', url);
    
    req.addEventListener('load', function(){
        var response = req.responseText;
        //console.log(response);
    }, false);
    
    req.send(null);
    
    getAreaId();
});

//エリアIDを取得する
function getAreaId(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://weather.livedoor.com/forecast/rss/primary_area.xml');
    xhr.addEventListener('load', function(){
        var res = xhr.responseXML;
        
        var locationList = new Array();
        
        //prefタグを取得
        var prefList = res.getElementsByTagName('pref');
        
        for ( var i = 0; prefList.length > i; i ++ ) {
            var pref = prefList.item(i);
            var children = pref.childNodes;
            
            //locationList[i]['pref'] = pref.getAttribute('title');
            locationList[i] = { 'pref' : pref.getAttribute('title'), 'city' : new Array()};
            
            for ( var s = 0; children.length > s; s ++ ) {
                var child = children.item(s);
                
                if ( child.tagName == 'city' ) {
                    //locationList[i]['city'][s]['name'] = child.getAttribute('title');
                    //locationList[i]['city'][s]['id'] = child.getAttribute('id');
                    locationList[i]['city'].push( {'name' : child.getAttribute('title'), 'id' : child.getAttribute('id')} );
                }
            }
        }
        
        createPref(locationList);
        createCity(locationList, 0);
        displayWeather('011000');
        
        document.forms.location.pref.addEventListener('change', function(){
            var prefId = document.forms.location.pref.value;
            //debug
            console.log(prefId);
            createCity(locationList, prefId);
        }, false);
        
        document.forms.location.city.addEventListener('change', function(){
            var cityId = document.forms.location.city.value;
            console.log(cityId);
            displayWeather(cityId);
        }, false);
        
    }, false);
    xhr.send(null);
}

function createPref(locationList){
    var pref = document.forms.location.pref;

    for ( var i = 0; locationList.length > i; i ++ ) {
        var prefOption = document.createElement('option')
        prefOption.setAttribute('value', i);
        prefOption.appendChild(document.createTextNode(locationList[i].pref));
        pref.appendChild(prefOption);
    }
}

function createCity(locationList, prefNum){
    var city = document.forms.location.city;
    
    //初期化処理 これをやらないと値がどんどん増えていく・・・。
    while( city.firstChild ){
        city.removeChild(city.firstChild);
    }
    
    for ( var s = 0; locationList[prefNum].city.length > s; s ++ ) {
        var cityOption = document.createElement('option');
        cityOption.appendChild(document.createTextNode(locationList[prefNum].city[s].name));
        cityOption.setAttribute('value', locationList[prefNum].city[s].id);
        city.appendChild(cityOption);
    }
}

//天気を取得表示
function displayWeather(cityId){
    var req = new XMLHttpRequest();
    
    var url = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=' + cityId;
    
    req.open('GET', url);
    
    req.addEventListener('load', function(){
        var response = req.responseText;
        var weather = JSON.parse(response);
        
        //タイトル
        var link = document.createElement('a');
        link.appendChild(document.createTextNode(weather.title));
        link.setAttribute('href', weather.link);
        var title = document.createElement('div');
        title.appendChild(link);
        title.setAttribute('id', 'title');
        document.body.appendChild(link);
        
        //説明
        var description = document.createElement('div');
        description.appendChild(document.createTextNode(weather.description.text));
        document.body.appendChild(description);
    }, false);
    
    req.send(null);
}

//
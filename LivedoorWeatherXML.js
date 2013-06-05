//天気XMLをパースする
function LivedoorWeatherXML(responseXML){
    var xml = responseXML;
    
    //地方 県 市を連想配列にて取得
    this.getLocation = function(){
        var location = xml.getElementsByTagName('location')[0];
        
        locationInfo = new Object();
        
        locationInfo.area = location.getAttribute('area');
        locationInfo.pref = location.getAttribute('pref');
        locationInfo.city = location.getAttribute('city');
        
        return locationInfo;
    }
    
    //タイトル取得
    this.getTitle = function(){
        var title = xml.getElementsByTagName('title')[0].textContent;
        return String(title);
    }
    
    //予報日
    this.getForecastdate = function(){
        var forcastdate = xml.getelementsByTagName('forecastdate')[0].textContent;
        //文字列の成形処理を記述予定
    }
    
    //予報発表日時
    this.getPublictime = function(){
        var publictime = xml.getElementsByTagName('publictime')[0].textContent;
        return publictime;
    }
    
    //天気
    this.getTelop = function(){
        var telop = xml.getelementsByTagName('telop')[0].textContent;
        return telop;
    }
    
    //気温
    this.getTemperature = function(mode){
        var temperature = xml.getElementsByTagName('temperature')[0];
        
        var max = temperature.getElementsByTagName('max');
        var min = temperature.getElementsByTagName('min');
        
        var tempList = new Object();
        
        if ( mode == 'celsius' ) {
            //摂氏
            tempList.max = max.getElementsByTagName('celsius').textContent;
            tempList.min = min.getElementsByTagName('celsius').textContent;
        } else if ( mode = 'fahrenheit' ) {
            //華氏
            tempList.max = max.getElementsByTagName('fahrenheit').textContent;
            tempList.min = min.getElementsByTagName('fahrenheit').textContent;
        }
        
        return tempList;
    }
    
    //天気の説明
    this.getDescription = function(){
        var description = xml.getElementsByTagName('description')[0].textContent;
        return description;
    }
    
    //天気アイコン
    this.getWeatherIcon = function(){
        var children = xml.getElementsByTagName('lwws')[0].childNodes;
        
        for ( var i = 0; children.length > i; i ++ ) {
            if ( children.item(i).tagName == 'image' ) {
                var child = children.item(i);
                
                var image = Object();
                
                image.title = child.getElementsByTagName('title')[0].textContent;
                image.link  = child.getElementsByTagName('link')[0].textContent;
                image.url   = child.getElementsByTagName('url')[0].textContent;

                return image;
            }
        }
        
        return null;
    }
    
    /*未実装
    //ピンポイント情報のURL
    this.getPinpointUrl = function(){
        
    }
    */
   
   
}

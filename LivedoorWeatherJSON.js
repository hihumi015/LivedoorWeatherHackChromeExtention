function LivedoorWeatherJSON (responseJSON){
    var weather = JSON.parse(responseJSON);
    
    //予報の場所
    this.getLocation = function(){
        return weather.location;
    }
    
    //タイトル
    this.getTitle = function(){
        return weather.title;
    }
    
    //天気予報のリンク
    this.getLink = function(){
        return weather.link;
    }
    
    //予報発表日時
    this.getPublicTime = function(){
        return weather.pulicTime;
    }
    
    //天気予報データ
    this.getWeatherInfo = function(){
        return weather.forecasts;
    }
}

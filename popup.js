$(document).ready(function(){
    var counter = 0;
    //地点情報を取得
    $.get( 'http://weather.livedoor.com/forecast/rss/primary_area.xml', function(xml){
        //県名リスト生成
        $(xml).find('pref').each(function(){
            //console.log($(this).attr('title'));
            $('#pref').append(
                $('<option>').append(
                    $(this).attr('title') 
                ).attr('id', String(counter))
            );
            counter = counter + 1;
        });
        
        //現在選択されている県名を取得
        $('#pref option:selected').text();
        
        $(xml).find('pref').each(function(){
          if ( $('#pref option:selected').text() == $(this).attr('title') ) {
              $(this).find('city').each(function(){
                  $('#city').append($('<option>').append($(this).attr('title')).attr('value', $(this).attr('id')));
              });
          }
        });
        
        //現在、選択されている観測地点IDを取得
        displayWeather($('#city option:selected').val());
        
        //県名が変更されたときの処理
        $('#pref').change(function(){
            //selectを初期化
            $('#city').empty();
            
            //選択された県に属する地域名を取得
            $(xml).find('pref').each(function(){
              if ( $('#pref option:selected').text() == $(this).attr('title') ) {
                  $(this).find('city').each(function(){
                      $('#city').append($('<option>').append($(this).attr('title')).attr('value', $(this).attr('id')));
                  });
              }
            });
            
            displayWeather($('#city option:selected').val());
        });
        
        //観測地点が変更されたら
        $('#city').change(function(){
            displayWeather($(this).val());
        });
    });
});

function displayWeather(location){
    var url = 'http://weather.livedoor.com/forecast/webservice/json/v1?city='  + String(location);
    
    //初期化
    $('#weather').empty();
    
    $.get(url, function(res){
        //タイトル
        $('#weather').append( $('<div>').append( $('<h1>').append(res.title) ) );
        //解説
        $('#weather').append( $('<div>').attr('id', 'description').append( res.description.text ) );
        //天気
        $.each(res.forecasts, function(){
            //各予報日のdivを生成
            //console.log(this);
            var info = $('#weather').append( $('<div>').attr('class', 'info'));
            info.append($('<h2>').append(this.dateLabel));
            info.append($('<img>').attr('src', this.image.url).attr('alt', this.image.title));
            info.append($('<div>').append('天気の状態 : ' + this.telop));
            if ( this.temperature.max && this.temperature.min  ) {
                info.append($('<div>').append('最高気温 : ' + this.temperature.max.celsius));
                info.append($('<div>').append('最低気温 : ' + this.temperature.min.celsius));
            }
            console.log(this.temperature);
        });
    });
}
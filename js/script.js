
const url= "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-1D4A93AD-B874-4F3C-8F48-F5DE009A592D";
const canvas = document.querySelector('.cards');

fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(weather) {
        // 將回傳的資料經過處理 目前宣告一個weather的變數裝結果
        console.log(weather);
        for (let index = 0; index < weather.records.location.length; index++) {
            // console.log(weather.records.location[index].locationName);
            const element = weather.records.location[index];

            // 判斷天氣圖
            let weather_img

            if (element.weatherElement[1].time[0].parameter.parameterName <= 40) {
                weather_img= `
                <div class="pic">
                    <img src="./images/sun.png" alt="">
                </div>`
            }else if(element.weatherElement[1].time[0].parameter.parameterName <= 60){
                weather_img= `
                <div class="pic">
                    <img src="./images/cloudy.png" alt="">
                </div>`
            }else{
                weather_img= `
                <div class="pic">
                    <img src="./images/rain.png" alt="">
                </div>`
            }


            // canvas累加上一次迴圈印出來的卡片
            canvas.innerHTML +=`
            <div class="card">
                <div class="pic">
                    ${weather_img}
                </div>                    
                <div class="text">
                    <h1>${element.locationName}</h1>
                    <P>天氣狀況：${element.weatherElement[0].time[0].parameter.parameterName}</P>
                    <P>氣溫：${element.weatherElement[2].time[0].parameter.parameterName}℃ ~ ${element.weatherElement[4].time[0].parameter.parameterName}℃</P>
                    <p>降雨率：${element.weatherElement[1].time[0].parameter.parameterName}%</p>
                    <P>舒適度：${element.weatherElement[3].time[0].parameter.parameterName}</P>
                </div>
            </div>
            `
            
        }
    });
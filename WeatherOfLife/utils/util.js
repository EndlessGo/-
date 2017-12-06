//获取当前的地理位置
function getLocation(callback) {
  wx.getLocation({
    type: 'wgs84',//'gcj02'
    success: function (res) {//疑问，这个res是全局的吗？
      callback(true, res.latitude, res.longitude);
      //console.log(`经度${res.latitude}，纬度${res.longitude}`)
    },
    fail: function () {
      //console.log(`wx.getLocation failed!`)
      callback(false);
      
    }
  })
}

//根据百度地图接口获取天气信息
function getWeather(latitude, longitude, callback) {
  var ak = "hHNIm1G3WbMluMidwwG4VT3nvDGcumiG";//换成自己的ak
  var url = "https://api.map.baidu.com/telematics/v3/weather?location=" + longitude + "," + latitude + "&output=json&ak=" + ak;
  wx.request({
    url: url,
    success: function (res) {
      console.log(res);
      callback(res.data);
    }
  });
}
//整合前两个方法，加载天气数据：给应用层提供接口
function loadWeatherData(callback) {
  getLocation(function (flag, latitude, longitude) {
    if( flag == false ){
      //如果地理位置获取不成功，对应处理设置默认坐标
    }
    //请求天气数据API
    getWeather(latitude, longitude, function (weatherData) {
      callback(weatherData);
    });
  });
}

module.exports = {
  loadWeatherData: loadWeatherData
}
/*
wx.getLocation({
  type: 'wgs84',
  success: function(res) {
    console.log(`wx.getLocation success!`)
    console.log(`经度${res.latitude}，纬度${res.longitude}`)
  },
  fail: function(){
    console.log(`wx.getLocation failed!`)
  }
})
*/
/*
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
*/
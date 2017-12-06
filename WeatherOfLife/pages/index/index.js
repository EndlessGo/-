//index.js
var util = require('../../utils/util.js')

Page({
  data: {
    weather: {}
    //  message: 'Hello MINA!'
  },
  onLoad: function () {
    var that = this;
    util.loadWeatherData(function (data) {
      that.setData({
        weather: data
      });
    });
  }
})
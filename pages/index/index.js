let QR = require("../../utils/qrcode.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder: 'http://ruanmou.net'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let size = this.setCanvasSize();
    let url = this.data.placeholder;
    this.createQRcode(url, 'mycanvas', size.w, size.h)

  },
  // 二维码信息
  createQRcode(url, canvasId, canvasWidth, canvasHeight) {
    QR.qrApi.draw(url, canvasId, canvasWidth, canvasHeight)

  },

  // 拿到屏幕宽高 信息
  setCanvasSize() {
    let size = {}
    let res = wx.getSystemInfoSync()
    // console.log(res);
    let scale = 686 / 750;
    let width = res.windowWidth * scale;
    let height = width;
    size.w = width;
    size.h = height;
    return size;

  },
  // 动态获取网址
  formSubmit(e) {
    // 判断网址是否正确
    let url = e.datail.value.url || this.data.placeholder;
    wx.showToast({
      title: '生成中',
      icon: 'loading',
      duration: 2000
    })
    let that = this
    let timer = setTimeout(() => {
      let size = that.setCanvasSize();

      that.createQRcode(url, 'mycanvas', size.w, size.h)
      wx.hideToast()
      clearTimeout(timer)


    }, 2000)
  },


})
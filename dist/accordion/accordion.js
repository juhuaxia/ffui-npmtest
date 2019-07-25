Component({
  externalClasses: ['cls'],
  properties: {
    title: String,
    animationToggle: {
      type: Boolean,
      value: true
    },
    index: {
      type: Number,
      observer: '_showBox'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    idName: '',
    contentHeight: ''
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toggle() {
      const { idName } = this.data
      wx.createSelectorQuery().in(this).select(`#${idName}`).boundingClientRect((res) => {
        this.setData({
          contentHeight: res.height
        })
      }).exec()
      this._initHeight()
    },
    _showBox(newVal, oldVal) {
      this.setData({
        idName: `showBox-${newVal}`
      })
    },
    _initHeight() {
      this._setAnimation()
    },
    _setAnimation() {
      if (!this.data.animationToggle) {
        this.setData({
          animationToggle: true
        })
      } else {
        this.setData({
          animationToggle: false
        })
      }
    }
  }
})

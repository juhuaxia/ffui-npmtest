import defaultBehaviors from '../behaviors/default'
import SliderView from '../util/sliderView'

Component({
  behaviors: [defaultBehaviors],
  externalClasses: ['cls'],
  options: {
    multipleSlots: true
  },

  properties: {
    width: {
      type: String
    },
    height: {
      type: String
    },
    product: {
      type: Object,
      defaut: {},
      observer: '_initProduct'
    }
  },

  data: {
    _product: {},
    slideWidth: 0
  },

  detached() {
    this._sliderview && this._sliderview.clear()
  },

  methods: {
    _initProduct(product) {
      this.setData({
        _product: {
          ...product,
          _x: 0
        }
      }, () => {
        this._sliderview = new SliderView(this)
        this._setSlideWidth()
      })
    },

    _setSlideWidth() {
      const _this = this
      const query = this.createSelectorQuery()

      wx.getSystemInfo({
        success: function (res) {
          query.select('.sliderview-right').boundingClientRect(function (rect) {
            _this.setData({
              slideWidth: Math.round(rect.width * 750 / res.windowWidth)
            }, () => {
              _this._threshold = _this.data.slideWidth / 4
            })
          }).exec()
        },
        fail: function (err) {
          console.warn(err)
        }
      })
    },

    onTouchStart(e) {
      if (e.touches.length === 1) {
        this._startX = e.touches[0].clientX
        this._startY = e.touches[0].clientY
      }
    },
    onTouchEnd(e) {
      if (e.changedTouches.length === 1) {
        const moveX = e.changedTouches[0].clientX
        const moveY = e.changedTouches[0].clientY
        const disX = moveX - this._startX
        const disY = moveY - this._startY
        const ratio = Math.abs(disY / disX)

        if (ratio < 0.5) {
          this._endX = e.changedTouches[0].pageX
          const {
            _endX,
            _startX,
            _threshold
          } = this

          const {
            slideWidth
          } = this.data

          let x
          if (_startX - _endX >= _threshold) {
            x = -slideWidth
          } else if (_endX - _startX >= _threshold) {
            x = 0
          }

          const data = {
            target: e.currentTarget,
            isMoveLeft: disX <= 0
          }
          this._sliderview.slide(x)
          this.triggerEvent('onTouchEnd', data)
        }
      }
    },

    onChange: function (e) {
      if (!this.data.out && e.detail.x < -this._threshold) {
        this.setData({
          out: true
        })
      } else if (this.data.out && e.detail.x >= -this._threshold) {
        this.setData({
          out: false
        })
      }
    }
  }
})

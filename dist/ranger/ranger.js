import defaultBehaviors from '../behaviors/default'

Component({
  options: {
    multipleSlots: true
  },
  behaviors: [defaultBehaviors],
  externalClasses: ['cls'],
  properties: {
    max: {
      type: Number,
      value: 100
    },
    min: {
      type: Number,
      value: 0
    },
    value: {
      type: Array,
      value: [0, 100]
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data: {
    minSliderX: 0,
    maxSliderX: 0,
    barWidth: 0,
    barLeft: 0
  },
  $$startX: 0,
  $$currentSliderName: '',
  $$maxWidth: 0,
  $$padding: 20,
  $$value: [0, 100],
  lifetimes: {
    ready() {
      this.init()
      this.initMaxSliderX(() => this.renderBar())
    }
  },
  methods: {
    init() {
      this.$$startX = 0
      this.$$currentSliderName = ''
      this.$$maxWidth = 0
      this.$$padding = 20
      this.$$value = this.data.value
    },
    initMaxSliderX(cb) {
      const query = wx.createSelectorQuery().in(this)
      query.select('#rangerProcessBar').boundingClientRect()
      query.exec((rect) => {
        this.$$maxWidth = Math.round(rect[0].width - this.$$padding)
        this.$$startX = Math.round(rect[0].left)
        this.setData({
          maxSliderX: this.$$maxWidth
        }, () => cb())
      })
    },
    handleTouchStart(event) {
      const { disabled } = this.data
      if (disabled) {
        return
      }

      this.$$startX = event.touches[0].clientX
    },
    handleTouchMove(event) {
      const { disabled } = this.data
      if (disabled) {
        return
      }

      this.$$currentSliderName = event.currentTarget.dataset.slider

      const clientX = event.touches[0].clientX
      // const movedX = clientX - this.$$startX
      const movedX = clientX

      this.setSliderLeft(movedX)
    },
    handleTouchEnd(event) {
      const { disabled } = this.data
      if (disabled) {
        return
      }

      this.$$currentSliderName = event.currentTarget.dataset.slider

      const response = {
        currentSliderName: this.$$currentSliderName,
        value: this.$$value
      }
      this.triggerEvent('onChangeEnd', response)
    },

    setSliderLeft(leftValue) {
      const { maxSliderX, minSliderX } = this.data
      let left = 0

      if (leftValue < 0) {
        left = 0
      } else if (leftValue > this.$$maxWidth) {
        left = this.$$maxWidth
      } else {
        left = leftValue
      }

      if (this.$$currentSliderName === 'maxSliderX' && leftValue < minSliderX) {
        left = minSliderX
      }

      if (this.$$currentSliderName === 'minSliderX' && leftValue > maxSliderX) {
        left = maxSliderX
      }

      this.setData({
        [this.$$currentSliderName]: left
      }, () => {
        this.renderBar()
        this.setValue()
        this.triggerEvent('onChange', {
          value: this.$$value
        })
      })
    },

    setValue() {
      const { max, min, minSliderX, maxSliderX } = this.data
      const gap = max - min

      const minValue = Math.floor((minSliderX / this.$$maxWidth) * gap) + min
      const maxValue = Math.floor((maxSliderX / this.$$maxWidth) * gap) + min

      this.$$value = [minValue, maxValue]
    },

    renderBar() {
      const { minSliderX: left, maxSliderX: right } = this.data
      const width = right - left

      this.setData({
        barWidth: width,
        barLeft: left
      })
    }
  }
})

import defaultBehaviors from '../behaviors/default'

Component({
  options: {
    multipleSlots: true
  },
  behaviors: [defaultBehaviors],
  externalClasses: ['cls'],
  properties: {
    src: {
      type: String,
      value: ''
    },
    text: {
      type: String,
      value: '请选择图片'
    },
    iconType: {
      type: String,
      value: ''
    },
    count: {
      type: Number
    },
    sizeType: {
      type: Array,
      value: ['original', 'compressed']
    },
    sourceType: {
      type: Array,
      value: ['album', 'camera']
    }
  },
  methods: {
    handleClick() {
      const { count, sizeType, sourceType, componentName } = this.data
      wx.chooseImage({
        count,
        sizeType,
        sourceType,
        success: (res) => {
          const tempFilePaths = res.tempFilePaths

          this.triggerEvent('onChooseImg', {
            componentName,
            value: tempFilePaths
          })
        }
      })
    }
  }
})

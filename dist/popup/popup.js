import defaultBehaviors from '../behaviors/default'
import transitionMixin from '../behaviors/transition'

Component({
  options: {
    multipleSlots: true
  },
  behaviors: [defaultBehaviors, transitionMixin],
  externalClasses: ['cls'],
  properties: {
    zIndex: {
      type: Number,
      value: 1
    },
    position: {
      type: String,
      value: 'center'
    },
    mask: {
      type: Boolean,
      value: true
    },
    maskFfStyle: String,
    directionValue: {
      type: String,
      value: 'auto',
      observer: 'setDirection'
    }
  },
  data: {
    directionProp: ''
  },
  methods: {
    handleTapMask() {
      this.triggerEvent('closePopup')
    },
    setDirection: function () {
      console.log('popup created!' + this.properties.position)
      let directionProp = ''
      switch (this.properties.position) {
        case 'top':
        case 'bottom':
          directionProp = 'height'
          break
        case 'left':
        case 'right':
          directionProp = 'width'
          break
      }
      this.setData({
        directionProp
      })
    }
  }
})

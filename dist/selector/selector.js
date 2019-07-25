import defaultBehaviors from '../behaviors/default'

Component({
  options: {
    multipleSlots: true
  },
  behaviors: [defaultBehaviors],
  externalClasses: ['cls'],
  properties: {
    position: {
      type: String,
      value: 'bottom'
    },
    directionValue: {
      type: String,
      value: '67%'
    }
  },
  data: {
    showPopup: false,
    direction: 'auto'
  },
  methods: {
    handleClick() {
      this.togglePopup()
    },
    handleClosePopup() {
      this.togglePopup()
    },
    togglePopup() {
      const { showPopup } = this.data

      this.setData({
        showPopup: !showPopup
      })
    }
  }
})

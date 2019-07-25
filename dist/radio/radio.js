import defaultBehaviors from '../behaviors/default'

Component({
  options: {
    multipleSlots: true
  },
  behaviors: [defaultBehaviors],
  externalClasses: ['cls'],
  properties: {
    checked: {
      type: Boolean,
      observer: 'setChecked'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    value: {
      type: null
    }
  },
  data: {
    // isChecked: false,
    checkStatus: 'icon-cb-uncheck'
  },
  methods: {
    _computeCheckClass: function () {
      const { isChecked, disabled } = this.data
      let checkStatus = ''

      if (isChecked) {
        checkStatus = 'icon-cb-checked'
      } else if (!isChecked) {
        checkStatus = 'icon-cb-uncheck'
      }

      if (disabled) {
        checkStatus = '' // TODO no disabled icon
      }

      this.setData({
        checkStatus
      })
    },
    setChecked(v) {
      this.setData({
        isChecked: !!v
      }, () => {
        this._computeCheckClass()
      })
    },
    // doCheck() {
    //   const { isChecked } = this.data

    //   this.setChecked(!isChecked)
    // },
    handleCheck() {
      // const { disabled, componentName, isChecked, value } = this.data
      const { disabled, componentName, value } = this.data

      if (disabled) return
      // this.doCheck()

      this.triggerEvent('onCheckChange', {
        componentName,
        value: {
          value
        }
      }, {
        bubbles: true,
        composed: true
      })
    }
  }
})

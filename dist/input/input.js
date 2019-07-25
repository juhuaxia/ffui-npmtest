import { CONTAINS_EMOJI } from '../util/regExp'
import defaultBehaviors from '../behaviors/default'

Component({
  behaviors: [defaultBehaviors],
  externalClasses: ['cls'],
  properties: {
    disabled: {
      type: Boolean,
      value: false
    },
    errorText: {
      type: String
    },
    showIcon: {
      type: Boolean,
      value: true
    },
    label: {
      type: String
    },
    value: {
      type: String,
      value: '',
    },
    iconType: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'text',
      observer: '_setType'
    },
    focus: {
      type: Boolean,
      value: false,
      observer: '_setFocus'
    },
    confirmType: {
      type: String,
      value: 'done'
    },
    confirmHold: {
      type: Boolean,
      value: false
    },
    cursor: {
      type: Number,
      value: 0
    },
    selectionStart: {
      type: Number,
      value: -1
    },
    selectionEnd: {
      type: Number,
      value: -1
    },
    adjustPosition: {
      type: Boolean,
      value: true
    },
    curSpacing: {
      type: Number,
      value: 0
    },
    maxlength: {
      type: Number,
      value: 100
    },
    ariaLabel: {
      type: String,
      value: ''
    },
    theme: {
      type: String,
      value: 'large'
    },
    isError: {
      type: Boolean,
      value: false,
      observer: '_computeClass'
    }
  },

  data: {
    isFocused: false,
  },

  ready: function () {
    this._computeClass()
  },

  methods: {
    _setType: function(type) {
      this.setData({
        password: type === 'password'
      })
    },
    _setFocus: function(val) {
      this.setData({
        isFocused: !!val
      })
    },
    _computeClass: function () {
      let cls = []
      if (this.data.isFocused) { cls.push('is-focused') }
      if (this.data.value) { cls.push('is-not-empty') }
      if (this.data.isError) { cls.push('is-error') }
      if (this.data.value && !this.data.isError && !this.data.isFocused) { cls.push('is-done') }

      this.setData({
        computedClass: cls.join(' ')
      })
    },
    handleInputFocus() {
      this.setData({
        isFocused: true,
        isError: false
      })
      this._computeClass()

      this.triggerEvent('onInputFocus', {
        componentName: this.data.componentName
      })
    },
    handleInputChange(e) {
      const value = e.detail.value.replace(CONTAINS_EMOJI, '')
      this._computeClass()
      this.triggerEvent('onInputChange', {
        componentName: this.data.componentName,
        value
      })
    },
    handleInputBlur(e) {
      this.setData({
        isFocused: false
      })
      this._computeClass()
      this.triggerEvent('onInputBlur', {
        componentName: this.data.componentName,
        value: e.detail.value
      })
    }
  }
})

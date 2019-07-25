import defaultBehaviors from '../behaviors/default'

Component({
  behaviors: [defaultBehaviors],
  externalClasses: ['cls'],
  properties: {
    disabled: {
      type: Boolean,
      value: false
    },
    type: {
      type: String,
      value: 'default'
    },
    active: {
      type: Boolean,
      observer: '_initToggleStatus'
    },
    icon: {
      type: String,
      observer: '_computeIconCls'
    },
    autoWidth: {
      type: Boolean,
      value: false
    },
    iconPosition: {
      type: String,
      value: 'right'
    },
    formType: {
      type: String,
      value: ''
    },
    openType: {
      type: String,
      value: ''
    },
    hoverClass: {
      type: String,
      value: ''
    },
    lang: {
      type: String,
      value: 'en'
    },
    sessionFrom: {
      type: String,
    },
    sendMessageTitle: {
      type: String,
    },
    sendMessageImg: {
      type: String,
    },
    appParameter: {
      type: String,
    },
    showMessageCard: {
      type: Boolean,
      value: false
    },
  },
  data: {
    buttonCls: '',
    iconCls: '',
    active: false
  },
  ready: function () {
    this._computeButtonCls()
  },
  methods: {
    _initToggleStatus(v) {
      const { type } = this.data

      if (type === 'toggle') {
        this.setData({
          active: !!v
        })
      }
    },
    _computeIconCls(value) {
      const iconCls = value ? value + ' ' + this._computeIconPosition() : ''

      this.setData({
        iconCls
      })
    },
    _computeIconPosition() {
      const { iconPosition } = this.data
      let iconCls = 'rightIcon'

      switch (iconPosition) {
        case 'right':
          iconCls = 'rightIcon'
          break
        case 'left':
          iconCls = 'leftIcon'
          break
      }

      return iconCls
    },
    _computeButtonTheme(type) {
      let typeCls = 'normal'

      switch (type) {
        case 'secondary':
          typeCls = 'secondary'
          break
        case 'thirdly':
          typeCls = 'thirdly'
          break
      }

      return typeCls
    },
    _computeAutoSizePadding() {
      const { iconPosition } = this.data
      let paddingCls = 'iconAutoSizeRight'

      switch (iconPosition) {
        case 'right':
          paddingCls = 'iconAutoSizeRight'
          break
        case 'left':
          paddingCls = 'iconAutoSizeLeft'
          break
      }

      return paddingCls
    },
    _computeButtonCls() {
      const { type, autoWidth, icon, active, disabled } = this.data
      const typeCls = this._computeButtonTheme(type)
      const buttonCls = []

      if (autoWidth) {
        buttonCls.push('autoWidthCls')
        icon && buttonCls.push(this._computeAutoSizePadding())
      }
      if (type === 'toggle') {
        active && buttonCls.push('active')
      }
      disabled && buttonCls.push('disabled')
      buttonCls.push(typeCls)

      this.setData({
        buttonCls: buttonCls.join(' ')
      })
    },
    toggleButton() {
      this.setData({
        active: !this.data.active
      }, () => this._computeButtonCls())
    },
    handleClick() {
      const { type, active } = this.data

      if (type === 'toggle') {
        this.toggleButton()
      }
      this.triggerEvent('onClick', {
        componentName: this.data.componentName,
        value: active
      })
    }
  }
})

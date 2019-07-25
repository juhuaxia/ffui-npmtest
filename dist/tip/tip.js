import defaultBehaviors from '../behaviors/default'

Component({
  behaviors: [defaultBehaviors],
  externalClasses: ['cls'],
  properties: {
    showTip: {
      type: Boolean
    },
    tipText: {
      type: String
    },
    tipClickable: {
      type: Boolean,
      value: false
    },
    tipIcon: {
      type: String,
      value: 'icon-white-iserror',
    },
    closeIcon: {
      type: String,
      value: 'icon-close-white',
    },
    theme: {
      type: String,
      value: '',
      observer: '_initIconsByTheme'
    }
  },
  methods: {
    _initIconsByTheme: function(val) {
      let tipIcon = ''
      let closeIcon = ''

      switch (val) {
        case 'bottom':
          tipIcon = 'icon-iserror'
          closeIcon = 'icon-close-black'
          break
      }

      this.setData({
        tipIcon,
        closeIcon
      })
    },
    handleClose: function() {
      this.triggerEvent('onCloseTip')
    },
    handleTextClick() {
      if (this.data.tipClickable) {
        this.triggerEvent('onClickTipText')
      }
    }
  }
})

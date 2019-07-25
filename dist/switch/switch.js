import defaultBehaviors from '../behaviors/default'

Component({
  behaviors: [defaultBehaviors],
  externalClasses: ['cls'],
  properties: {
    checked: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  },
  methods: {
    handleChange(e) {
      this.triggerEvent('onChange', {
        componentName: this.data.componentName,
        checked: e.detail.value
      })
    }
  }
})

import defaultBehaviors from '../behaviors/default'

Component({
  behaviors: [defaultBehaviors],

  externalClasses: ['cls'],

  properties: {
    data: {
      type: Array,
      value: []
    },
    currentIndex: {
      type: Number,
      value: 0
    }
  },

  methods: {
    handleClickItem (e) {
      const index = e.target.dataset.index
      const { componentName } = this.data

      this.setData({
        currentIndex: index
      })

      this.triggerEvent('onChange', {
        componentName,
        value: index
      })
    }
  }
})

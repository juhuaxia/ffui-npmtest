import defaultBehaviors from '../behaviors/default'

Component({
  behaviors: [defaultBehaviors],

  externalClasses: ['cls'],

  properties: {
    tabs: {
      type: Array,
      observer: '_initList'
    },
    currentKey: {
      type: String
    },
    isIphoneX: {
      type: Boolean,
      default: false
    }
  },

  data: {
    list: []
  },

  methods: {
    _initList (tabs) {
      const { currentKey } = this.data

      const list = tabs.map((item, index) => {
        if (currentKey) {
          if (currentKey === item.key) {
            item['selected'] = true
          } else {
            item['selected'] = false
          }
        } else {
          if (index === 0) {
            item['selected'] = true
          } else {
            item['selected'] = false
          }
        }

        return item
      })

      this.setData({
        list
      })
    },

    handleClickItem (e) {
      const key = e.target.dataset.key
      const { componentName } = this.data

      const list = this.data.list.map(item => {
        if (item.key === key) {
          item.selected = true
        } else {
          item.selected = false
        }
        return item
      })

      this.setData({
        list
      })

      this.triggerEvent('onChange', {
        componentName,
        value: key
      })
    }
  }
})

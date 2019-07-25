import defaultBehaviors from '../behaviors/default'

Component({
  options: {
    multipleSlots: true
  },
  behaviors: [defaultBehaviors],
  externalClasses: ['cls'],
  properties: {
    data: {
      type: Array,
      value: []
    },
    defaultCheckedValues: {
      type: Array,
      value: []
    },
    slotPrefix: {
      type: String,
      value: 'groupslot_'
    },
    valueField: {
      type: null,
      value: 'id'
    },
    type: {
      type: String,
      value: 'checkboxgroup'
    }
  },
  data: {
    checkeds: null,
    slots: []
  },
  created() {
    this.setData({
      checkeds: new Map()
    })
  },
  setSlots() {
    // this.data.map(item => {
    //   item.
    // })
  },
  setDefaultCheckedProducts() {
    // TODO
  },
  methods: {
    onCheckChange(e) {
      const { value: { value, isChecked } } = e.detail
      const { checkeds, valueField, componentName, type } = this.data
      const k = type === 'checkboxgroup' ? value[valueField] : 'checkds'
      const v = value[valueField]

      if (isChecked || type === 'radiogroup') {
        checkeds.set(k, v)
      } else {
        checkeds.delete(k)
      }

      this.triggerEvent('onGroupCheckChange', {
        componentName,
        value: [...checkeds.values()]
      })
    }
  }
})

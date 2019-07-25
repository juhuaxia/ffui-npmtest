import defaultBehaviors from '../behaviors/default'

Component({
  options: {
    multipleSlots: true
  },
  behaviors: [defaultBehaviors],
  externalClasses: ['cls'],
  properties: {
    text: {
      type: null,
      value: '',
      observer: '_initContent'
    },
    overflowCount: {
      type: Number,
      value: 0
    },
    dot: {
      type: Boolean,
      value: true,
      observer: '_initClass'
    },
  },
  data: {
    dotClass: 'dot-mode-class',
    content: '',
  },
  methods: {
    _initClass(dot) {
      const dotClass = dot ? 'dot-mode-class' : ''

      this.setData({
        dotClass
      })
    },
    _initContent() {
      const { text, overflowCount } = this.data
      let content = ''

      if (typeof text === 'number') {
        content = text > overflowCount ? overflowCount + '+' : content
      } else {
        content = text
      }

      this.setData({
        content
      })
    }
  }
})

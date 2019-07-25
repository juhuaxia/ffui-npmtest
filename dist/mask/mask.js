import defaultBehaviors from '../behaviors/default'
import transitionMixin from '../behaviors/transition'

Component({
  behaviors: [defaultBehaviors, transitionMixin],
  externalClasses: ['cls'],
  properties: {
    zIndex: {
      type: Number,
      value: 1
    }
  },
  data: {
    name: 'fade'
  },
  methods: {
    handleTap: function () {
      this.triggerEvent('tapMask')
    },
    noop: () => { }
  }
})

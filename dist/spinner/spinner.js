import defaultBehaviors from '../behaviors/default'

Component({
  behaviors: [defaultBehaviors],
  externalClasses: ['cls'],
  properties: {
    showSpinner: {
      type: Boolean
    },
    spinnerType: {
      type: String
    },
    part: {
      type: Boolean
    }
  }
})

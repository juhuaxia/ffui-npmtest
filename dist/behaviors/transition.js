export default Behavior({
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: 'observeShow'
    },
    duration: {
      type: Number,
      value: 300
    },
    ffStyle: {
      type: String,
      value: ''
    }
  },
  data: {
    initialized: false,
    display: false,
    kind: ''
  },
  // TODO not work, try later
  // options: {
  //   addGlobalClass: true,
  // },
  methods: {
    observeShow(value) {
      console.log('show changed!' + value)
      if (value) {
        this.show()
      } else {
        this.setData({
          kind: 'leave'
        })
      }
    },
    show() {
      this.setData({
        initialized: true,
        display: true,
        kind: 'enter'
      })
    },
    handleAnimationEnd() {
      console.log('animation end enter')
      if (!this.data.show) {
        this.setData({
          display: false
        })
      }
    }
  }
})

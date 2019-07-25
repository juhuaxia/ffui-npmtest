class SliderView {
  static map = new Map()

  constructor(compInstance) {
    this._component = compInstance
    this._setMap()
  }

  _setMap() {
    const { id } = this._component.data._product

    if (!SliderView.map.has(id)) {
      SliderView.map.set(id, this._component)
    }
  }

  clear() {
    SliderView.map.clear()
  }

  slide(x) {
    const { id } = this._component.data._product

    if (typeof x === 'undefined') {
      this._component.setData({
        _product: {
          ...this._component.data._product,
          _x: 0
        }
      })
      return
    }
    for (let comp of SliderView.map.values()) {
      const p = comp.data._product
      let _x

      if (id === p.id) {
        _x = x
      } else {
        _x = 0
      }

      comp.setData({
        _product: {
          ...p,
          _x
        }
      })
    }
  }
}

export default SliderView

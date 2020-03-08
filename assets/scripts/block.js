import colors from './colors'

cc.Class({
  extends: cc.Component,

  properties: {
    numberLabel: cc.Label
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {},

  // update (dt) {},
  setNumber(num) {
    if (num === 0 || !colors[num]) {
      this.numberLabel.node.active = false
    }
    this.numberLabel.string = num
    if (colors[num]) {
      this.node.color = colors[num]
    } else {
      this.node.color = colors[0]
    }
  }
})

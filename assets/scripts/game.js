const ROW = 4
const COLUM = 4

cc.Class({
  extends: cc.Component,

  properties: {
    scoreLabel: cc.Label,
    score: 0,
    blockPrefab: cc.Prefab,
    gap: 20,
    bg: cc.Node
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  start() {
    this.init()
  },
  // update (dt) {},

  init() {
    this.blockList = this.makeDyadicArray(ROW, COLUM)
    // 一个格子的大小
    this.blockSize = (cc.winSize.width - this.gap * (COLUM + 1)) / COLUM

    this.drawBgBlocks()
  },

  drawBgBlocks() {
    this.blockList.forEach((rowArray, row) => {
      rowArray.forEach((item, colum) => {
        const block = this.makeBlock(this.blockSize)
        const x = this.getCenterPosition(colum)
        const y = this.getCenterPosition(row)
        const position = cc.v2(x, y)
        this.bg.addChild(block)
        block.setPosition(position)
        block.getComponent('block').setNumber(item)
        this.blockList[row][colum] = { position, block, num: 0 }
      })
    })
  },

  makeDyadicArray(row, colum) {
    const arr = []
    for (let i = 0; i < row; i++) {
      arr.push(
        [...new Array(colum).keys()].map(() => {
          return { num: 0 }
        })
      )
    }
    return arr
  },

  // 制造块
  makeBlock(size) {
    const block = cc.instantiate(this.blockPrefab)
    block.width = size
    block.height = size
    return block
  },

  // 根据行列返回块的位置
  getCenterPosition(rowOrColum) {
    return (
      (rowOrColum + 1) * this.gap +
      ((2 * (rowOrColum + 1) - 1) * this.blockSize) / 2
    )
  },

  // 找出空闲块
  findEmptyBlock() {
    const result = []
    this.blockList.forEach((arr, row) => {
      arr.forEach((item, colum) => {
        if (!item.num && item.position && item.block) {
          result.push({ row, colum })
        }
      })
    })
    return result
  },

  // 随机抽出空闲位置添加2/4的块
  addRamdomBlock(){
    const emptyBlockList = this.findEmptyBlock
  }
})

/*
 * @Description: 观察者
 * @Author: xujian
 * @Date: 2021-05-31 20:12:19
 */

import { popTarget, pushTarget } from "./dep"

let id = 0

class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm
    this.expOrFn = expOrFn
    this.cb = cb
    this.options = options
    this.id = id++

    this.getter = expOrFn
    this.deps = []
    this.depIds = new Set()

    this.get()

  }

  get() {
    pushTarget(this)
    this.getter()
    popTarget()
  }

  addDep(dep) {
    // 判断是否存在 不存在再添加
    if (!this.depIds.has(dep.id)) {
      this.depIds.add(dep.id)
      // 把dep放到watcher里面
      this.deps.push(dep)
      // 把watcher放到dep里
      dep.depAddWatcher(this)
    }
  }

  update() {
    this.get()
  }
}




export default Watcher
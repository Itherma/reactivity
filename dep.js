/*
 * @Description: feature name
 * @Author: xujian
 * @Date: 2021-05-31 20:12:23
 */

let id = 0
export class Dep {
  constructor() {
    this.id = id++
    this.watchers = []
  }

  depAddWatcher(watcher) {
    this.watchers.push(watcher)
  }

  watcherAddDep() {
    if (Dep.target) {
      console.log('watcherAddDep');
      this.watchers.addDep(this)
    }
  }

  notify() {
    this.watchers.forEach(watcher => watcher.update())
  }

}


Dep.target = null

export function pushTarget(watcher) {
  Dep.target = watcher
  console.log('pushTarget: ', watcher);
}

export function popTarget() {
  Dep.target = null
  console.log('popTarget');
}



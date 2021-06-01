/*
 * @Description: Vue响应实现
 * @Author: xujian
 * @Date: 2021-05-31 20:12:04
 */

const typeFn = Object.prototype.toString
import arrayMethods from './array.js'
import { Dep } from './dep.js'
import Watcher from './watcher'


function observe(data) {
  // 是对象或者数组并且没有被侦测过就侦测该数据
  if (typeof data === 'object' && data !== null && !data.__ob__) {
    return new Observer(data)
  }
}


class Observer {
  constructor(data) { // 将对象中的所有属性 进行劫持
    this.dep = new Dep()
    // 定义__ob__属性
    Object.defineProperty(data, '__ob__', {
      enumerable: false,
      configurable: false,
      value: this
    })
    // 数据可能是数组或者对象
    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods
      this.arrayObserver(data)
    } else {
      this.walk(data)
    }
  }

  walk(data) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key])
    })
  }

  arrayObserver(data) {
    data.forEach(item => {
      observe(item)
    })
  }
}


function dependArray(value) {
  for (let i = 0; i < value.length; i++) {
    let current = value[i]; // current是数组里面的数组 [[[[[]]]]]
    current.__ob__ && current.__ob__.dep.depend();
    if (Array.isArray(current)) {
      dependArray(current);
    }
  }
}

function defineReactive(target, key, value) {
  observe(value)
  const dep = new Dep()
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.watcherAddDep()
      }
      return value
    },
    set(newVal) {
      if (newVal === value) return
      // 对新值进行转换
      // observe(newVal)
      target[key] = newVal
      dep.notify()
    }
  })
}


const data = {
  name: 'xujian',
  age: 27,
  hobit: {
    lanqiu: 'shi',
    zuqiu: 'fou',
  },
  dream: [{ name: 'xujian', age: { yangli: 28, nongli: 27 } }]
}

observe(data)

window.data = data

function fn(val) {
  console.log(111);
}

window.watcher = new Watcher(data, fn)
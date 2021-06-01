/*
 * @Description: 切片data上的实例方法
 * @Author: xujian
 * @Date: 2021-05-31 20:27:55
 */


const arrayMethods = Object.create(Array.prototype)

const originArrayMethods = Array.prototype

const methods = ['push', 'pop', 'shift', 'unshift', 'sort', 'revert', 'splice']

methods.forEach(method => {
  arrayMethods[method] = function (...args) {
    let result = originArrayMethods[method].apply(this, args)
    const ob = this.__ob__
    let inserted = null
    // 判断是否有新加的元素
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
      default:
        break
    }
    console.log(inserted);
    console.log(ob);
    if (inserted) {
      ob.arrayObserver(inserted)
    }
    return result;
  }
})






export default arrayMethods
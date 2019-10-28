// 封装local模块，本地存储用户信息

const KEY = 'toutiao-pc-key'
const local = {
  // 存储用户信息
  setUser (user) {
    //   把user对象转换成json字符串再设置
    const jsonStr = JSON.stringify(user)
    // console.log(jsonStr)

    window.sessionStorage.setItem(KEY, jsonStr)
  },
  // 获取用户信息
  getUser () {
    const jsonStr = window.sessionStorage.getItem(KEY)
    // 转成对象
    return JSON.parse(jsonStr)
  },

  // 删除用户信息
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }

}

export default local

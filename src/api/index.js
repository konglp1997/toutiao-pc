import axios from 'axios'
import local from '@/utils/local.js'
import router from '@/router'
import JSONBIG from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 设置默认的请求头
axios.defaults.transformResponse = [(data) => {
  // 对data进行格式转换
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]

// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
// }

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 拦截成功  往headers中加token
  const user = local.getUser() || {}

  config.headers.Authorization = `Bearer ${user.token}`

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// token可能会失效
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response.status === 401) {
    return router.push('/login')
  }
  return Promise.reject(error)
})

export default axios

// const Base_URL = 'http://localhost:8082'
const Base_URL = 'http://39.106.218.208:8082'

export default (params) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: Base_URL + params.url,
      method: params.method || 'GET',
      data: params.data || {},
      success: (res) => {
        if (res.data.status !== 0) {
          return uni.showToast({
            title: "获取数据失败",
            icon:'none'
          })
        }
        resolve(res)
      },
      fail:(err)=>{
        return uni.showToast({
          title: "请求数据失败",
          icon:'none'
        })
        reject(err)
      }
    })
  })
}
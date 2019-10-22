import ajax from './ajax'
import jsonp from 'jsonp'

/* 登陆 */
export const reqLogin = ({ username, password }) => ajax.post('/login', { username, password })

/* 获取用户列表 */
export const reqUsers = () => ajax.get('/manage/user/list')


/*
通过jsonp请求获取天气信息
 */
export function reqWeather(city) {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  return new Promise((resolve, reject) => {
    jsonp(url, {
      param: 'callback'
    }, (error, response) => {
      if (!error && response.status === 'success') {
        const {dayPictureUrl, weather} = response.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        alert('获取天气信息失败')
      }
    })
  })
}


import fetch from '../utils/fetch'

const API_HOST = 'http://localhost:3000'

const getHaha = params => fetch(API_HOST + '/haha', params, 'GET')

export {
  getHaha
}

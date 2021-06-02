import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexUsers = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/users',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

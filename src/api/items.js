import apiUrl from '../apiConfig'
import axios from 'axios'

export const createItem = (item, user, potluckId) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/items',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      item: {
        name: item.name,
        potluckId: potluckId
      }
    }
  })
}

export const deleteItem = (user, itemId, potluckId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/items/' + itemId,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      item: {
        potluckId: potluckId
      }
    }
  })
}

export const updateItem = (item, itemId, user, potluckId) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/items/' + itemId,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      item: {
        name: item.name,
        potluckId: potluckId
      }
    }
  })
}

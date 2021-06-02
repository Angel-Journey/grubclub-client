import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPotluck = (potluck, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/potlucks',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      potluck: {
        title: potluck.title,
        location: potluck.location,
        date: potluck.date,
        body: potluck.body
      }
    }
  })
}

export const indexPotlucks = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/potlucks',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const deletePotluck = (user, id) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/potlucks/' + id,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const indexAllPotlucks = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/potlucks/all',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const updatePotluck = (user, id, title, location, date, body) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/potlucks/' + id,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      potluck: {
        title: title,
        location: location,
        date: date,
        body: body
      }
    }
  })
}

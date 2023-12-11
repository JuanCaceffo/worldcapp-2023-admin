import axios from 'axios'
import { REST_SERVER_URL, USER_KEY_STORAGE } from '../../constants'

const UserService = () => {
  const login = async (props) => {
    console.log(REST_SERVER_URL)
    const response$ = await axios.post(`${REST_SERVER_URL}/user/login`, props)
    const userID = response$.data.userLogedID.toString()
    sessionStorage.setItem(USER_KEY_STORAGE, userID)
  }

  return {
    login,
  }
}

export const userService = UserService()

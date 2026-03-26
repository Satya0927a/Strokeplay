import { getToken } from "@clerk/react";
import axios from "axios";
const url = "http://localhost:3000"
const gettoken = async () => {
  const token = await getToken()
  return token
}

const Aftersignup = async () => {
  const token = await gettoken()
  const result = await axios.post(`${url}/auth/signup`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return result

}
const getuserdata = async () => {
  console.log('api request sent');
  const token = await gettoken()
  console.log(token);
  const result = await axios.get(`${url}/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return result
}

const renewsubs = async (planId) => {
  const token = await gettoken()
  const result = await axios.post(`${url}/user/subs/renew/${planId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return result
}

const fetchscores = async () => {
  const token = await gettoken()
  const result = await axios.get(`${url}/user/dash/score/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return result
}
const logscores = async (course,score,date,holes) => {
  const token = await gettoken()
  const result = await axios.post(`${url}/user/dash/score/`,{
    course:course,
    holes:holes,
    score:score,
    date:date
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return result
}
const fetchoverview = async () => {
  const token = await gettoken()
  const result = await axios.get(`${url}/user/dash/overview`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return result
}
const fetchusers = async () => {
  const token = await gettoken()
  const result = await axios.get(`${url}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return result
}
const fetchdraws = async () => {
  const token = await gettoken()
  const result = await axios.get(`${url}/admin/draws`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return result
}
export { Aftersignup, getuserdata, renewsubs ,fetchscores,logscores,fetchoverview , fetchusers,fetchdraws}
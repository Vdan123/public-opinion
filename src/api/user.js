import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/api/Login/login',
    method: 'post',
    data
  });
}

export function logout() {
  return request({
    url: '/api/Login/logout',
    method: 'post'
  });
}

export function getUserDetails(data) {
  return request({
    url: '/api/User/getUserDetails',
    method: 'post',
    data
  });
}

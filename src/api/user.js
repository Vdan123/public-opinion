import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/Login/login',
    method: 'post',
    data
  });
}

export function logout() {
  return request({
    url: '/Login/logout',
    method: 'post'
  });
}

export function getUserDetails(data) {
  return request({
    url: '/User/getUserDetails',
    method: 'post',
    data
  });
}

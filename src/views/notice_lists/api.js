import request from '@/utils/request';

export function getWarningRecords(data) {
  return request({
    url: '/Article/getWarningRecords',
    method: 'post',
    data
  });
}

export function getWarningTotal(data) {
  return request({
    url: '/Home/getWarningTotal',
    method: 'post',
    data
  });
}

export function upRead(data) {
  return request({
    url: '/Article/upRead',
    method: 'post',
    data
  });
}

import request from '@/utils/request';

export function addKeywords(data) {
  return request({
    url: '/Keyword/addKeywords',
    method: 'post',
    data
  });
}

export function editKeywords(data) {
  return request({
    url: '/Keyword/editKeywords',
    method: 'post',
    data
  });
}

export function getKeywords(data) {
  return request({
    url: '/Keyword/getKeywords',
    method: 'post',
    data
  });
}

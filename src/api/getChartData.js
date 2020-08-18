import request from '@/utils/request';

export function getPieData(data) {
  return request({
    url: '/Api/getPieData',
    method: 'post',
    data
  });
}

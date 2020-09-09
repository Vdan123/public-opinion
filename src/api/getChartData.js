import request from '@/utils/request';

export function getPieData(data) {
  return request({
    url: '/Home/getPieData',
    method: 'post',
    data
  });
}

import request from '@/utils/request';

export function getLoginInfo(data) {
  return request({
    url: '/Api/getPromptInfo',
    method: 'post',
    data
  });
}

// 方案数量获取
export function getPlanTotal(data) {
  return request({
    url: '/Api/getPlanTotal',
    method: 'post',
    data
  });
}

// 敏感信息列表获取
export function getZXMinGanInfoList(data) {
  return request({
    url: '/Api/getZXMinGanInfoList',
    method: 'post',
    data
  });
}

// 实时信息列表获取
export function getRealTimeDataList(data) {
  return request({
    url: '/Api/getRealTimeDataList',
    method: 'post',
    data
  });
}

// 预警列表获取
export function getWarningInfo(data) {
  return request({
    url: '/Api/getWarningInfo',
    method: 'post',
    data
  });
}

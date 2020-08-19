import request from '@/utils/request';

export function getGroup(data) {
  return request({
    url: '/Keyword/getGroup',
    method: 'post',
    data
  });
}

export function addGroup(data) {
  return request({
    url: '/Keyword/addGroup',
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

// 实时舆情列表
export function getArticleList(data) {
  return request({
    url: '/Article/getArticleList',
    method: 'post',
    data
  });
}

// 获取分组和方案
export function getGroupPlan(data) {
  return request({
    url: '/Keyword/getGroupPlan',
    method: 'post',
    data
  });
}
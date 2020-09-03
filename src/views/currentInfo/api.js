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

// 修改分组名称
export function editGroup(data) {
  return request({
    url: '/Keyword/editGroup',
    method: 'post',
    data
  });
}

// 删除分组名称
export function delGroup(data) {
  return request({
    url: '/Keyword/delGroup',
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

// 删除方案
export function delKeywords(data) {
  return request({
    url: '/Keyword/delKeywords',
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

// 获取信息详情
export function getDetails(data) {
  return request({
    url: '/Article/getDetails',
    method: 'post',
    data
  });
}

// 预警设置
export function setWarning(data) {
  return request({
    url: '/Keyword/setWarning',
    method: 'post',
    data
  });
}

// 获取预警设置
export function getWarning(data) {
  return request({
    url: '/Keyword/getWarning',
    method: 'post',
    data
  });
}

// 更改属性状态
export function setArticleAttribute(data) {
  return request({
    url: '/Article/setArticleAttribute',
    method: 'post',
    data
  });
}

// 获取数据来源，例如：微博、今日头条
export function getSource(data) {
  return request({
    url: '/Api/getSource',
    method: 'post',
    data
  });
}

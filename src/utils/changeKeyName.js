export function changeKeyNames(obj, namesMap) {
  return _.transform(obj, function(result, value, key) {
    result[namesMap[key] || key] = value;
  });
}

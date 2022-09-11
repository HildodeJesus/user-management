function existsOrNot(element, msg) {
  if(Array.isArray(element) && element.length <= 0) throw msg;
  if(element == undefined || element == null || element == '') throw msg;
}

module.exports = existsOrNot
exports.isHash = function (hash) {
  return typeof hash === "string"
  &&
  (
    new RegExp("^[9A-Z]{81}$").test(hash)
    || new RegExp("^[9A-Z]{91}$").test(hash)
  );
};

exports.isTrytes = function (trytes, length) {
  if (length === void 0) { length = "1,"; }
  return typeof trytes === "string" && new RegExp("^[9A-Z]{" + length + "}$").test(trytes);
};


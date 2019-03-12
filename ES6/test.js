'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var a = 1;
console.log('aagagagag');

var f = function f() {
  _classCallCheck(this, f);
};

;

var controller = function controller(path) {
  return function (target) {
    return target.prototype[0] = path;
  };
};

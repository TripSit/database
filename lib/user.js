'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var argon = require('argon2');

module.exports = function createUserQueries(knex) {
  return {
    find: function find() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          nick = _ref.nick;

      var query = knex('users');
      if (nick) query.where('nick', 'like', "%".concat(nick, "%"));
      return query;
    },
    create: function create(user) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = knex('users');
                _context.t1 = _objectSpread;
                _context.t2 = _objectSpread({}, user);
                _context.t3 = {};
                _context.next = 6;
                return argon.hash(user.password);

              case 6:
                _context.t4 = _context.sent;
                _context.t5 = {
                  password: _context.t4
                };
                _context.t6 = (0, _context.t1)(_context.t2, _context.t3, _context.t5);
                return _context.abrupt("return", _context.t0.insert.call(_context.t0, _context.t6).returning(['id', 'nick', 'createdAt']).then(function (_ref2) {
                  var _ref3 = (0, _slicedToArray2["default"])(_ref2, 1),
                      newUser = _ref3[0];

                  return newUser;
                }));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    authenticate: function authenticate(nick, password) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _yield$knex$select$wh, hash;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return knex('users').select('password').where('nick', nick).first();

              case 2:
                _yield$knex$select$wh = _context2.sent;
                hash = _yield$knex$select$wh.password;
                return _context2.abrupt("return", argon.verify(hash, password));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLmpzIl0sIm5hbWVzIjpbImFyZ29uIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJjcmVhdGVVc2VyUXVlcmllcyIsImtuZXgiLCJmaW5kIiwibmljayIsInF1ZXJ5Iiwid2hlcmUiLCJjcmVhdGUiLCJ1c2VyIiwiaGFzaCIsInBhc3N3b3JkIiwiaW5zZXJ0IiwicmV0dXJuaW5nIiwidGhlbiIsIm5ld1VzZXIiLCJhdXRoZW50aWNhdGUiLCJzZWxlY3QiLCJmaXJzdCIsInZlcmlmeSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxRQUFELENBQXJCOztBQUVBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUIsU0FBU0MsaUJBQVQsQ0FBMkJDLElBQTNCLEVBQWlDO0FBQ2hELFNBQU87QUFDTEMsSUFBQUEsSUFESyxrQkFDZTtBQUFBLHFGQUFKLEVBQUk7QUFBQSxVQUFiQyxJQUFhLFFBQWJBLElBQWE7O0FBQ2xCLFVBQU1DLEtBQUssR0FBR0gsSUFBSSxDQUFDLE9BQUQsQ0FBbEI7QUFDQSxVQUFJRSxJQUFKLEVBQVVDLEtBQUssQ0FBQ0MsS0FBTixDQUFZLE1BQVosRUFBb0IsTUFBcEIsYUFBZ0NGLElBQWhDO0FBQ1YsYUFBT0MsS0FBUDtBQUNELEtBTEk7QUFPQ0UsSUFBQUEsTUFQRCxrQkFPUUMsSUFQUixFQU9jO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhCQUNWTixJQUFJLENBQUMsT0FBRCxDQURNO0FBQUE7QUFBQSxnREFHVk0sSUFIVTtBQUFBO0FBQUE7QUFBQSx1QkFJR1gsS0FBSyxDQUFDWSxJQUFOLENBQVdELElBQUksQ0FBQ0UsUUFBaEIsQ0FKSDs7QUFBQTtBQUFBO0FBQUE7QUFJYkEsa0JBQUFBLFFBSmE7QUFBQTtBQUFBO0FBQUEsNkRBRWRDLE1BRmMsZ0NBTWRDLFNBTmMsQ0FNSixDQUFDLElBQUQsRUFBTyxNQUFQLEVBQWUsV0FBZixDQU5JLEVBT2RDLElBUGMsQ0FPVDtBQUFBO0FBQUEsc0JBQUVDLE9BQUY7O0FBQUEseUJBQWVBLE9BQWY7QUFBQSxpQkFQUzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFsQixLQWZJO0FBaUJDQyxJQUFBQSxZQWpCRCx3QkFpQmNYLElBakJkLEVBaUJvQk0sUUFqQnBCLEVBaUI4QjtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUNBUixJQUFJLENBQUMsT0FBRCxDQUFKLENBQzlCYyxNQUQ4QixDQUN2QixVQUR1QixFQUU5QlYsS0FGOEIsQ0FFeEIsTUFGd0IsRUFFaEJGLElBRmdCLEVBRzlCYSxLQUg4QixFQURBOztBQUFBO0FBQUE7QUFDZlIsZ0JBQUFBLElBRGUseUJBQ3pCQyxRQUR5QjtBQUFBLGtEQUsxQmIsS0FBSyxDQUFDcUIsTUFBTixDQUFhVCxJQUFiLEVBQW1CQyxRQUFuQixDQUwwQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1sQztBQXZCSSxHQUFQO0FBeUJELENBMUJEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhcmdvbiA9IHJlcXVpcmUoJ2FyZ29uMicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZVVzZXJRdWVyaWVzKGtuZXgpIHtcbiAgcmV0dXJuIHtcbiAgICBmaW5kKHsgbmljayB9ID0ge30pIHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0ga25leCgndXNlcnMnKTtcbiAgICAgIGlmIChuaWNrKSBxdWVyeS53aGVyZSgnbmljaycsICdsaWtlJywgYCUke25pY2t9JWApO1xuICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgIH0sXG5cbiAgICBhc3luYyBjcmVhdGUodXNlcikge1xuICAgICAgcmV0dXJuIGtuZXgoJ3VzZXJzJylcbiAgICAgICAgLmluc2VydCh7XG4gICAgICAgICAgLi4udXNlcixcbiAgICAgICAgICBwYXNzd29yZDogYXdhaXQgYXJnb24uaGFzaCh1c2VyLnBhc3N3b3JkKSxcbiAgICAgICAgfSlcbiAgICAgICAgLnJldHVybmluZyhbJ2lkJywgJ25pY2snLCAnY3JlYXRlZEF0J10pXG4gICAgICAgIC50aGVuKChbbmV3VXNlcl0pID0+IG5ld1VzZXIpO1xuICAgIH0sXG5cbiAgICBhc3luYyBhdXRoZW50aWNhdGUobmljaywgcGFzc3dvcmQpIHtcbiAgICAgIGNvbnN0IHsgcGFzc3dvcmQ6IGhhc2ggfSA9IGF3YWl0IGtuZXgoJ3VzZXJzJylcbiAgICAgICAgLnNlbGVjdCgncGFzc3dvcmQnKVxuICAgICAgICAud2hlcmUoJ25pY2snLCBuaWNrKVxuICAgICAgICAuZmlyc3QoKTtcbiAgICAgIHJldHVybiBhcmdvbi52ZXJpZnkoaGFzaCwgcGFzc3dvcmQpO1xuICAgIH0sXG4gIH07XG59O1xuIl19
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = function createDrugQueries(knex) {
  return {
    find: function find() {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", knex('drugs').where('deleted', false).orderBy('name', 'asc'));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    findById: function findById(id) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", knex('drugs').where('id', id).where('deleted', false).first());

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    create: function create(drug) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", knex('drugs').insert(drug).returning('*').then(function (_ref) {
                  var _ref2 = (0, _slicedToArray2["default"])(_ref, 1),
                      newDrug = _ref2[0];

                  return newDrug;
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    update: function update(id, updates) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", knex('drugs').update(updates).where('id', id).where('deleted', false).returning('*').then(function (_ref3) {
                  var _ref4 = (0, _slicedToArray2["default"])(_ref3, 1),
                      updatedDrug = _ref4[0];

                  return updatedDrug;
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    "delete": function _delete(id) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return knex('drugs').update('deleted', true).where('id', id);

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    aliases: function aliases(drugId) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", knex('drug_aliases').select('text').where('drug_id', drugId).orderBy('text', 'asc').then(function (records) {
                  return records.map(function (record) {
                    return record.text;
                  });
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    roas: function roas(drugId) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", knex('drug_roas').where('drug_id', drugId));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    deleteRoa: function deleteRoa(id) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return knex('drug_roas').update('deleted', true).where('id', id);

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kcnVnLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJjcmVhdGVEcnVnUXVlcmllcyIsImtuZXgiLCJmaW5kIiwid2hlcmUiLCJvcmRlckJ5IiwiZmluZEJ5SWQiLCJpZCIsImZpcnN0IiwiY3JlYXRlIiwiZHJ1ZyIsImluc2VydCIsInJldHVybmluZyIsInRoZW4iLCJuZXdEcnVnIiwidXBkYXRlIiwidXBkYXRlcyIsInVwZGF0ZWREcnVnIiwiYWxpYXNlcyIsImRydWdJZCIsInNlbGVjdCIsInJlY29yZHMiLCJtYXAiLCJyZWNvcmQiLCJ0ZXh0Iiwicm9hcyIsImRlbGV0ZVJvYSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFNBQVNDLGlCQUFULENBQTJCQyxJQUEzQixFQUFpQztBQUNoRCxTQUFPO0FBQ0NDLElBQUFBLElBREQsa0JBQ1E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaURBQ0pELElBQUksQ0FBQyxPQUFELENBQUosQ0FDSkUsS0FESSxDQUNFLFNBREYsRUFDYSxLQURiLEVBRUpDLE9BRkksQ0FFSSxNQUZKLEVBRVksS0FGWixDQURJOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSVosS0FMSTtBQU9DQyxJQUFBQSxRQVBELG9CQU9VQyxFQVBWLEVBT2M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0RBQ1ZMLElBQUksQ0FBQyxPQUFELENBQUosQ0FDSkUsS0FESSxDQUNFLElBREYsRUFDUUcsRUFEUixFQUVKSCxLQUZJLENBRUUsU0FGRixFQUVhLEtBRmIsRUFHSkksS0FISSxFQURVOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS2xCLEtBWkk7QUFjQ0MsSUFBQUEsTUFkRCxrQkFjUUMsSUFkUixFQWNjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtEQUNWUixJQUFJLENBQUMsT0FBRCxDQUFKLENBQ0pTLE1BREksQ0FDR0QsSUFESCxFQUVKRSxTQUZJLENBRU0sR0FGTixFQUdKQyxJQUhJLENBR0M7QUFBQTtBQUFBLHNCQUFFQyxPQUFGOztBQUFBLHlCQUFlQSxPQUFmO0FBQUEsaUJBSEQsQ0FEVTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtsQixLQW5CSTtBQXFCQ0MsSUFBQUEsTUFyQkQsa0JBcUJRUixFQXJCUixFQXFCWVMsT0FyQlosRUFxQnFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtEQUNqQmQsSUFBSSxDQUFDLE9BQUQsQ0FBSixDQUNKYSxNQURJLENBQ0dDLE9BREgsRUFFSlosS0FGSSxDQUVFLElBRkYsRUFFUUcsRUFGUixFQUdKSCxLQUhJLENBR0UsU0FIRixFQUdhLEtBSGIsRUFJSlEsU0FKSSxDQUlNLEdBSk4sRUFLSkMsSUFMSSxDQUtDO0FBQUE7QUFBQSxzQkFBRUksV0FBRjs7QUFBQSx5QkFBbUJBLFdBQW5CO0FBQUEsaUJBTEQsQ0FEaUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPekIsS0E1Qkk7QUFBQSwrQkE4QlFWLEVBOUJSLEVBOEJZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ1RMLElBQUksQ0FBQyxPQUFELENBQUosQ0FDSGEsTUFERyxDQUNJLFNBREosRUFDZSxJQURmLEVBRUhYLEtBRkcsQ0FFRyxJQUZILEVBRVNHLEVBRlQsQ0FEUzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUloQixLQWxDSTtBQW9DQ1csSUFBQUEsT0FwQ0QsbUJBb0NTQyxNQXBDVCxFQW9DaUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0RBQ2JqQixJQUFJLENBQUMsY0FBRCxDQUFKLENBQ0prQixNQURJLENBQ0csTUFESCxFQUVKaEIsS0FGSSxDQUVFLFNBRkYsRUFFYWUsTUFGYixFQUdKZCxPQUhJLENBR0ksTUFISixFQUdZLEtBSFosRUFJSlEsSUFKSSxDQUlDLFVBQUFRLE9BQU87QUFBQSx5QkFBSUEsT0FBTyxDQUFDQyxHQUFSLENBQVksVUFBQUMsTUFBTTtBQUFBLDJCQUFJQSxNQUFNLENBQUNDLElBQVg7QUFBQSxtQkFBbEIsQ0FBSjtBQUFBLGlCQUpSLENBRGE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNckIsS0ExQ0k7QUE0Q0NDLElBQUFBLElBNUNELGdCQTRDTU4sTUE1Q04sRUE0Q2M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0RBQ1ZqQixJQUFJLENBQUMsV0FBRCxDQUFKLENBQWtCRSxLQUFsQixDQUF3QixTQUF4QixFQUFtQ2UsTUFBbkMsQ0FEVTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVsQixLQTlDSTtBQWdEQ08sSUFBQUEsU0FoREQscUJBZ0RXbkIsRUFoRFgsRUFnRGU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDWkwsSUFBSSxDQUFDLFdBQUQsQ0FBSixDQUNIYSxNQURHLENBQ0ksU0FESixFQUNlLElBRGYsRUFFSFgsS0FGRyxDQUVHLElBRkgsRUFFU0csRUFGVCxDQURZOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSW5CO0FBcERJLEdBQVA7QUFzREQsQ0F2REQiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRHJ1Z1F1ZXJpZXMoa25leCkge1xuICByZXR1cm4ge1xuICAgIGFzeW5jIGZpbmQoKSB7XG4gICAgICByZXR1cm4ga25leCgnZHJ1Z3MnKVxuICAgICAgICAud2hlcmUoJ2RlbGV0ZWQnLCBmYWxzZSlcbiAgICAgICAgLm9yZGVyQnkoJ25hbWUnLCAnYXNjJyk7XG4gICAgfSxcblxuICAgIGFzeW5jIGZpbmRCeUlkKGlkKSB7XG4gICAgICByZXR1cm4ga25leCgnZHJ1Z3MnKVxuICAgICAgICAud2hlcmUoJ2lkJywgaWQpXG4gICAgICAgIC53aGVyZSgnZGVsZXRlZCcsIGZhbHNlKVxuICAgICAgICAuZmlyc3QoKTtcbiAgICB9LFxuXG4gICAgYXN5bmMgY3JlYXRlKGRydWcpIHtcbiAgICAgIHJldHVybiBrbmV4KCdkcnVncycpXG4gICAgICAgIC5pbnNlcnQoZHJ1ZylcbiAgICAgICAgLnJldHVybmluZygnKicpXG4gICAgICAgIC50aGVuKChbbmV3RHJ1Z10pID0+IG5ld0RydWcpO1xuICAgIH0sXG5cbiAgICBhc3luYyB1cGRhdGUoaWQsIHVwZGF0ZXMpIHtcbiAgICAgIHJldHVybiBrbmV4KCdkcnVncycpXG4gICAgICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAgICAgLndoZXJlKCdpZCcsIGlkKVxuICAgICAgICAud2hlcmUoJ2RlbGV0ZWQnLCBmYWxzZSlcbiAgICAgICAgLnJldHVybmluZygnKicpXG4gICAgICAgIC50aGVuKChbdXBkYXRlZERydWddKSA9PiB1cGRhdGVkRHJ1Zyk7XG4gICAgfSxcblxuICAgIGFzeW5jIGRlbGV0ZShpZCkge1xuICAgICAgYXdhaXQga25leCgnZHJ1Z3MnKVxuICAgICAgICAudXBkYXRlKCdkZWxldGVkJywgdHJ1ZSlcbiAgICAgICAgLndoZXJlKCdpZCcsIGlkKTtcbiAgICB9LFxuXG4gICAgYXN5bmMgYWxpYXNlcyhkcnVnSWQpIHtcbiAgICAgIHJldHVybiBrbmV4KCdkcnVnX2FsaWFzZXMnKVxuICAgICAgICAuc2VsZWN0KCd0ZXh0JylcbiAgICAgICAgLndoZXJlKCdkcnVnX2lkJywgZHJ1Z0lkKVxuICAgICAgICAub3JkZXJCeSgndGV4dCcsICdhc2MnKVxuICAgICAgICAudGhlbihyZWNvcmRzID0+IHJlY29yZHMubWFwKHJlY29yZCA9PiByZWNvcmQudGV4dCkpO1xuICAgIH0sXG5cbiAgICBhc3luYyByb2FzKGRydWdJZCkge1xuICAgICAgcmV0dXJuIGtuZXgoJ2RydWdfcm9hcycpLndoZXJlKCdkcnVnX2lkJywgZHJ1Z0lkKTtcbiAgICB9LFxuXG4gICAgYXN5bmMgZGVsZXRlUm9hKGlkKSB7XG4gICAgICBhd2FpdCBrbmV4KCdkcnVnX3JvYXMnKVxuICAgICAgICAudXBkYXRlKCdkZWxldGVkJywgdHJ1ZSlcbiAgICAgICAgLndoZXJlKCdpZCcsIGlkKTtcbiAgICB9LFxuICB9O1xufTtcbiJdfQ==
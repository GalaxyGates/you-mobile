// Generated by CoffeeScript 2.0.0-beta4
import request from './fetch_factory';

export var getlist = function() {
  return new Promise(function(resolve, reject) {
    return request('/contact').then(function(data) {
      return resolve(data);
    }, function(err) {
      return reject(err);
    });
  });
};

export var get_add_qrtoken = function() {
  return new Promise(function(resolve, reject) {
    return request('/contact/create_add_qr').then(function(data) {
      if (data.status === 1) {
        return resolve(data.qr_token);
      } else {
        return reject(data);
      }
    }, function(data) {
      return reject(data);
    });
  });
};

export var add_by_qrtoken = function(token) {
  return new Promise(function(resolve, reject) {
    return request('/contact/add_by_qr', 'POST', {
      token: token
    }).then(function(data) {
      if (data.status === 1) {
        return resolve(data);
      } else {
        return reject(data);
      }
    }, function(data) {
      return reject(data);
    });
  });
};

//# sourceMappingURL=contacts.js.map

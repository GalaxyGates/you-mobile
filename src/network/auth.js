// Generated by CoffeeScript 2.0.0-beta4
import * as codes from '../codes';

import csrf from './csrf';

import fetch_factory from './fetch_factory';

export var http_login = (username, token) => {
  return new Promise((resolve, reject) => {
    return fetch_factory('/auth/token_login', 'POST', {
      username: username,
      token: token
    }).then((data) => {
      if (data['status'] === 1) {
        return resolve();
      } else {
        return reject({
          error: codes.error.verify_id_failed,
          message: "身份验证失败"
        });
      }
    }, (error) => {
      return reject(error);
    });
  });
};

export var login = (username, password) => {
  return new Promise((resolve, reject) => {
    return fetch_factory('/auth/login', 'POST', {
      username: username,
      password: password
    }).then((data) => {
      if (data['status'] === 1) {
        return resolve(data);
      } else {
        return reject(data);
      }
    }, (error) => {
      return reject(error);
    });
  });
};

//# sourceMappingURL=auth.js.map

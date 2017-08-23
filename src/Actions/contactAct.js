// Generated by CoffeeScript 2.0.0-beta4
import * as TYPES from './types';

import * as message from './messageAct';

import * as Route from '../routes';

import * as net from '../network';

import {
  output_error
} from './mainAct';

export var updateList = function(list) {
  return function(dispatch) {
    return dispatch({
      type: TYPES.UPDATE_CONTACT_LIST,
      list: list
    });
  };
};

export var openChat = function(contact) {
  return function(dispatch) {
    dispatch(message.convert(contact.pivot.session_id));
    Route.Push(Route.CHATROOM);
    return dispatch({
      type: TYPES.OPEN_CHAT
    });
  };
};

export var getContactQRCode = function() {
  return function(dispatch) {
    return net.contact.get_add_qrtoken().then(function(data) {
      return dispatch({
        type: TYPES.GET_QRCODE,
        qr_token: data
      });
    }, function(data) {
      return output_error(data);
    });
  };
};

export var addContactByQRCode = function(token) {
  return function(dispatch) {
    return net.contact.add_by_qrtoken(token).then(function(profile) {
      return dispatch({
        type: TYPES.ADD_CONTACT_BY_QRCODE,
        profile: profile
      });
    }, function(error) {
      switch (error) {
        case 1:
          return dispatch(output_error('二维码无效'));
        case 2:
          return dispatch(output_error('二维码无效'));
        case 3:
          return dispatch(output_error('不可以添加自己'));
        case 4:
          return dispatch(output_error('已经在好友列表里'));
        case 5:
          return dispatch(output_error('用户不存在'));
      }
    });
  };
};

//# sourceMappingURL=contactAct.js.map

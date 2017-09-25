import Promise from 'bluebird';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import config from "./core/config";
import EventListenerPolyfill from "./utils/EventListenerPolyfill";
import MessageStore from "./store/Message";

const CrossTalk = {
  config: config,

  _messageHandler: (event) => {
    if (
      !CrossTalk.config.targetIdentifier ||
      CrossTalk.config.targetIdentifier !== event.data.identifier
    ) {
      return;
    }

    MessageStore.addMessage(event.data);
  },

  init: (options) => {
    CrossTalk.config = Object.assign({}, CrossTalk.config, options);
    EventListenerPolyfill.addListener(window, 'message', CrossTalk._messageHandler, false);
  },

  stop: () => {
    CrossTalk.config = null;
    EventListenerPolyfill.removeListener(window, 'message', CrossTalk._messageHandler, false);
    MessageStore.removeAll();
  },

  on: (type, handler) => {
    return MessageStore.store(type)
      .subscribe((messages) => {
        if (messages[type] && type === messages[type].type) {
          handler && handler(messages[type]);
          MessageStore.removeMessage(type);
        }
      });
  },

  once: (type) => {
    return new Promise((resolve) => {
      let destroy = new Subject();

      MessageStore.store(type)
        .takeUntil(destroy)
        .subscribe((messages) => {
          if (messages[type] && type === messages[type].type) {
            MessageStore.removeMessage(type);
            destroy.next(true);
            destroy.unsubscribe();
            destroy = null;

            return resolve(messages[type]);
          }
        });
    });
  },

  send: (type, payload) => {
    if (
      !CrossTalk.config ||
      !CrossTalk.config.sourceIdentifier ||
      !CrossTalk.config.targetWindow ||
      !CrossTalk.config.targetEndpoint
    ) {
      console.error('CrossTalk is not initialized at the moment! Please call the init method with proper params and try again.');
      return;
    }

    const data = {
      payload,
      type,
      identifier: CrossTalk.config.sourceIdentifier,
    };

    CrossTalk.config.targetWindow
      .postMessage(data, CrossTalk.config.targetEndpoint);
  },

  sendForResult: (type, payload) => {
    CrossTalk.send(type, payload);
    return CrossTalk.once(type);
  }
};

export default CrossTalk;

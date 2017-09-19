const EventListenerPolyfill = {
  addListener: (element, type, listener, useCapture) => {
    if (element.addEventListener) {
      element.addEventListener(type, listener, useCapture);
    } else if (element.attachEvent)  {
      element.attachEvent(type, listener);
    }
  },

  removeListener: (element, type, listener, useCapture) => {
    if (element.removeEventListener) {
      element.removeEventListener(type, listener, useCapture);
    } else if (element.detachEvent)  {
      element.detachEvent(type, listener);
    }
  },
};

export default EventListenerPolyfill;

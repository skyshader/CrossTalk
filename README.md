#CrossTalk
PostMessaging made simpler!

Cross domain communication using post message, promisified!

##Install
NPM users: `npm install cross-talk --save`

Yarn users: `yarn add cross-talk`

##Import in project

Import CrossTalk in your project using ES6 syntax:

`import CrossTalk from 'cross-talk'`


##Init CrossTalk
The first thing that needs to be done is init CrossTalk with config options.

```
CrossTalk.init({
  targetWindow: document.getElementById('myIFrame').contentWindow,
  targetEndpoint: 'http://test.example.com',
  sourceIdentifier: '@example-source',
  targetIdentifier: '@example-target'
})
```

##API
####Listen for message

```
CrossTalk.on('message-type', (data) => {
  // handle the data
});
```
`on` will listen for a message of type `message-type` from other windows.

Note that `CrossTalk.on(...)` does not return a promise as it is an ongoing subscription to the `message-type` events coming from external sources.

However it does return an Observable `subscription` that allows you to unsubscribe from the subscription at any point of time.

####Listen for message once
```
CrossTalk.once('message-type')
  .then((data) => {
    // handle the data
  });
```

Calling `once` will subscribe to the `message-type` event coming from external sources and will unsubscribe if the event occurs once. So your handler will be only called once. 

Note that `CrossTalk.on(...)` returns a Promise which gets resolved when an event of the specified type occurs.


####Send a message
```
CrossTalk.send('message-type', data);
```

If you just want to send a message to targets and don't care of their actions, use `send(...)`. It doesn't return anything.


####Send a message and wait for response
```
CrossTalk.sendForResult('message-type', data)
  .then((data) => {
    // handle the data
  });
```
`sendForResult(...)` sends the event to target and waits for the same event to be received from external sources. It calls `once(...)` on the `message-type` provided by you and returns a promise.


####Destruct CrossTalk
```
CrossTalk.stop();
```

This removes the event listener on `message`, clears the config object and the list of events occurred and not yet handled.

##Future Plans

- Add support for multiple targets
- Add possibility to provide config for individual actions.
- Add example and demo
- Add tests

##Contribute
Open an issue and feel free to contribute to this project.

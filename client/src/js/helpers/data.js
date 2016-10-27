import 'whatwg-fetch'

const dataUrl = '/data/'

export function getUser(setState, getState) {
  const { msgs } = getState();
  setState({...getState(),
    msgs: [...msgs, {kind: 'info', text: 'getting user info ...'}],
  });
  fetch('/whoami', {credentials: 'same-origin'})
  .then((response) => response.json())
  .then((responseData) => {
    setState({...getState(),
      msgs: [...msgs, {kind: 'info', text: 'user info obtained.'}],
      user: (responseData.viewState && responseData.viewState.user) || {},
    });
  })
  .catch((error) => {
    setState({...getState(),
      msgs: [...msgs, {kind: 'error', text: 'could not get user info'}],
    });
    console.log('could not get user info', error.toString());
  });
}

export function getData(source, slice, setState, getState) {
  const { msgs } = getState();
  setState({...getState(),
    msgs: [...msgs, {kind: 'special', text: `${slice} loading ...`}],
  });
  fetch(`${dataUrl}${source}`, {credentials: 'same-origin'})
  .then((response) => response.json())
  .then((responseData) => {
    setState({...getState(),
      msgs: [...msgs, {kind: 'info', text: `${slice} loaded.`}],
      [slice]: responseData.data,
    });
  })
  .catch((error) => {
    setState({...getState(),
      msgs: [...msgs, {kind: 'error', text: `${slice} failed to load`}],
    });
    console.log(`${slice} failed to load`, error.toString());
  });
}

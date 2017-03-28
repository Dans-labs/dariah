import 'whatwg-fetch'

const rootUrl = '/api/'

export function getData(sources, component, notification) {
  for (const { type, path, branch, data, callback } of sources) {
    notification.notify({kind: 'special', text: `${branch} transferring data ...`, busy: 1})
    let settings = {credentials: 'same-origin'}
    if (data != null) {
      settings = {
        ...settings,
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    }
    fetch(`${rootUrl}${type}${path}`, settings)
    .then(response => response.json())
    .then(responseData => {
      for (const msg of responseData.msgs || []) {
        notification.notify(msg)
      }
      const kind = responseData.good ? 'info' : 'error'
      const statm = responseData.good ? 'data fetched' : 'server error'
      notification.notify({kind, text: `${branch} ${statm}.`, busy: -1})
      try {
        if (callback == null) {
          component.setState({
            [branch]: responseData.data,
          })
        }
        else {
          callback(responseData.data)
        }
        notification.notify({kind: 'info', text: `${branch} processed.`, busy: 0})
      }
      catch (error) {
        notification.notify({kind: 'error', text: `${branch} processing error.`, busy: 0, cause: error})
      }
    })
    .catch(error => {
      notification.notify({kind: 'error', text: `${branch} transmission error.`, busy: -1, cause: error})
    })
  }
}



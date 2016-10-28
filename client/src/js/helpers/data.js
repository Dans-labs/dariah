import 'whatwg-fetch'

const baseUrl = '/data/';

export function getData(sources, component, notification) {
  for (const branch of Object.keys(sources)) {
    notification.notify({kind: 'special', text: `${branch} transferring data ...`, busy: 1});
    fetch(`${baseUrl}${sources[branch]}`, {credentials: 'same-origin'})
    .then((response) => response.json())
    .then((responseData) => {
      for (const msg of responseData.msgs || []) {
        notification.notify(msg);
      }
      const kind = responseData.good ? 'info' : 'error';
      const statm = responseData.good ? 'data fetched' : 'server error';
      notification.notify({kind, text: `${branch} ${statm}.`, busy: -1});
      try {
        component.setState({
          ...(component.state || {}),
          [branch]: responseData.data,
        });
        notification.notify({kind: 'info', text: `${branch} processed.`, busy: 0});
      }
      catch (error) {
        console.error(error);
        notification.notify({kind: 'error', text: `${branch} processing error.`, busy: 0});
      }
    })
    .catch((error) => {
      console.error(error);
      notification.notify({kind: 'error', text: `${branch} transmission error.`, busy: -1});
    });
  }
}

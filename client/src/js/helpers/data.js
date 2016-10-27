import 'whatwg-fetch'

const baseUrl = '/data/';

export function getData(sources, component, notification) {
  for (const branch of Object.keys(sources)) {
    notification.notify({kind: 'special', text: `${branch} loading ...`});
    fetch(`${baseUrl}${sources[branch]}`, {credentials: 'same-origin'})
    .then((response) => response.json())
    .then((responseData) => {
      component.setState({
        ...component.state,
        [branch]: responseData.data,
      });
      notification.notify({kind: 'info', text: `${branch} loaded.`});
    })
    .catch((error) => {
      notification.notify({kind: 'error', text: `${branch} failed to load.`});
    });
  }
}

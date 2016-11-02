import 'whatwg-fetch'

/* DATA FETCHING
 * All data from the server takes place by functions in this module.
 * (except of course the initial load of skeleton HTML with its javascript bundle)
 *
 * All data comes from accessing /data plus additions.
 */

const rootUrl = '/api/';

/* getData(sources, component, notification)
 *
 * getData performs one or more ajax calls to the server and expects json data back.
 *
 * - sources is an array of objects specifying a branch, a kind and a path.
 *   For every source = (branch, type, path), a a url is constructed consisting of
 *   the base url (depending on type) appended by the path, and this is fired at the server.
 * - component is the one who should react to the new data with a state update, and the
 *   new data appears in state[branch]
 * - notification is the component that can display messages (progress, error)
 *
 * The expected response is a json object with the follwoing keys:
 *   - data: the actual payload, the stuff that should be rendered in a component
 *   - good: a boolean, indicating whether the server thinks it has carried out the request
 *   - messages: an array of messages, where each message has
 *     - kind: error, warning, etc,
 *     - text: the actual content of the message.
 * 
 * getData issues messages on its own, and adds a "busy" atrribute, indicating that we are waiting:
 * - after sending the request to the server: busy=1
 * - after getting a response or an error back: busy = -1
 * 
 * A notification component can collect these messages, add up the busy attributes.
 * If the result is > 0, we are still waiting for the server.
 * If it is 0, all waits are over. 
 * The notification component can display a graphic that is proportional to the number
 * of requests that are pending.
 */
export function getData(sources, component, notification) {
  for (const { type, path, branch } of sources) {
    notification.notify({kind: 'special', text: `${branch} transferring data ...`, busy: 1});
    fetch(`${rootUrl}${type}${path}`, {credentials: 'same-origin'})
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

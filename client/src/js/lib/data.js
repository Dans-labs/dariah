import 'whatwg-fetch'

/**
 * ## Data fetching
 *
 * All data access to the mongo db at server side takes place by functions in this module.
 *
 * @module data
 */

/**
 * The client fetches data by means of Ajax calls to `/api' plus additional paths.
 */
const rootUrl = '/api/';

/**
 * A component may request for a number of data queries in one go.
 * Every query is specified as {@link Source} object in the parameter `sources`.
 * 
 * The expected response is always a json {@link Result} object.
 *
 * @function
 * @param {Source[]} sources - List of data sources to fetch
 * @param {Component} component - Component for which to fetch data
 * @param {Object} notification - The {@link Notification} component that receives error/progress
 * {@link Message|messages}
 * @returns {Promise}
 * This is an asynchronous call.
 * The fetched data comes in as a promise, to with getData attaches `.then` handlers,
 * which will be new promises.
 * If the fetch is successful, the resolved data will added to the `state[branch]` of `component`.
 * Progress and error messages from the server appear in the fetched json as {@link Message|messages}.
 * If the fetch itself failed, we handle it by transforming the error into a {@link Message|message}.
 * All {@link Message|messages} generated in the process will be send to the
 * {@link Notification|notification} component.
 */
export function getData(sources, component, notification) {
  for (const { type, path, branch, data, callback } of sources) {
    notification.notify({kind: 'special', text: `${branch} transferring data ...`, busy: 1});
    let settings = {credentials: 'same-origin'};
    if (data != null) {
      settings = {
        ...settings,
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    }
    fetch(`${rootUrl}${type}${path}`, settings)
    .then((response) => response.json())
    .then((responseData) => {
      for (const msg of responseData.msgs || []) {
        notification.notify(msg);
      }
      const kind = responseData.good ? 'info' : 'error';
      const statm = responseData.good ? 'data fetched' : 'server error';
      notification.notify({kind, text: `${branch} ${statm}.`, busy: -1});
      try {
        if (callback == null) {
          component.setState({
            [branch]: responseData.data,
          });
        }
        else {
          callback(responseData.data)
        }
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

//export const dtm = dateVal => (new Date(dateVal['$date'])).toISOString())

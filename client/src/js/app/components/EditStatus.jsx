import { reduxForm } from 'redux-form'

import { editControl } from 'edit'

export default reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(editControl(false))

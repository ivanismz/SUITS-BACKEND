import './rt_index.scss'

import App from './RTApp'
import { Provider } from 'react-redux'
import { RTStateStore } from './RTReduxStore'
import { createRoot } from 'react-dom/client'

const root = document.getElementById('root')!

createRoot(root).render(
  <Provider store={RTStateStore}>
    <App />
  </Provider>
)

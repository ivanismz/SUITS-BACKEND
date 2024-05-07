import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Demo from './ui/Demo'
import { GlobalUIModal } from './ui/UIModal'
import Placeholder from './pages/Placeholder'
import { UIToastList } from './ui/UIToast'

function RTApp() {
  return (
    <Router>
      <GlobalUIModal />
      <UIToastList />

      <Routes>
        <Route path='/' element={<Placeholder />} />

        {process.env.NODE_ENV === 'production' ? null : (
          <Route path='/demo' element={<Demo />} />
        )}
      </Routes>
    </Router>
  )
}

export default RTApp

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Test from './TestTap';

const App = () => {
  return(
    <Router>
        <Routes>
          <Route path="/" element={<Test />} />
        </Routes>
    </Router>
  )
}

export default App;

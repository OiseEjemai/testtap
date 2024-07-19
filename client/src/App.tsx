import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Earn from './Earn';
import Boost from './Boost';
import Test from './TestTap';

const App = () => {
  return(
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/boost" element={<Boost />} />
          <Route path="/test" element={<Test />} />
        </Routes>
    </Router>
  )
}

export default App;

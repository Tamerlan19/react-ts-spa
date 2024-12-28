import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Posts from './components/Posts';
import PostDetail from './components/Postdetail';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

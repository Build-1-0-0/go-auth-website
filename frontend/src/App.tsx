// frontend/src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<div>Test Page</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
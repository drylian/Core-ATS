import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "../components/elements/Layout.jsx";
import Missing from '../pages/errors/Missing.js';

export default function GlobalRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

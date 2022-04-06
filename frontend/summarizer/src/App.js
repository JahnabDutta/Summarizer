
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/home";
import UploadPage from './components/upload-page';
import DownloadPage from './components/download-page';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="upload/" element={<UploadPage />} />
      <Route path="download/" element={<DownloadPage/>} />

    </Routes>
  </BrowserRouter>
  );
}

export default App;

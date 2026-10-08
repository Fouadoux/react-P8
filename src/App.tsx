import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
// BACKEND DISABLED: the admin page only writes to the API.
// import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-20 px-6 py-8 pb-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          {/* <Route path="/admin" element={<AdminPage />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

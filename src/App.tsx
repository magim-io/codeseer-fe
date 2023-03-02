import React from 'react';
import './App.css';
import { Home, Welcome, Codebase, Login } from './pages';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import CreateOrganization from './pages/Home/CreateOrganization/CreateOrganization';

function App() {
  const LayoutedComponent = ({ component }: any): JSX.Element => {
    return (
      <div className="w-full min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">{component}</div>
      </div>
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="home"
          element={<LayoutedComponent component={<Home />} />}
        />
        <Route
          path="home/create-organization"
          element={<LayoutedComponent component={<CreateOrganization />} />}
        />
        <Route
          path="codebase"
          element={<LayoutedComponent component={<Codebase />} />}
        />
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AjoutPatient from './Components/GestionPatient/AjoutPatient';
import ListPatient from './Components/GestionPatient/ListPatient';
import ModifierPatient from './Components/GestionPatient/ModifierPatient';
import DetailPatient from './Components/GestionPatient/DetailPatient';
import AjoutLit from './Components/GestionLit/AjoutLit';
import ListLit from './Components/GestionLit/ListLit';
import ModifierLit from './Components/GestionLit/ModifierLit';
import DetailLit from './Components/GestionLit/DetailLit';
import AjoutInfirmier from './Components/GestionInfirmier/AjoutInfirmier';
import ListInfirmier from './Components/GestionInfirmier/ListInfirmier';
import ModifierInfirmier from './Components/GestionInfirmier/ModifierInfirmier';
import DetailInfirmier from './Components/GestionInfirmier/DetailInfirmier';
import AjoutMedecin from './Components/GestionMedecin/AjoutMedecin';
import ListMedecin from './Components/GestionMedecin/ListMedecin';
import ModifierMedecin from './Components/GestionMedecin/ModifierMedecin';
import DetailMedecin from './Components/GestionMedecin/DetailMedecin';
import Headers from './Components/Header/Headers';
import Acceuil from './pages/Acceuil';


function App() {
  return (
    <Router>
      <div className="App">
        <Headers />
        <main>
          <Routes>
            <Route path='/' element={<Acceuil />} />

            {/* Patients */}
            <Route path="/" element={<ListPatient />} />
            <Route path="/add" element={<AjoutPatient />} />
            <Route path="/update/:id" element={<ModifierPatient />} />
            <Route path="/view/:id" element={<DetailPatient />} />

            {/* Médecins */}
            <Route path="/medecins" element={<ListMedecin />} />
            <Route path="/addmedecin" element={<AjoutMedecin />} />
            <Route path="/updatemedecin/:id" element={<ModifierMedecin />} />
            <Route path="/viewmedecin/:id" element={<DetailMedecin />} />

            {/* Infirmiers */}
            <Route path="/infirmiers" element={<ListInfirmier />} />
            <Route path="/addinfirmier" element={<AjoutInfirmier />} />
            <Route path="/updateinfirmier/:id" element={<ModifierInfirmier />} />
            <Route path="/viewinfirmier/:id" element={<DetailInfirmier />} />

            {/* Lits */}
            <Route path="/lits" element={<ListLit />} />
            <Route path="/addlit" element={<AjoutLit />} />
            <Route path="/updatelit/:id" element={<ModifierLit />} />
            <Route path="/viewlit/:id" element={<DetailLit />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

// import React from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import LOGIN from './pages/Login'
// import ADDUSER from './pages/Register'
// import Acceuil from './pages/Acceuil'
// import Dashboard from './pages/Dashboard'

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Acceuil />} />
//         <Route path='/login' element={<LOGIN />} />
//         <Route path='/register' element={<ADDUSER />} />
//         <Route path='/dashboard' element={<Dashboard />} />
//       </Routes>

//     </BrowserRouter>
//   )
// }

// export default App

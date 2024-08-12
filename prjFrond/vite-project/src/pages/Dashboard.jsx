// import React, { useState, useEffect } from 'react';
// import NavigationVertical from '../composant/NavigationVertical';
// import '../styles/dash.css';

// function Dashboard() {
//   const [loading, setLoading] = useState(true);
//   const [heures, setHeure] = useState('');
//   const user = sessionStorage.getItem('val_prenom_nom');
//   const isPageLoaded = sessionStorage.getItem('isPageLoaded');

//   const Heure = () => {
//     const maintenant = new Date();
//     const heure = maintenant.getHours();

//     if (heure >= 5 && heure < 12) {
//       setHeure('Bonjour');
//     } else if (heure >= 12 && heure < 18) {
//       setHeure('Bonne après-midi');
//     } else {
//       setHeure('Bonsoir');
//     }
//   };

//   useEffect(() => {
//     if (isPageLoaded === 'true') {
//       setLoading(false); // La page a déjà été chargée, donc on ne montre pas le chargement
//     } else {
//       setTimeout(() => {
//         setLoading(false); // Passer le chargement à false après 3 secondes
//         sessionStorage.setItem('isPageLoaded', 'true'); // Enregistrer dans sessionStorage que la page a été chargée
//       }, 5000); // Délai de 3 secondes avant de passer le chargement à false
//     }

//     Heure();
//   }, [isPageLoaded]);

//   return (
//     <>
//       <div className="grand-cadre">
//         <h2>
//           <marquee behavior="alternate" className='marq' direction="left" >{heures} {user} <img src="../aurevoir.png" alt="chat" width="50" style={{ backgroundColor: '#f0f0f0' }} height="50"></img>  </marquee>
//         </h2>
//       </div>
//       <NavigationVertical />
//       {loading ? (
//         <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//           <button className="btn btn-success" type="button" disabled>
//             <span className="spinner-border spinner-border-xxl" role="status" aria-hidden="true"></span>
//             Loading...
//           </button>
//         </div>
//       ) : (
//         <>
//           <div style={{ marginTop: 50 }}></div>
//           <div className="containerdash">
//           </div>
//         </>
//       )}

//     </>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import NavigationVertical from '../composant/NavigationVertical';
import '../styles/dash.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [heures, setHeure] = useState('');
  const user = sessionStorage.getItem('val_prenom_nom');
  const isPageLoaded = sessionStorage.getItem('isPageLoaded');
  const [notifications, setNotifications] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());

  const Heure = () => {
    const maintenant = new Date();
    const heure = maintenant.getHours();

    if (heure >= 5 && heure < 12) {
      setHeure('Bonjour');
    } else if (heure >= 12 && heure < 18) {
      setHeure('Bonne après-midi');
    } else {
      setHeure('Bonsoir');
    }
  };

  useEffect(() => {
    if (isPageLoaded === 'true') {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('isPageLoaded', 'true');
      }, 5000);
    }

    Heure();
    setNotifications([
      { id: 1, message: 'Rendez-vous avec le Dr. Dupont à 10h' },
      { id: 2, message: 'Tâche urgente à compléter avant 15h' }
    ]);
    setTasks([
      { id: 1, task: 'Compléter le rapport de la semaine' },
      { id: 2, task: 'Préparer la réunion de demain' }
    ]);
  }, [isPageLoaded]);

  return (
    <>
      <div className="grand-cadre">
        <h2>
          <marquee behavior="alternate" className='marq' direction="left" >
            {heures} {user} <img src="../aurevoir.png" alt="chat" width="50" style={{ backgroundColor: '#f0f0f0' }} height="50"></img>
          </marquee>
        </h2>
      </div>
      <NavigationVertical />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <button className="btn btn-success" type="button" disabled>
            <span className="spinner-border spinner-border-xxl" role="status" aria-hidden="true"></span>
            Loading...
          </button>
        </div>
      ) : (
        <>
          <div style={{ marginTop: 50 }}></div>
          <div className="containerdash">
            <div className="row">
              <div className="col-md-4">
                <h3>Notifications</h3>
                <ul>
                  {notifications.map(notification => (
                    <li key={notification.id}>{notification.message}</li>
                  ))}
                </ul>
              </div>
              <div className="col-md-4">
                <h3>Tâches à Faire</h3>
                <ul>
                  {tasks.map(task => (
                    <li key={task.id}>{task.task}</li>
                  ))}
                </ul>
              </div>
              <div className="col-md-4">
                <h3>Calendrier</h3>
                <Calendar onChange={setDate} value={date} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;

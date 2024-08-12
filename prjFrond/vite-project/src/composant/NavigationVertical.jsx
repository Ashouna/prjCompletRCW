import React from 'react'
import '../styles/navvertical.css'
function NavigationVertical() {
    return (

        <nav className='navsec'>
            <ul>
                <li><a href="/"><i class="fa fa-home" style={{ fontSize: '20px' }}></i>Home</a></li>
                <li><a href="/doctor"><i class="fa fa-user" style={{ fontSize: '20px' }}></i>Gestion Medecin</a></li>
                <li><a href="/patient"><i class="fa fa-stethoscope" style={{ fontSize: '30px' }}></i>Gestion Patient</a></li>
                <li><a href="/department"><i class="fa fa-stethoscope" style={{ fontSize: '30px' }}></i>Gestion Departement</a></li>
                <li><a href="/appointment"><i class="fa fa-stethoscope" style={{ fontSize: '30px' }}></i>Gestion Rendez-vous</a></li>
                <li><a href="/login"><i class="fa fa-sign-out" style={{ fontSize: '20px' }}></i>Deconnection</a></li>
            </ul>
        </nav>

    )
}

export default NavigationVertical
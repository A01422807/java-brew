import history from './history';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

export const Navigation = (props) => {

  let accessToken = localStorage.getItem('token');

  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <a className='navbar-brand page-scroll' href='#page-top'>
            JAVA - BREW
          </a>{' '}
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='#features' className='page-scroll'>
                Características
              </a>
            </li>
            <li>
              <a href='#about' className='page-scroll'>
                Acerca de
              </a>
            </li>
            <li>
              <a href='#services' className='page-scroll'>
                Servicios
              </a>
            </li>
            <li>
              <a href='#portfolio' className='page-scroll'>
                Galería
              </a>
            </li>
            <li>
              <a href='#team' className='page-scroll'>
                Equipo
              </a>
            </li>
            
            {(!accessToken ) ? 
            <li>
              <a href='/logIn' className='page-scroll'>
                Iniciar Sesión
              </a>
            </li> : 
            <li>
            <Link onClick={() => {localStorage.removeItem('token'); history.go(0);}} to="" variant="contained" color="primary" >
              Cerrar Sesion
            </Link>
            </li>
            }
            
          </ul>
        </div>
      </div>
    </nav>
  )
}

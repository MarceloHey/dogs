import { React, useEffect, useState } from 'react';
import UserHeaderNav from './UserHeaderNav';
import styles from '../../styles/user/UserHeader.module.css'
import { useLocation } from 'react-router-dom';

function UserHeader() {
  const [title, setTitle] = useState('')
  const location = useLocation()

  useEffect(() => {
    const { pathname } = location
    if ('/conta/estatisticas' === pathname) setTitle('Estatísticas')
    else if ('/conta/postar' === pathname) setTitle('Adicionar Foto')
    else setTitle('Minha conta')
  }, [location])

  return (
    <header className={styles.header}>
      <h1 className='title'>{title}</h1>
      <UserHeaderNav />
    </header>
  );
}

export default UserHeader;
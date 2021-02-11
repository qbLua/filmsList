import React, { useEffect, useState } from 'react';
import ModalAdd from './Modal';
import db from '../initFB/firebase';
import TableFilms from './tableFilms';

function Main(props) {

  const [list, setList] = useState([]);

  const getList = () => {
    const listFilms = [];
    db.collection("films").orderBy("dateAdd", "desc").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        listFilms.push(doc.data())
        listFilms[listFilms.length-1].id = doc.id;
      });
      setList(listFilms)
    });
    console.log(listFilms)
  }

  useEffect(() => {
    getList();
  }, []);
  
  return (
    <div>
      <ModalAdd onClose={getList} />
      <TableFilms films={list} reload={getList} />
    </div>
  );
}

export default Main;
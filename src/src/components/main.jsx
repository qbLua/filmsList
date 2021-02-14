import React, { useEffect, useState } from 'react';
import db from '../initFB/firebase';
import TableFilms from './tableFilms';
import ModalWindow from './Modal';

function Main() {
  // Данный хук и функция служат двум целям:
  // 1. Первоначальное отображение списка фильмов
  // 2. Обновление этого списка после добавления новой записи или изменении старой
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
      <ModalWindow onClose={getList} />
      <TableFilms films={list} reload={getList} />
    </div>
  );
}

export default Main;
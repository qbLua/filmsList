import React from 'react';
import '../css/item.css';
import db from '../initFB/firebase';
import ModalWindow from './Modal';

// Удаление записи с фильмом из БД и получение нового списка
const deleteFilm = (id, deleted) => {
  db.collection("films").doc(id).delete().then(() => {
    deleted();
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}

// Компонента представляет собой запись об отдельном фильме, а так же кнопки на удаление и редактирование
function Item(props) {
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.year}</td>
      <td>{props.author}</td>
      <td>{props.duration}</td>
      <td>{props.rating}</td>
      <td>
        <i class="close link icon" onClick={() => deleteFilm(props.id, props.reload)}></i>
        <ModalWindow data={props} edit={true} />
        </td>
    </tr>
  );
}

export default Item;
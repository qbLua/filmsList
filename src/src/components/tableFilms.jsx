import React from 'react';
import Item from './Item';

const TableFilms = (props) => {

  return (
    <>
        <table class="ui single line table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Дата выхода</th>
              <th>Режиссер</th>
              <th>Продолжительность</th>
              <th>Рейтинг</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {props.films.map((film) => {
              return <Item title={film.title}
                year={film.year}
                author={film.author}
                duration={film.duration}
                rating={film.rating}
                id={film.id} 
                reload={props.reload} />
            })}
          </tbody>
        </table>
    </>
  );
}

export default TableFilms;
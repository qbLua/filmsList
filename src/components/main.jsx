import React from 'react';
// import '../css/main.css'
import Item from './item';
import films from './tempDB';
import BtnAdd from './btnAdd';
import ModalAdd from './Modal';

const Main = () => {
    const list = films.map((film)=>{
        return <Item title={film.title} year={film.year} author={film.author} duration={film.duration} rating={film.rating} />;
    })
  return (
    <div>
        <ModalAdd />
        {list}
    </div>
  );
}

export default Main;
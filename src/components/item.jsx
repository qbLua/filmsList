import React from 'react';
import '../css/item.css'
import BtnDelete from './btnDelete';

const Item = (props) => {
  return (
    <div>
        <ul>
            <li>{props.title}</li>
            <li>{props.year}</li>
            <li>{props.author}</li>
            <li>{props.duration}</li>
            <li>{props.rating}</li>
            <li><BtnDelete /></li>
        </ul>
    </div>
  );
}

export default Item;
import React from 'react';
import Collection from './Colection';
import { useEffect, useState } from 'react';
import './index.scss';

function App() {
  const [gallery, setGallery] = useState([]);
  const [searchValur, setSearchvalue] = useState('');


  useEffect(() => {
    fetch('https://6346c71b9eb7f8c0f88561a0.mockapi.io/gallery')
      .then((res) => res.json())
      .then((res) => {
        setGallery(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          <li className="active">Все</li>
          <li>Горы</li>
          <li>Море</li>
          <li>Архитектура</li>
          <li>Города</li>
        </ul>
        <input className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {gallery.map((item, index) => (
          <Collection key={index} name={item.name} images={item.photos} />
        ))}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;

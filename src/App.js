import React from 'react';
import Collection from './Colection';
import { useEffect, useState } from 'react';
import './index.scss';

function App() {
  const categories = [
    { name: 'Все' },
    { name: 'Море' },
    { name: 'Горы' },
    { name: 'Архитектура' },
    { name: 'Города' },
  ];
  const [gallery, setGallery] = useState([]);
  const [searchValue, setSearchvalue] = useState('');
  const [activeCategory, setActiveCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6346c71b9eb7f8c0f88561a0.mockapi.io/gallery?${
        activeCategory ? `category=${activeCategory}` : ''
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        setGallery(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeCategory]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((item, index) => (
            <li
              className={activeCategory === index ? 'active' : ''}
              key={item.name}
              onClick={() => {
                setActiveCategory(index);
              }}
            >
              {item.name}{' '}
            </li>
          ))}
        </ul>
        <input
          className="search-input"
          value={searchValue}
          onChange={(evt) => {
            setSearchvalue(evt.target.value);
          }}
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          gallery
            .filter((item) => {
              return item.name.toLowerCase().includes(searchValue.toLocaleLowerCase());
            })
            .map((item, index) => <Collection key={index} name={item.name} images={item.photos} />)
        )}
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

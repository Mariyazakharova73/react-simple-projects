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
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const category = activeCategory ? `category=${activeCategory}` : '';

    fetch(`https://6346c71b9eb7f8c0f88561a0.mockapi.io/gallery?page=${page}&limit=3&${category}`)
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
  }, [activeCategory, page]);

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
        {[...Array(5)].map((_, index) => (
          <li
            className={page === index+1 ? 'active' : ''}
            onClick={() => {
              setPage(index+1);
            }}
            key={index}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

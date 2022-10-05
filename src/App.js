import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users/Users';

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [invites, setInvites] = React.useState([]);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onChangeSearchValue = (evt) => {
    setSearchValue(evt.target.value);
  };

  const changeInvite = (id) => {
    if (invites.includes(id)) {
      //предыдущее значение массива
      //если id по клику нет в массиве prev, то оставляем пользователя
      setInvites((prev) => prev.filter((prevId) => prevId !== id));
    } else {
      setInvites((prev) => [...prev, id]);
      setSuccess(true);
    }
  };

  //invites=[1, 5, 8, 9]
  return (
    <div className="App">
      {success ? (
        <Success />
      ) : (
        <Users
          changeInvite={changeInvite}
          users={users}
          isLoading={isLoading}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          invites={invites}
        />
      )}
    </div>
  );
}

export default App;

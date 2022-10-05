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
      //предыдущее значение массива prev
      setInvites((prev) => prev.filter((prevId) => prevId !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  //invites=[1, 5, 8, 9]

  const onClickSubmit = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          changeInvite={changeInvite}
          users={users}
          isLoading={isLoading}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          invites={invites}
          onClickSubmit={onClickSubmit}
        />
      )}
    </div>
  );
}

export default App;

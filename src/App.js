import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users/index';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

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

  return (
    <div className="App">
      <Users users={users} isLoading={isLoading} />
      {/* <Success /> */}
    </div>
  );
}

export default App;

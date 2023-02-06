import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import Auth from './components/Auth';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState([]);

  const getData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${userEmail}`
      );
      if (!response.ok) throw new Error('something went wrong');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [getData]);

  //Sort by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className='app'>
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={'🏝 Holiday Tick List'} getData={getData} />
          <p className='user-email'>Welcome back {userEmail}</p>
          <ul>
            {sortedTasks.map(task => (
              <ListItem key={task.id} task={task} getData={getData} />
            ))}
          </ul>
        </>
      )}
      <p className='copyright'>© Creative Coding LLC</p>
    </div>
  );
};

export default App;

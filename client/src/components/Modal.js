import { useState } from 'react';
import { useCookies } from 'react-cookie';

const Modal = ({ mode, setShowModal, task, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const editMode = mode === 'edit' ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  const postData = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editData = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (err) {}
  };

  const changeHandler = e => {
    const { name, value } = e.target;

    setData(data => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='form-title-container'>
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            type='text'
            required
            maxLength={30}
            placeholder=' Your task goes here'
            name='title'
            value={data.title}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor='range'>Drag to select your current progress</label>
          <input
            type='range'
            required
            id='range'
            min='0'
            max='100'
            name='progress'
            value={data.progress}
            onChange={changeHandler}
          />
          <input
            className={mode}
            type='submit'
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;

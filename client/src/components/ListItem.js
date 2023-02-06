import { useState } from 'react';

import Modal from './Modal';
import ProgressBar from './ProgressBar';
import TickIcon from './TickIcon';

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteItemHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`,
        {
          method: 'DELETE',
        }
      );
      if (response.status === 200) {
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className='list-item'>
      <div className='info-container'>
        <TickIcon />
        <p className='task-title'>{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>

      <div className='button-container'>
        <button className='edit' onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className='delete' onClick={deleteItemHandler}>
          DELETE
        </button>
      </div>
      {showModal && (
        <Modal
          mode={'edit'}
          setShowModal={setShowModal}
          task={task}
          getData={getData}
        />
      )}
    </li>
  );
};

export default ListItem;

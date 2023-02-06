import { useState } from 'react';
import { useCookies } from 'react-cookie';

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  console.log(cookies);

  const viewLogin = status => {
    setError(null);
    setIsLogin(status);
  };

  const submitHandler = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError('Make sure passwords match!');
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/${endpoint}`,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();

    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie('Email', data.email);
      setCookie('AuthToken', data.token);

      window.location.reload();
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-container-box'>
        <form>
          <h2>{isLogin ? 'Please log in!' : 'Please sign up!'}</h2>
          <input
            type='email'
            placeholder='email'
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            onChange={e => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type='password'
              placeholder='confirm password'
              onChange={e => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type='submit'
            className='create'
            onClick={e => submitHandler(e, isLogin ? 'login' : 'signup')}
          />
          {error && <p>{error}</p>}
        </form>

        <div className='auth-options'>
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogin
                ? 'rgb(255, 255, 255)'
                : 'rgb(188, 188, 188)',
            }}>
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogin
                ? 'rgb(255, 255, 255)'
                : 'rgb(188, 188, 188)',
            }}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

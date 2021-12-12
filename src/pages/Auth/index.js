export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', JSON.stringify(data));
  }
  next();
};

export const Signout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
  next();
};
export const isAuthenTicate = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('token')) {
    return JSON.parse(localStorage.getItem('token'));
  } else if (localStorage.getItem('token')) {
    return true;
  } else {
    return false;
  }
};

// reset Password
// export const resetPasswordChange = (resetPass) => {
//   return fetch(`http://localhost:8000/api/reset-password`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(resetPass),
//   })
//     .then((response) => response.json())
//     .catch((error) => console.log(error));
// };


// const validateToken = async () => {
//   const access_token = localStorage.getItem('access_token');

//   if (!access_token) {
//     // No hay token en localStorage, el usuario debe iniciar sesión
//     return false;
//   }

//   try {
//     const response = await fetch('/auth/validate-token', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     });
//     // console.log(response)
//     if (response.ok) {
//       // El token es válido
//       return true;
//     } else {
//       // El token no es válido, el usuario debe iniciar sesión nuevamente
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('user_data');
//       return false;
//     }
//   } catch (error) {
//     console.error('Error al validar el token:', error);
//     return false;
//   }
// };


function removeFromLocalStorage(){
  localStorage.removeItem('access_token');
  localStorage.removeItem('user_data');
  localStorage.removeItem('is_authenticated');
}

function accessTokenUserExists(){
  const access_token = localStorage.getItem('access_token');
  const user_data = localStorage.getItem('user_data');

  if (!access_token || !user_data) {
    // No hay token en localStorage, el usuario debe iniciar sesión
    removeFromLocalStorage()
    return false;
  }
  else return true
}

export { removeFromLocalStorage, accessTokenUserExists };

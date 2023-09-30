import { Link } from 'react-router-dom';
import { currentUserSelector } from '../../recoil/selectors';
import { useRecoilValue } from 'recoil';
import { Button } from '@material-tailwind/react';

const PerfilComponent = () => {
  const { user } = useRecoilValue(currentUserSelector);

  return (
    <div className="h-full mx-auto md:mx-auto md:w-4/5">
        <div className="block md:flex rounded-xl">
          <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 shadow-md rounded-xl">
            <div className="flex justify-between items-center">
              <span className="dark:text-gray-200 text-xl font-semibold block">{user.rol === 1 ? "Perfil Administrador" : "Perfil Empleado"}</span>
              <Link to="/profile?edit=true">
                <Button color="deep-purple" className="rounded-full" size="sm">
                  Editar
                </Button>
              </Link>
            </div>

            <p className="text-gray-600 dark:text-gray-200 text-sm mt-3 leading-tight">
              Esta información es confidencial, por favor no la compartas ni divulges con personas no autorizadas
            </p>
            <div className="w-full p-8 mx-2 flex justify-center">
              <img
                id="showImage"
                className="max-w-xs w-32 items-center border rounded-xl"
                src={user.profile_img}
                alt=""
              />
            </div>
          </div>

          <div className="w-full md:w-3/5 p-8 bg-white  dark:bg-gray-900 lg:ml-4 shadow-md rounded-xl">
            <div className="rounded  shadow p-6 dark:text-gray-200">
              <div className="pb-6 ">
                <label
                  htmlFor="name"
                  className="font-semibold text-gray-700 dark:text-gray-200 block pb-1"
                >
                  Nombres / Cédula
                </label>
                <div className="flex">
                  <input
                    disabled
                    id="username"
                    className="border-1  rounded-lg px-4 py-2 w-full"
                    type="text"
                    value={`${user.fk_persona.nombres} ${user.fk_persona.apellidos} - ${user.fk_persona.cedula}`}
                  />
                </div>
              </div>
              <div className="pb-4">
                <label
                  htmlFor="about"
                  className="font-semibold text-gray-700 dark:text-gray-200 block pb-1"
                >
                  Email / Teléfono
                </label>
                <input
                  disabled
                  id="email"
                  className="border-1  rounded-lg px-4 py-2 w-full"
                  type="email"
                  value={`${user.fk_persona.email} - ${user.fk_persona.telefono}`}
                />                
              </div>
              <div className="pb-4">
                <label
                  htmlFor="about"
                  className="font-semibold text-gray-700 dark:text-gray-200 block pb-1"
                >
                  Usuario
                </label>
                <input
                  disabled
                  id="usuario"
                  className="border-1  rounded-lg px-4 py-2 w-full"
                  type="text"
                  value={user.usuario}
                />
                {/* <span className="text-gray-600 pt-4 block opacity-70">
                  Personal login information of your account
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default PerfilComponent
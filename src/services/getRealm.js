import Realm from 'realm';
import { auth } from './auth';

//Realizamos la importacion de los esquemas o colecciones
import { ItemSchema,ChatSchema,UsuarioSchema } from './schema';

export const getRealm = async () => {


//Llamamos la funcion para autenticarnos y retornamos la credenciales con la variable app
  const app = await auth();

//Abrimos el reino y le enviamos los esquemas o colecciones que queremos utilizar
  const realm = await Realm.open({
    schema: [ItemSchema,ChatSchema,UsuarioSchema],

//Sincronizamos con las credenciales del usuario y le pasamos el valor de la particion que vamos a sincornizar
    sync: {
      user: app.currentUser,
      partitionValue: '1234',
    },
  })

  return realm;

}

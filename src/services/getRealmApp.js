import Realm from "realm";

export const getRealmApp = async () => {

    //Declaramos el esquema del objeto que vamos a guardar en el mongoRealm

    const Item = {
      name: "Item",
      primaryKey: "_id",
      properties: {
        _id: "objectId?",
        descripcion: "string?",
        valor: "double?",
        imagen: "string?",
        creadoPor: {type: "Usuario", default: {}},
        chat: "Chat",
      },
    };

    const Chat = {
      name: "Chat",
     embedded: true, // Tiene que estar en true para que pueda permitir la instancia
      properties: {
        _id: "objectId?",
        para: {type: "Usuario", default: {}},
        de: {type: "Usuario", default: {}},
        mensajes: {type: "Mensajes[]", default: []}, // Creamos un objeto incrustado dependiendo de otro
      },
    };

    const Usuario = {
      name: "Usuario",
     embedded: true, // Tiene que estar en true para que pueda permitir la instancia
      properties: {
        _id: "string?",
        nombre: "string?",
      },
    };

    const Mensajes = {
      name: "Mensajes",
     embedded: true, // Tiene que estar en true para que pueda permitir la instancia
      properties: {
        _id: "objectId?",
        contenido: "string?",
        fecha: "date?",
      },
    };
    
//    Abrimos el esquema para poder escribir y leer los objetos
try {
        const Schema = [Item,Chat,Usuario,Mensajes];
         const realm = await Realm.open({
          path: 'application-0-lvcmm', 
          schema: Schema,
          schemaVersion: 10
        });
        return realm;
      } 
  catch (err) {
        console.error("Failed to open the realm", err.message);
      } 
       
} 
    
/* export function getRealmApp() {
      const appId = 'application-0-lvcmm'; // Set Realm app ID here.
      const appConfig = {
        id: appId,
        timeout: 10000,
      };
     return new Realm.App(appConfig);
}

async function anonymousLogin() {
  let user;
  try {
    const app = new Realm.App(appConfig); // pass in the appConfig variable that you created earlier
    const credentials = Realm.Credentials.anonymous(); // create an anonymous credential
    user = await app.logIn(credentials);
    return user;
  } catch (error) {
      throw `Error logging in anonymously: ${JSON.stringify(error,null,2)}`;
  }
}

async function openRealm() {
  let user;
  let realm;
  try {
    // ...
    console.log(`Logged in with the user: ${user.identity}`);
    const config = {
      schema: [],
      sync: {
        user: user,
        partitionValue: "myPartition",
      },
    };
    realm = await Realm.open(config);
  } catch (error) {
      throw `Error opening realm: ${JSON.stringify(error,null,2)}`;
  } */
//}

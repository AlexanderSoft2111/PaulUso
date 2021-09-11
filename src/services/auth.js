import Realm from 'realm';

export const auth = async() => {

//Declaramos el el id de la aplicación de realm para instanciarla
    const app = new Realm.App({ id: "application-0-lvcmm" });

//Devolvemos las credencial para iniciar sesion de tipo anonimo    
    const credentials = Realm.Credentials.anonymous();

//Llamamos el inicio de sesión    
    try {
      const user = await app.logIn(credentials);
    } catch(err) {
      console.error("Failed to log in", err);
    }

//Retornamos la intancia del realm    
    return app;
}

// Declaramos los esquemas que se van a utilizar
export const ItemSchema = {
    name: 'Item',
    properties: {
      _id: 'objectId?', //Declaramos un tipo de atributo de opcional con la incognita
      chat: 'Chat[]', // Definimos que el atributo chat va hacer tipo de coleccion chat y va hacer un arreglo
      creadoPor: 'Usuario', // Definimos que el atributo creado por va hacer de tipo de la coleccion usuario
      descripcion: 'string?',
      imagen: 'string?',
      realm_id: 'string?',
      valor: 'double?',
    },
    primaryKey: '_id',
  };
  
  

export const ChatSchema = {
    name: 'Chat',
    embedded: true,
    properties: {
      _id: 'objectId?',
      de: 'Usuario',
      para: 'Usuario',
      mensaje: 'string?',
      fecha: 'date?'
    },
  };
  
  

export const UsuarioSchema = {
    name: 'Usuario',
    embedded: true,
    properties: {
      _id: 'string?',
      nombre: 'string?',
    },
  };





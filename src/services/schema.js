import {ObjectId} from 'bson';

class Item {
  constructor({
    name,
    partition,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;

  }

  static ItemSchema = {
    name: 'Item',
    properties: {
      _id: 'objectId?',
      _partition: 'string',
      chat: 'Chat',
      creadoPor: 'Usuario',
      descripcion: 'string?',
      imagen: 'string?',
      mensajes: 'Mensajes[]',
      valor: 'string?',
    },
    primaryKey: '_id',
  };
  
  static ChatSchema = {
    name: 'Chat',
    embedded: true,
    properties: {
      _id: 'objectId?',
      de: 'Usuario',
      para: 'Usuario',
    },
  };
  
  static UsuarioSchema = {
    name: 'Usuario',
    embedded: true,
    properties: {
      _id: 'objectId?',
      nombre: 'string?',
    },
  };
  
  static MensajesSchema = {
    name: 'Mensajes',
    embedded: true,
    properties: {
      _id: 'objectId?',
      contenido: 'string?',
      fecha: 'date?',
    },
  };
  

}

export {Item};
import { database } from "./Firebase-Config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

interface Entity {
  id: string;
}

class accountService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll() {
    const controller = new AbortController();
    const request = getDocs(collection(database, this.endpoint));
    return { request, cancel: () => controller.abort() };
  }

  deleteUser(id: string) {
    return deleteDoc(doc(database, this.endpoint, id));
  }

  addUser<T extends Record<string, unknown>>(entity: T) {
    return addDoc(collection(database, this.endpoint), entity);
  }

  updateUser<T extends Entity>(entity: T) {
    const ref = doc(database, this.endpoint, entity.id);
    updateDoc(ref, entity);
  }
}

const create = (endpoint: string) => new accountService(endpoint);

export default create;

import { useEffect, useState } from "react";
import UserItem from "./components/UserItem";
import Account from "./types/account.type";
import { database } from "./services/Firebase-Config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [users, setUsers] = useState<Account[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = () => {
    setIsLoading(true);
    getDocs(collection(database, "accounts"))
      .then((query) => {
        setUsers(
          query.docs.map((doc) => ({
            id: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email,
            isApproved: true,
            avatar: doc.data().avatar,
          }))
        );
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  const deleteUser = async (account: Account) => {
    setIsLoading(true);
    deleteDoc(doc(database, "accounts", account.id))
      .then((results) => {
        setIsLoading(false);
        toast.success("Account deleted");
        getAccounts();
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  const addUser = () => {
    setIsLoading(true);
    addDoc(collection(database, "accounts"), {
      firstName: firstName,
      lastName: lastName,
      email: email,
    })
      .then((results) => {
        toast.success("Account created");
        setIsLoading(false);
        getAccounts();
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  const updateUser = async (account: Account) => {
    const ref = doc(database, "accounts", account.id);
    updateDoc(ref, {
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      isApproved: true,
    })
      .then((results) => {
        toast.success("Account updated");
        setIsLoading(false);
        getAccounts();
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <h3>Add new user</h3>
            <div className="row">
              <div className="col-sm-12">
                <label className="form-label">First name</label>
                <input
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-sm-12">
                <label className="form-label">Last name</label>
                <input
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  type="email"
                  className="form-control"
                />
              </div>
              <div className="col-sm-12">
                <label className="form-label">Email</label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  className="form-control"
                />
              </div>

              <div className="col-sm-12">
                {isLoading ? (
                  <div className="spinner-border text-info"></div>
                ) : (
                  <button onClick={addUser} className="btn btn-info btn-lg">
                    Add New Account
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <h3>Get all users</h3>
            {errorMsg && <p className="text-danger">{errorMsg}</p>}
            {isLoading && <div className="spinner-border"></div>}

            <div className="accordion" id="accordionExample">
              {users.map((user) => (
                <UserItem
                  key={user.id}
                  user={user}
                  updateAction={updateUser}
                  deleteAction={deleteUser}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteUser, getUsers, selectUser, selectUsers } from '../authSlice';
import s from "./userList.module.css"


export default function userList() {

  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const user = useAppSelector(selectUser);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toString().includes(searchTerm)
  );

  return (
    <div className={s.userListContainer}>
      <h1>Admin Dashboard</h1>
      {
       <ul>
       {users.map(p => (
         <li key={p.id}>
           <div className={s.petCard}>
             <div className={s.petCard_img}>
               <img src={p.avatar} alt="" />
               <div className={s.petCard_btn}>
             {/* <Link to={String(p.id)}>Read more</Link> */}
           </div>
             </div>
             <div className={s.petCard_body}>
               <p>{p.login}</p>
               <h3>{p.fullName}</h3>
               <p>{p.email}</p>
               {/* <p>{p.userPetsList}</p> */}
               <button onClick={()=>dispatch(deleteUser(p.id))}>Delete account</button>
             </div>
           </div>
           
         </li>
       ))}
     </ul>
      }
      {/* <UserSearch onSearch={handleSearch} />
      <ul className={s.userList}>
        {filteredUsers.map(user => (
          <li key={user.id}>
            <div className={s.userCard}>
              <p>ID: {user.id}</p>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

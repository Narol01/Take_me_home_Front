import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteUser, getUsers, selectIsAuthenticated, selectUsers } from '../../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import s from "./adminCabinet.module.css";

export default function AdminCabinet() {
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUsers);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleDeleteUser = (userId: number) => {
        dispatch(deleteUser(userId));
    };

    return (
        <div className={s.containerAdmin}>
            <h1 className={s.h1Admin}>Welcome, dear Friend, to the heart of the mountain!</h1>
            
            <table className={s.tableAdmin}>
                <thead>
                    <tr>
                        <th className={s.thAdmin}>User_id</th>
                        <th className={s.thAdmin}>Login</th>
                        <th className={s.thAdmin}>Full Name</th>
                        <th className={s.thAdmin}>Email</th>
                        <th className={s.thAdmin}>Website</th>
                        <th className={s.thAdmin}>Phone</th>
                        <th className={s.thAdmin}>Telegram</th>
                        <th className={s.thAdmin}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr className={s.trAdmin} key={user.id}>
                            <td className={s.tdAdmin}>{user.id}</td>
                            <td className={s.tdAdmin}>
                                <Link className={s.linkAdmin} to={`/user/${user.login}/pets`}>{user.login}</Link>
                            </td>
                            <td className={s.tdAdmin}>{user.fullName}</td>
                            <td className={s.tdAdmin}>{user.email}</td>
                            <td className={s.tdAdmin}>{user.website}</td>
                            <td className={s.tdAdmin}>{user.phone}</td>
                            <td className={s.tdAdmin}>{user.telegram}</td>
                            <td className={s.tdAdmin}>
                                <button className={s.buttonAdmin} onClick={() => handleDeleteUser(user.id)}>Delete account</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className={s.buttonBack} onClick={() => navigate(-1)}>Back</button>
        </div>
    );
}

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { deletePet, getPetsByFilter, selectPets } from '../../../features/pets/petsSlice'
import { useNavigate, useParams } from 'react-router-dom';
import s from "../adminCabinet.module.css";

export default function UserPetsList() {

    const pets = useAppSelector(selectPets);
    const {login} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getPetsByFilter({author: login}));
    }, [dispatch, login])

    
  return (

    <div className={s.containerAdmin}>
    <h1 className={s.h1Admin}>Be fair, because you have too much power in your hands</h1>
    
    <table className={s.tableAdmin}>
        <thead>
            <tr>
                <th className={s.thAdmin}>Pet_id</th>
                <th className={s.thAdmin}>Author</th>
                <th className={s.thAdmin}>Caption</th>
                <th className={s.thAdmin}>Description</th>
                <th className={s.thAdmin}>deadline</th>
                <th className={s.thAdmin}>Country</th>
                <th className={s.thAdmin}>City</th>
                <th className={s.thAdmin}>Actions</th>
            </tr>
        </thead>
        <tbody>
            {pets.map((pet) => (
                <tr className={s.trAdmin} key={pet.id}>
                    <td className={s.tdAdmin}>{pet.id}</td>
                    <td className={s.tdAdmin}>{pet.author}</td>
                    <td className={s.tdAdmin}>{pet.caption}</td>
                    <td className={s.tdAdmin}>{pet.description}</td>
                    <td className={s.tdAdmin}>{pet.deadline}</td>
                    <td className={s.tdAdmin}>{pet.country}</td>
                    <td className={s.tdAdmin}>{pet.city}</td>
                    <td className={s.tdAdmin}>
                        <button className={s.buttonAdmin} onClick={() => dispatch(deletePet(pet.id))}> Delete pet ad </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    <button className={s.buttonBack} onClick={() => navigate(-1)}>Back</button>
</div>    
)
}

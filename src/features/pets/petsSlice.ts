import { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { FilterParamDto, fetchAddPet, fetchDeletePet, fetchEditPet, fetchPet, fetchPets, fetchPetsByFilter, fetchPetsByType } from "./api"
import type { PetDTO, PetEditDTO, PetsState } from "./types"


const initialState: PetsState = {
  petsList: [],
  selectedPet: undefined
}

export const petsSlice = createAppSlice({
  name: "pets",
  initialState,
  reducers: create => ({
    
    getPets: create.asyncThunk(
      async (arg: void) => {
        const response = await fetchPets()
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          state.petsList = action.payload
        },
        rejected: state => {},
      },
    ),

    getPetsByType: create.asyncThunk(
      async (petType: string) => {
        const response = await fetchPetsByType(petType)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          state.petsList = action.payload
        },
        rejected: state => {},
      },
    ),
    
    getPetsByFilter: create.asyncThunk(
      async (filters: FilterParamDto) => {
        const response = await fetchPetsByFilter(filters)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          state.petsList = action.payload
        },
        rejected: state => {},
      },
    ),
    
    deletePet: create.asyncThunk(
      async (id: number) => {
        const response = await fetchDeletePet(id)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          state.petsList = state.petsList.filter(p => p.id !== action.payload.id)
        },
        rejected: state => {},
      },
    ),

     getPet: create.asyncThunk(
       async (id: number) => {
         const response = await fetchPet(id)
         return response
       },
       {
         pending: state => {},
         fulfilled: (state, action) => {
          state.selectedPet = action.payload;
         },
         rejected: state => {},
       },
     ),

    addPet: create.asyncThunk(

      async ({petDTO, files}:{petDTO: PetDTO, files: File[]}) => {

        const response = await fetchAddPet(petDTO, files)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
         state.petsList.push(action.payload)
        },
        rejected: state => {},
      },
    ),

    editPet: create.asyncThunk(
      async ({petEditDTO, id, files}: {petEditDTO: PetEditDTO, id:number, files?: File[]}) => {
        const response = await fetchEditPet(petEditDTO, id, files)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
         state.selectedPet = action.payload;//
         state.petsList = state.petsList.map(p=>{
          if(p.id===action.payload.id){
            state.petsList.push(action.payload)//
            return action.payload
          } 
          return p;          
        })
        },
        rejected: (state, action) => {action.error.message},
      },
    ),
  }),

  selectors: {
    selectPets: petsState => petsState.petsList,
    selectPet: petsState => petsState.selectedPet,
  },
})

export const { getPets, getPet, getPetsByType, getPetsByFilter, deletePet, addPet, editPet } = petsSlice.actions
export const { selectPets, selectPet } = petsSlice.selectors

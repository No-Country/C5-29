import { createSlice } from '@reduxjs/toolkit'
import {
    getAdoptablePets,
    extraGetAdoptablePets,
} from '../../asyncActions/pet/getAdoptablePets'
import { getPetById, extraGetPetById } from '../../asyncActions/pet/getPetById'
import {
    createPetAdoption,
    extraCreatePetAdoption,
} from '../../asyncActions/pet/createPetAdoption'

import {
    extraEditPetAdoption,
    editPetAdoption,
} from '../../asyncActions/pet/editPetAdopcion'

const initialState = {
    adoptPets: [],
    petDetail: {},
    status: 'loading',
    statusCreate: 'loading',
    statusDetail: 'loading',
    error: '',
    openModal:false
}

const adoptSlice = createSlice({
    name: 'adopt', // name of the state
    initialState,
    reducers: {
        cleanPetDetail: (state) => {
            state.petDetail = {}
            state.statusDetail = 'loading'
        },
        cleanStatusCreate: (state) => {
            state.statusCreate = 'loading'
        },
        closeModal: (state) => {
            state.openModal = false
        },
    },
    extraReducers: {
        ...extraGetAdoptablePets,
        ...extraGetPetById,
        ...extraCreatePetAdoption,
        ...extraEditPetAdoption,
    },
})

export { getAdoptablePets, getPetById, createPetAdoption, editPetAdoption }
export const { cleanPetDetail, cleanStatusCreate, closeModal } = adoptSlice.actions
export default adoptSlice.reducer

import {UPDATE_COLLECTION} from './shop.types'

export const updateCollections = collectionsMap => ({
    type: UPDATE_COLLECTION,
    payload: collectionsMap
})


import {networkCollections} from "../../../helpers/tokensHelper/tokensHelper";

export const getNftCollectionByName = (name:string) => {
    return networkCollections.eth.find(collection=>collection.name == name)!;
}
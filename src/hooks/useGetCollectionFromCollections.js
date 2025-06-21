import { useEffect, useState } from 'react'
import useCollectionPostStore from '../store/collectionSaveStore';

const useGetCollectionFromCollections = (collectionId) => {
  const [collection, setCollection] = useState({});
  const collections = useCollectionPostStore(state => state.collections);
  useEffect(() => {
    const handleGetCollectionFromCollectionsStore = () => {
     const newCollection =  collections.find((collection) => collection.id === collectionId);
     setCollection(newCollection);
    }
    handleGetCollectionFromCollectionsStore()
  }, [collectionId, setCollection, collections])
  return {collection}
}

export default useGetCollectionFromCollections

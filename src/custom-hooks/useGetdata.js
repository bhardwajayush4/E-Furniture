import { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase-configure'

const useGetdata = (collectionName) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const collectionRef = collection(db, collectionName)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)

      // Firebase firestore realtime data update
      await onSnapshot(collectionRef, (snapshot) => {
        setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        setLoading(false)
      })
    }
    getData()
  }, [])

  return { data, loading }
}

export default useGetdata
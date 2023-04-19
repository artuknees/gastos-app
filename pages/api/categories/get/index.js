// import { db } from "../../../../firebase";
// import { collection , getDocs } from 'firebase/firestore';
// import { initFirebase } from "../../../../firebase";
// import { getAuth } from "firebase/auth";
// import { useAuthState } from 'react-firebase-hooks/auth';

const getCategories = async (req, res) => {
  // console.log('entro')
  // initFirebase();
  // const auth = getAuth(); // instance of auth method
  // const [user, loading] = useAuthState(auth);
  //   if (user) {
  //     const querySnapshot = await getDocs(collection(db, 'categorias')); // get de todo lo de 'producto'
  //     const docs = []; // preparo un array
  //     querySnapshot.forEach((doc) => { // le pusheo el contenido mas su id.
  //       docs.push({...doc.data(), id:doc.id})
  //     })
  //     res.status(200).json(docs)  
  //   }
  res.status(200).json({message: 'hola'})
}

export default getCategories
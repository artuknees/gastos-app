// import { db } from "../../../../firebase";
// import { collection , getDocs } from 'firebase/firestore';

const getExpenses = async (req, res) => {
    // const querySnapshot = await getDocs(collection(db, 'gastos')); // get de todo lo de 'producto'
    // const docs = []; // preparo un array
    // querySnapshot.forEach((doc) => { // le pusheo el contenido mas su id.
    //   docs.push({...doc.data(), id:doc.id})
    // })
    // res.status(200).json(docs)
    res.status(200).json({message: 'hola'})
}

export default getExpenses
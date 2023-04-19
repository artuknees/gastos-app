// import { db } from "../../../../firebase";
// import { getDoc , doc } from 'firebase/firestore';

const getCategory = async (req, res) => {
    // const categoryId = req.query.id;
    // const docRef = doc(db, "categorias", categoryId);
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //     const docs = [];
    //     docs.push({...docSnap.data(),id:categoryId})
    //     res.status(200).json(docs)
    // } else {
    //     res.status(404).json({
    //         message: 'id not found'
    //     })
    // }
    res.status(200).json({message: 'hola'})

}

export default getCategory
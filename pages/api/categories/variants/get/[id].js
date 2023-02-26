import { db } from "../../../../../firebase";
import { getDoc , doc } from 'firebase/firestore';

const getVariant = async (req, res) => {
    const categoryId = req.query.id;
    const docRef = doc(db, "categorias", categoryId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log(docSnap.data())
        res.status(200).json({
            Variantes: docSnap.data().Variantes
        })
    } else {
        res.status(404).json({
            message: 'id not found'
        })
    }
}

export default getVariant
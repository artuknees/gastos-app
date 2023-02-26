import { db } from "../../../../firebase";
import { getDoc , doc } from 'firebase/firestore';

const getUser = async (req, res) => {
    const userId = req.query.id;
    const docRef = doc(db, "usuarios", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const docs = [];
        docs.push({...docSnap.data(),id:userId})
        res.status(200).json(docs)
    } else {
        res.status(404).json({
            message: 'id not found'
        })
    }
}

export default getUser
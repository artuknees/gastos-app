import { db } from "../../../../firebase";
import { getDoc , doc } from 'firebase/firestore';

const getExpense = async (req, res) => {
    const expenseId = req.query.id;
    const docRef = doc(db, "gastos", expenseId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const docs = [];
        docs.push({...docSnap.data(), id:expenseId})
        res.status(200).json(docs)
    } else {
        res.status(404).json({
            message: 'id not found'
        })
    }
}

export default getExpense
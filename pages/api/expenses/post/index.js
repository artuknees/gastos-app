// import { db } from "../../../../firebase";
// import { collection , addDoc , doc , getDoc } from 'firebase/firestore';

const createExpense = async (req, res) => {
    // const expense = req.body;
    // const userId = expense.Consumidor;
    // const userRef = doc(db, 'usuarios', userId);
    // const userSnap = await getDoc(userRef);
    // const categoryId = expense.Categoria.Nombre;
    // const categoryRef = doc(db, 'categorias', categoryId);
    // const categorySnap = await getDoc(categoryRef);
    // const variant = expense.Categoria.Variante;

    // if (userSnap.exists() && categorySnap.exists() && categorySnap.data().Variantes.includes(variant)) {
    //     await addDoc(collection(db, 'gastos'),{
    //         ...expense
    //     });
    //     res.status(200).json({
    //         ...expense
    //     })
    // } else {
    //     res.status(404).json({
    //         message: "Wrong input data"
    //     })
    // }
    res.status(200).json({message: 'hola'})
}
export default createExpense
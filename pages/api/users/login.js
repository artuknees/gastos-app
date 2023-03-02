import { db } from "../../../firebase";
import { collection , getDocs } from 'firebase/firestore';

const getLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const querySnapshot = await getDocs(collection(db, 'usuarios')); // get de todo lo de 'producto'
    const docs = []; // preparo un array
    querySnapshot.forEach((doc) => { // le pusheo el contenido mas su id.
      docs.push({...doc.data(), id:doc.id})
    })
    const checkUser = docs.findIndex(item => item.User === username);
    if (checkUser !== -1){
      const checkPassword = docs[checkUser].Password === password;
      if (checkPassword) {
        const response = {
          username: username,
          password: password
        }
        res.status(200).json(response)
      } else {
        res.status(401).json({
          message: 'wrong user or password'
        })  
      }
    } else {
      res.status(401).json({
        message: 'wrong user or password'
      })
    }
}

export default getLogin

import { initializeApp } from "firebase/app"
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";;

const firebaseConfig = {
    apiKey: "AIzaSyCjBqks4O5UkIPwefg9y3pa3lgzIFtgNGg",
    authDomain: "clone-82911.firebaseapp.com",
    projectId: "clone-82911",
    storageBucket: "clone-82911.appspot.com",
    messagingSenderId: "1037513693185",
    appId: "1:1037513693185:web:414cd55f2ce244b6ce0800"
};


const App = initializeApp(firebaseConfig);
const auth = getAuth(App);
const Provider = new GoogleAuthProvider()
export default App
 export {Provider, auth};

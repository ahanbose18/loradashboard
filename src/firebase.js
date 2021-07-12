import firebase from 'firebase'

var firebaseConfig = {
        apiKey: "AIzaSyC9J-xPDzs_eml8qPSrKa5AxgOrk5j1UPA",
        authDomain: "lorawandashboard.firebaseapp.com",
        projectId: "lorawandashboard",
        storageBucket: "lorawandashboard.appspot.com",
        messagingSenderId: "599808636235",
        databaseURL: "https://lorawandashboard-default-rtdb.firebaseio.com/",
        appId: "1:599808636235:web:ac7718d8f71eeb7362a4ce"
      };


const app = firebase.initializeApp(firebaseConfig);


export const auth = app.auth()
export const database = app.database()
export default app
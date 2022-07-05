import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'


var config = {
    apiKey: "AIzaSyCpIizpekejuMNn9V8E5DbAsGRWnQuV2Eo",
    authDomain: "vamos308-a9b10.firebaseapp.com",
    projectId: "vamos308-a9b10",
    storageBucket: "vamos308-a9b10.appspot.com",
    messagingSenderId: "113305920912",
    appId: "1:113305920912:web:9b8036b6792695f27d3f15",
    measurementId: "G-CEWHJPQRRM"
};


firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;
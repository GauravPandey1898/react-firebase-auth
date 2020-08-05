import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDW89oAwN4Dp5h7c7AR1gDymkmz_Hq7F1I",
    authDomain: "react-firebase-auth-27b93.firebaseapp.com",
    databaseURL: "https://react-firebase-auth-27b93.firebaseio.com",
    projectId: "react-firebase-auth-27b93",
    storageBucket: "react-firebase-auth-27b93.appspot.com",
    messagingSenderId: "165758717955",
    appId: "1:165758717955:web:141c778499d8551e20be36",
    measurementId: "G-HSBLXN403C"
  }
  
  class Firebase {
      constructor(){
          app.initializeApp(firebaseConfig)
          
          this.auth = app.auth()
          this.db = app.firestore()
      }
      login(email, password){
          return this.auth.signInWithEmailAndPassword(email, password)
      }
      logout(){
          return this.auth.signOut()
      }
      async register(name, email, password){
          await this.auth.createUserWithEmailAndPassword(email, password)
          return this.auth.currentUser.updateProfile({
              displayName : name
          })

      }
      addQuote(quote){
          if(!this.auth.currentUser){
              return alert('Not Authorized!!')
          }
          return this.db.doc(`react-firebase-auth/${this.auth.currentUser.uid}`).set({
              quote
          })
      }
      isInitialized(){
          return new Promise(resolve => {
              this.auth.onAuthStateChanged(resolve)
          })
      }
      getCurrentUsername(){
          return this.auth.currentUser && this.auth.currentUser.displayName
      }
      async getCurrentUserQuote(){
          const quote = await this.db.doc(`react-firebase-auth/${this.auth.currentUser.uid}`).get()
          return quote.get('quote')
      }
  }

  export default new Firebase()
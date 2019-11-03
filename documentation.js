//here is how we grab data from firestore
const db = firebase.firestore();
db.collection('messages')
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      console.log(doc.data());
    });
  });

  //here is how we grab the subcollection data from firestore
  const db = firebase.firestore();
  db.collection('messages')
    .doc('1')
    .collection('tags')
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.table(doc.data());
      });

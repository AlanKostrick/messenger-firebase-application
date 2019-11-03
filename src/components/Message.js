import Tags from './Tags';

export default function Message(message) {
  const messageData = message.data();

  loadTags();

  return `
        <h1>MyMessagesApp</h1>
        <h3>You have a message.</h3>
        <section class='main-content__message'>
            <h3>${messageData.title}</h3>
            <p>${messageData.content}</p>
            <div class="tags"></div>
        </section>
            
        <section class='update-message'>
            <input class='update-message__messageTitle' type='text' placeholder='edit title'>
            <input class='update-message__messageBody' type='text' placeholder='edit content'>
            <button class='update-message__submit'>Edit</button>
            <input class='update-message__id' type='hidden' value="${message.id}">
        </section>

        <section class='add-tag'>
          <input class='add-tag__tagName' type='text' placeholder='add a tag'>
          <button class = 'add-tag__submit'>Add</button>
          <input class='add-tag__messageId' type='hidden' value="${message.id}">
        </section>
    
        `;

  function loadTags() {
    const db = firebase.firestore();
    db.collection('messages')
      .doc(message.id)
      .collection('tags')
      .get()
      .then(tags => {
        document.querySelector('.tags').innerHTML = Tags(tags);
      });
  }
}

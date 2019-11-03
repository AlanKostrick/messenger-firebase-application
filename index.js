import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Home from './src/components/Home';
import Messages from './src/components/Messages';
import Message from './src/components/Message';
import MessageUpdate from './src/components/MessageUpdate';
import Tags from './src/components/Tags';
import './css/style.css';

pageBuild();

function pageBuild() {
  header();
  navHome();
  navMessages();
  footer();
}

function header() {
  const header = document.querySelector('#header');
  header.innerHTML = Header();
}

function footer() {
  const footer = document.querySelector('#footer');
  footer.innerHTML = Footer();
}

function navHome() {
  const homeButton = document.querySelector('.nav-list__home');
  homeButton.addEventListener('click', function() {
    getAppContext().innerHTML = Home();
  });
}

function navMessages() {
  //get request
  const messagesButton = document.querySelector('.nav-list__messages');
  messagesButton.addEventListener('click', function() {
    getDatabaseCollectionContext()
      .get()
      .then(messages => {
        getAppContext().innerHTML = Messages(messages);
      });
    focusOnSingularMessage();
  });

  //post request
  getAppContext().addEventListener('click', function() {
    if (event.target.classList.contains('add-message__submit')) {
      const messageTitle = event.target.parentElement.querySelector(
        '.add-message__messageTitle'
      ).value;
      const messageContent = event.target.parentElement.querySelector(
        '.add-message__messageBody'
      ).value;

      getDatabaseCollectionContext().add({
        title: messageTitle,
        content: messageContent
      });

      getAppContext().innerHTML = MessageUpdate();
      setTimeout(function() {
        getDatabaseCollectionContext()
          .get()
          .then(messages => {
            getAppContext().innerHTML = Messages(messages);
          });
      }, 3000);
    }
  });

  getAppContext().addEventListener('click', function() {
    if (event.target.classList.contains('add-tag__submit')) {
      const tagName = event.target.parentElement.querySelector(
        '.add-tag__tagName'
      ).value;
      const messageId = event.target.parentElement.querySelector(
        '.add-tag__messageId'
      ).value;

      getDatabaseTagContext(messageId).add({
        tagName: tagName
      });

      getDatabaseTagContext(messageId)
        .get()
        .then(tags => {
          document.querySelector('.tags').innerHTML = Tags(tags);
        });
    }
  });

  //delete request
  getAppContext().addEventListener('click', function() {
    if (event.target.classList.contains('delete-message__submit')) {
      const messageId = event.target.parentElement.querySelector(
        '.delete-message__id'
      ).value;
      console.log(messageId);

      getDatabaseCollectionContext()
        .doc(messageId)
        .delete();
      getDatabaseCollectionContext()
        .get()
        .then(messages => {
          getAppContext().innerHTML = Messages(messages);
        });
    }
  });

  //update request
  getAppContext().addEventListener('click', function() {
    if (event.target.classList.contains('update-message__submit')) {
      const messageId = event.target.parentElement.querySelector(
        '.update-message__id'
      ).value;
      const messageTitle = event.target.parentElement.querySelector(
        '.update-message__messageTitle'
      ).value;
      const messageContent = event.target.parentElement.querySelector(
        '.update-message__messageBody'
      ).value;

      getDatabaseItemContext(messageId).update({
        title: messageTitle,
        content: messageContent
      });

      getDatabaseItemContext(messageId)
        .get()
        .then(message => {
          document.querySelector('.main-content__message').innerHTML = Message(
            message
          );
        });
    }
  });
}

//allows for focus on the single post
function focusOnSingularMessage() {
  getAppContext().addEventListener('click', function() {
    if (event.target.classList.contains('edit-message__submit')) {
      const messageId = event.target.parentElement.querySelector(
        '.delete-message__id'
      ).value;

      getDatabaseItemContext(messageId)
        .get()
        .then(message => {
          getAppContext().innerHTML = Message(message);
        });
    }
  });
}

function getAppContext() {
  const app = document.querySelector('#app');
  return app;
}

function getDatabaseCollectionContext() {
  const db = firebase.firestore();
  const messagesRef = db.collection('messages');
  return messagesRef;
}

function getDatabaseItemContext(id) {
  const db = firebase.firestore();
  const messageRef = db.collection('messages').doc(id);
  return messageRef;
}

function getDatabaseTagContext(messageId) {
  const db = firebase.firestore();
  const tagsRef = db
    .collection('messages')
    .doc(messageId)
    .collection('tags');
  return tagsRef;
}

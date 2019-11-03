export default function Messages(messages) {
  return `
      <div>
      <h1>My Messages </h1>
      ${messages.docs
        .map(message => {
          const messageData = message.data();
          return `
              <section class='main-content__messages'>
                  <h3>Title: ${messageData.title}</h3>
                  <p>Content: ${messageData.content}</p>
                  <input class='delete-message__id' type='hidden' value="${message.id}">
                  <button class='delete-message__submit'>&times</button>
                  <button class='edit-message__submit'>...</button>
              </section>
              `;
        })
        .join('')}
      </div>
      <section class='add-message'>
        <input class='add-message__messageTitle' type='text' name='title' placeholder='message title'>
        <input class='add-message__messageBody type='text' name='content' placeholder='message content'>
        <button class='add-message__submit'>Submit</button>
    </section>
      `;
}

export default function LogIn() {
  return `
    <div class='main-content__login'>
    <h4>Log in</h4>
    <form class = 'main-content__login-form'>
        <input type="email" placeholder="email" id='login-email' required />
        <input type="password" placeholder="password" id='login-password' required />
      <button class='login-submit'>Login</button>
    </form>
</div>
    `;
}

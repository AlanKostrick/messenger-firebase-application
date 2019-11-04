export default function SignUp() {
  return `
    <div class='main-content__signup'>
        <h4>Sign up</h4>
        <form class='main-content__signup-form'>
        <input type="email" placeholder="email" id='signup-email' required />
        <input type="password" placeholder="password" id='signup-password' required />
        <button class='signup-submit'>Sign up</button>
        </form>
    </div>
    `;
}

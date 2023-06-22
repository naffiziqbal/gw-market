import Banner from '../../assets/images/login-banner-image.png';
import Logo from '../../assets/images/logo.png';
import googleIcon from '../../assets/images/google-icon.png'
import fbIcon from '../../assets/images/facebook-icon.png'
import './Login.css'

const Login = () => {
    return (
        <div>
            <section className="login row mx-auto g-0">
                <div className="col-md-6 ">
                    <img className="logo-image" src={Logo} />
                    <div className="login-form">
                        <div>
                            <h2>Login</h2>
                            <h5>Access back to your account</h5>
                            <form>
                                <input type="email" name="email" placeholder="Email Address" />
                                <input className='pasword' type="password" name="password" placeholder="Password" />
                                <span className="forgot-password">Forgot Password?</span>
                                <button>Login</button>
                            </form>
                            <p className="new-user">
                                New User ? <span className="sign-up">Sign Up Account</span>
                            </p>
                            <span className="login-with">or Login with</span>
                            <p className="google-with-fg">
                                <img src={googleIcon} />
                                <img src={fbIcon} />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 d-none d-md-block">
                    <img className="login-banner-image" src={Banner} />
                </div>
            </section>
        </div>
    );
};

export default Login;
import Logo from './assets/hipporello.jpg';
import './App.scss';
import TodoBoard from "./components/TodoBoard";

function App() {
    return (
        <div className="App">
            <div className="header-wrapper">
                <img src={Logo} className="logo-wrapper" alt="logo"/>
                <h1>Hipporello - Trello Clone Project / Can Polat</h1>
            </div>
            <TodoBoard/>
        </div>
    );
}

export default App;

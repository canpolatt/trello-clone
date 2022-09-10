import Logo from './hipporello.jpg';
import './App.scss';
import TodoBoard from "./components/TodoBoard";

function App() {
    return (
        <div className="App">
            <div className="header-wrapper">
                <img src={Logo} className="logo-wrapper" alt="logo"/>
                <h1>Hipporello - Trello Project</h1>
            </div>
            <TodoBoard/>
        </div>
    );
}

export default App;

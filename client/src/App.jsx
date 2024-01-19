import './App.css';
import { ActiveStateProvider } from './ActiveStateContext';
import HomePage from './pages/HomePage';

const App = () => {
    return (
        <ActiveStateProvider>
            <HomePage />
        </ActiveStateProvider>
    );
};

export default App;

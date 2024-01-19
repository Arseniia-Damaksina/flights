import './HomePage.css';

import FormsContainer from '../components/FormsContainer';
import Flights from '../components/Flights';

const HomePage = () => {
    return (
        <div className='homePage'>
            <FormsContainer />
            <Flights />
        </div>
    );
};

export default HomePage;

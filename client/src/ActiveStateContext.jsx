import { createContext, useContext, useState } from 'react';

const ActiveStateContext = createContext();

export const ActiveStateProvider = ({ children }) => {
    const [loginActive, setLoginActive] = useState(false);
    const [registerActive, setRegisterActive] = useState(false);
    const [addFlightActive, setAddFlightActive] = useState(true);
    const [editFlightActive, setEditFlightActive] = useState(false);
    const [flightToUpdate, setFlightToUpdate] = useState({});
    const [flights, setFlights] = useState([]);

    return (
        <ActiveStateContext.Provider
            value={{
                loginActive,
                setLoginActive,
                registerActive,
                setRegisterActive,
                addFlightActive,
                setAddFlightActive,
                editFlightActive,
                setEditFlightActive,
                flightToUpdate,
                setFlightToUpdate,
                flights,
                setFlights
            }}
        >
            {children}
        </ActiveStateContext.Provider>
    );
};

export const useActiveState = () => {
    const context = useContext(ActiveStateContext);
    if (!context) {
        throw new Error(
            'useActiveState must be used within a ActiveStateProvider'
        );
    }
    return context;
};

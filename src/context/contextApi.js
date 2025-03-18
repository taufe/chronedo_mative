import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [favorites, setFavorites] = useState({});
    const [token, setToken] = useState("");

    const toggleFavorite = async (id) => {
        if (!token) {
            console.error("No token found. User is not logged in.");
            return;
        }

        const isFavorite = favorites[id];

        try {
            const response = await fetch('/api/favourite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ id, action: isFavorite ? 'remove' : 'add' }),
            });

            const data = await response.json();

            if (data.success) {
                setFavorites((prevFavorites) => ({
                    ...prevFavorites,
                    [id]: !isFavorite,
                }));
            } else {
                console.error('Failed to update favorites:', data.message);
            }
        } catch (error) {
            console.error('Error updating favorites:', error.message);
        }
    };

    return (
        <DataContext.Provider value={{ favorites, toggleFavorite, token, setToken }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);


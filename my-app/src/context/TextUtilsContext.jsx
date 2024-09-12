import React, { createContext, useContext } from 'react';

const TextUtilsContext = createContext();

export const TextUtilsProvider = ({ children }) => {
    const replaceWithNonBreakingSpace = (text) => {
        return text
            .replace(/ a /g, ' a\u00A0')
            .replace(/ do /g, ' do\u00A0')
            .replace(/ se /g, ' se\u00A0')
            .replace(/ v /g, ' v\u00A0')
            .replace(/ k /g, ' i\u00A0')
            .replace(/ z /g, ' o\u00A0');
    };

    return (
        <TextUtilsContext.Provider value={{ replaceWithNonBreakingSpace }}>
            {children}
        </TextUtilsContext.Provider>
    );
};

export const useTextUtils = () => {
    return useContext(TextUtilsContext);
};

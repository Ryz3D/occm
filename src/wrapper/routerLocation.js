import React from 'react';
import { useLocation } from 'react-router-dom';

export default function routerNavigate(Component) {
    return React.forwardRef((props, ref) => {
        const location = useLocation();
        return (
            <Component
                {...props}
                location={location}
                ref={ref}
            />
        );
    });
};

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function withRouter(Component) {
    return React.forwardRef((props, ref) => {
        const navigate = useNavigate();
        return (
            <Component
                {...props}
                navigate={navigate}
                ref={ref}
            />
        );
    });
};

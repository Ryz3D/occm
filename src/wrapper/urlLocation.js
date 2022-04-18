import React, { useEffect, useState } from 'react';

export default function urlLocation(Component) {
    return React.forwardRef((props, ref) => {
        const search = window.location.search;

        const [state, setState] = useState({
            search,
        });

        const loc = window.location.toString();
        useEffect(() => {
            setState({ search });
        }, [loc]);

        return (
            <Component
                {...props}
                ref={ref}
                search={state.search}
            />
        );
    });
}

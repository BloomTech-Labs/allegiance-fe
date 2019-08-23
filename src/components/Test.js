import React, { useEffect } from "react";
import { Mixpanel } from './analytics/Mixpanel';

const Test = (props) => {

    useEffect(() => {
        Mixpanel.track('Hello mixpanel!');
    }, [])

    return (
        <div>
            Hi
        </div>
    )
}

export default Test;
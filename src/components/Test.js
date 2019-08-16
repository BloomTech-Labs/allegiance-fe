import React, { useEffect } from "react";
import mixpanel from "mixpanel-browser"

const Test = (props) => {

    useEffect(() => {
        mixpanel.track('Hello mixpanel!');
    }, [])

    return (
        <div>
            Hi
        </div>
    )
}

export default Test;
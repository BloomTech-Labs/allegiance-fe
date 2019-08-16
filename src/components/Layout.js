import React, { useEffect } from "react";
import { initGA, logPageView } from "./analytics/Analytics"


const Layout = () => {
    useEffect(() => {
        if (!window.GA_INITIALIZED) {
            initGA()
            window.GA_INITIALIZED = true
        }
        logPageView()
    }, [])

    return (
        <div></div>
    )

}

export default Layout;

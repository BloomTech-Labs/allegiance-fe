import React from "react";
import { MixpanelConsumer } from 'react-mixpanel';


const Mixpanel = ({ component: Component }) => {

    return (
        <MixpanelConsumer>
            {mixpanel => <Component mixpanel={mixpanel} />}
        </MixpanelConsumer>
    )
}

export default Mixpanel;

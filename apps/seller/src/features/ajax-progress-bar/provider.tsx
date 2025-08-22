'use client';

import {ProgressProvider} from '@bprogress/next/app';

const AjaxProgressBarProvider = ({children}: { children: React.ReactNode }) => {
    return (
        <ProgressProvider
            height="4px"
            color="#008ECB"
            options={{showSpinner: false}}
            shallowRouting
        >
            {children}
        </ProgressProvider>
    );
};

export default AjaxProgressBarProvider;
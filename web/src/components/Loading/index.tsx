import React, { FunctionComponent } from 'react';

import { LoadingIcon } from './styles';

interface ILoadingProps {
    className?: string;
}

const Loading: React.FC<ILoadingProps> = ({ className }) => (
    <LoadingIcon className={className} />
);

export default Loading;

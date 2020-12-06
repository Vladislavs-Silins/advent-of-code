import React, { FC, ReactElement } from 'react';

interface Props {
    data: string;
}


export const Advent: FC<Props> = ({ data }: Props): ReactElement => {
    return (
        <div>
            <h2>{data}</h2>
        </div>
    )
};


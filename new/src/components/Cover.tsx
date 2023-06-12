import React from 'react';
import { twMerge } from 'tailwind-merge';

const CoverFace = ({
    side,
}: {
    side?: 'ft' | 'bk' | 'rt' | 'lt' | 'bm' | 'tp';
}) => {
    return <div className={twMerge('cover-face', side)} />;
};

const CoverShape = ({ id }: { id: number }) => {
    return (
        <div className={`cover-shape prism-${id} pri-${id}`}>
            <CoverFace side="ft" />
            <CoverFace side="bk" />
            <div className="cover-face-wrapper rt">
                <CoverFace />
            </div>
            <div className="cover-face-wrapper lt">
                <CoverFace />
            </div>
            <div className="cover-face bm" />
        </div>
    );
};

export const Cover = () => {
    return (
        <div className="cover-scene">
            <CoverShape id={1} />
            <div className="cover-shape cuboid-1 cub-1">
                <CoverFace side="ft" />
                <CoverFace side="bk" />
                <CoverFace side="rt" />
                <CoverFace side="lt" />
                <CoverFace side="bm" />
                <CoverFace side="tp" />
            </div>
            <CoverShape id={2} />
        </div>
    );
};

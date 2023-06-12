import React from 'react';

const ShadowFace = ({
    id, isPlaying, hover,
}: {
    id: number;
    isPlaying: boolean;
    hover: boolean;
}) => {
    return (
        <div
            className={`shadow-shape${id}`}
            style={{
                boxShadow: isPlaying
                    ? ''
                    : `0px 0px ${hover ? 20 : 0}px 10px rgba(0, 0, 0, 1)`,
                opacity: isPlaying ? 0 : hover ? 0.2 : 0.3,
            }} />
    );
};
export const Shadows = ({
    isPlaying, hover,
}: {
    isPlaying: boolean;
    hover: boolean;
}) => {
    return (
        <div className="shadow-scene">
            <ShadowFace id={1} isPlaying={isPlaying} hover={hover} />
            <ShadowFace id={2} isPlaying={isPlaying} hover={hover} />
        </div>
    );
};

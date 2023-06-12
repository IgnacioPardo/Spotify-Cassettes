import React from 'react';

const Screw = ({ id }: { id: number; }) => {
    return (
        <div className="screw-scene" id={`screw-scene${id}`}>
            <div className="screw-shape cylinder-1 cyl-1">
                <div className="screw-face bm" />
                <div className="screw-face tp" />
                <div className="screw-face side s0" />
                <div className="screw-face side s1" />
                <div className="screw-face side s2" />
                <div className="screw-face side s3" />
                <div className="screw-face side s4" />
                <div className="screw-face side s5" />
                <div className="screw-face side s6" />
                <div className="screw-face side s7" />
                <div className="screw-face side s8" />
                <div className="screw-face side s9" />
                <div className="screw-face side s10" />
                <div className="screw-face side s11" />
                <div className="screw-face side s12" />
                <div className="screw-face side s13" />
            </div>
        </div>
    );
};
export const Screws = () => {
    return (
        <>
            <Screw id={1} />
            <Screw id={2} />
            <Screw id={3} />
            <Screw id={4} />
        </>
    );
};

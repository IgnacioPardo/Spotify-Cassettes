'use client';

const icons = {
    play_pause: 'play_pauseIcon',
    stop: 'stopIcon',
    rewind: 'rewindIcon',
    forward: 'forwardIcon',
};

const PlayerIcon = ({
    name,
    onClick,
}: {
    name: string;
    onClick?: () => void;
}) => {
    return (
        <button onClick={onClick}>
            <div className="player_icon" id={name}>
                <img src={`/icons/${name}.svg`} alt={name} />
            </div>
        </button>
    );
};

const PlayerControls = () => {
    return (
        <div className="player_controls">
            <PlayerIcon name={icons.rewind} />
            <PlayerIcon name={icons.play_pause} />
            <PlayerIcon name={icons.stop} />
            <PlayerIcon name={icons.forward} />
        </div>
    );
};

export default PlayerControls;

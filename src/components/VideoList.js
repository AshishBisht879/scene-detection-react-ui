import React from 'react';
import './VideoList.css';

const VideoList = ({ videos, onSelect }) => {
    return (
        <div>
            <label>Processed Video : </label>
            <select className="custom-select" onChange={(e) => onSelect(e.target.value)} defaultValue="">
                <optgroup>
                    <option value="" disabled>-- Select a Video --</option>
                    {videos && videos.data && videos.data.map((video, index) => (
                        <option key={index} value={video.folder}>{video.folder}</option>
                    ))}
                </optgroup>
            </select>
        </div>
    );
};

export default VideoList;

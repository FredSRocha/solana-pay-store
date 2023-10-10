import React  from 'react';
//import useIPFS from '../hooks/useIPFS';
import useFile from '../file/useFile';

const IPFSDownload = ({ hash, filename }) => {
//({ hash, filename }) => {

    //const file = useIPFS(hash, filename);
    const file = useFile(filename);
    const hashcode = useFile(hash);

    return (
        <div>
            {file ? (
                <div className="download-component">
                    <a className="download-button" href={hashcode} download>Download</a>
                    {/*={hash+".png"} target="_blank"*/}
                </div>
            ) : (
                <p>Downloading file...</p>
            )}
        </div>
    );
};

export default IPFSDownload;
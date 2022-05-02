import { CloudUpload } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = (props) => {
    const { files, setFiles } = props;
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*,video/*',
        maxFiles: 5,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })))
        }
    });
    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
    };

    const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box'
    };

    const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    };

    const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
    };

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    alt=""
                    src={file.preview}
                    style={img} />
                {
                    file.type === "video/mp4" && <video width="320" height="240" controls>
                        <source src={file.preview} type="video/mp4" />
                        <source src={file.preview} type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                }
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone border border-dashed border-2 p-3.5 rounded-md text-center' })}>
                <input {...getInputProps()} />
                <p className="text-xs">Drag and drop some images or video here, or click to select images or video</p>
                <CloudUpload fontSize="large" style={{ fill: 'gray' }} />
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </section>
    );
}

export default Dropzone;
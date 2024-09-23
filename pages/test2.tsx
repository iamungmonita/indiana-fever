import React from 'react';
import { Button, Input } from '@mui/material';
import Link from "next/link";
const FileUpload: React.FC = () => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Optional chaining to avoid null errors
        if (file) {
            console.log('Selected file:', file.name);
        }
    };

    return (
        <div>
            <Link href={{
                pathname: '/message/',

            }}>go to link 123</Link>
            <Input
                type="file"
                inputProps={{ accept: 'image/*' }} // Accept only image files
                style={{ display: 'none' }} // Hide the default input
                id="upload-file-input" // Use this ID to associate with the label
                onChange={handleFileChange}
            />
            <label htmlFor="upload-file-input">
                <Button variant="contained" component="span">
                    Upload File
                </Button>
            </label>
        </div>
    );
};

export default FileUpload;

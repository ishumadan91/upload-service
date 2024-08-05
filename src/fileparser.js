import formidable from 'formidable';
import {Upload} from  "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { PassThrough } from 'node:stream';

const client = new S3Client({
    region: "ap-south-1",
});

const fileparser = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        let options = {
            encoding: 'utf-8',
            maxFileSize: 100 * 1024 * 1024, //100 MBs converted to bytes,
            allowEmptyFiles: false,
            multiples: false,
            fileWriteStreamHandler: (file) => {
                const body = new PassThrough();
                const upload = new Upload({
                    client,
                    params: {
                        Bucket: process.env.S3_BUCKET,
                        Key: `myuploadedfiles/${file.originalFilename}`,
                        ContentType: file.mimetype,
                        // ACL: 'public-read',
                        Body: body,
                    },
                });
                upload.done().then((response) => {
                    file.location = response.Location;
                    console.log("Done")
                    console.log(response)
                    resolve({});
                });
                return body;
            }
        }

        const form = formidable(options);
        
        form.parse(req, async (err, fields, files) => {
            if(err) {
                next(err);
                return;
            }
        });

    })
}

export default fileparser;
// module.exports = fileparser;
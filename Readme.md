#About
This is a file upload service. Only server side is there as of now.

#Setup
1. Run
```
npm install
```
2. Run this command 
```
cp .env.sample .env
```
Also replace S3_BUCKET value should contain your s3 bucket
3. Setup aws cli using the steps mentioned here, https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html&ved=2ahUKEwj1oaaJ6N2HAxWUR2wGHYb-Ke0QFnoECAgQAQ&usg=AOvVaw2gYJArit75vNKcX46JWEck . Also setup aws login credentials on the machine
4. Run
```
npm start
```
5. A simple post call will upload the file provided in body to your s3
```
curl --location 'http://localhost:3000/api/upload' \
--form 'file=@"/Users/test/file.jpeg"'
```

#References
https://www.freecodecamp.org/news/stream-file-uploads-to-s3-object-storage-and-reduce-costs/#:~:text=We%20can%20use%20the%20Upload,a%20Readable%20and%20Writable%20stream.

https://www.npmjs.com/package/formidable#options
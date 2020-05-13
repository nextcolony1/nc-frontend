# NextColony Frontend

## Developing Locally

1. Install XAMPP [https://www.apachefriends.org](https://www.apachefriends.org)
2. Change document root in /xampp/apache/conf httpd.conf to point to this repo
3. Example config:
```
DocumentRoot "F:/git/nextcolony-frontend"
<Directory "F:/git/nextcolony-frontend">
```
4. Start XAMPP Control Panel
5. Start Module Apache
6. Open http://localhost in your browser
7. Develop and don't forget to do "Empty Cachen and Hard Reload" to see changes.

If you start the frontend on localhost you will use the steemconnect app "nextcolony.test" which allows redirect to localhost and runs against our test server.

## Test Deployment

With POST:
```http://140.82.34.132/deploy?sat=NCtest```

With GET:
```http://140.82.34.132/realdeploy```

Password: NCtest

## Live Deployment

```
https://nextcolony.io/realdeploy
``` 


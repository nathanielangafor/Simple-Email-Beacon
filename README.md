
<p align="center"> <img src="Project Elements/Simple_Email_Beacon.png"/> </p>

<hr>
<br/>

```SEB``` is the easiest and most secure way to track outgoing emails.

## Installation

Use the package manager [npm]([https://pip.pypa.io/en/stable/](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)) to install the following packages

```bash
npm install express
npm install express-ip
```

## Usage

```JavaScript
// Initialize express web client on port 3000
node main.js
```

```curl
// Generate hash to insert into email
curl --insecure -H "Content-type: application/json" 'http://127.0.0.1:3000/generateHash'
```

```
// Periodically send get requests to your generated URL for updates
curl --insecure -H "Content-type: application/json" 'http://127.0.0.1:3000/emailBeacon?hash=<YOUR_GENERATED_HASH>'
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)


# Frontend Repository
https://github.com/cszach/email-beacon-frontend

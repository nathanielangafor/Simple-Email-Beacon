
<p align="center"> <img src="Project Elements/Simple_Email_Beacon.png"/> </p>

<hr>
<br/>

```SEB``` is the easiest and most secure way to track outgoing emails. 
<br/>
Part 1/4 of the Arachnid project.

## Use Case
As cyber security enthusiasts, we have come to understand over 95% of cyber crimes are due to human error and over 90% of these crimes are carried out through email. Our goal was to create a tool that allowed users to track their emails with as many data points as possible. With this, you will be able to get data from each time someone opens your email. This data includes but is not limited to

```
- IP Address
- Date and Time
- Country
- City
- Timezone
```


## Installation

Use the package manager npm to install the following packages

```bash
npm install express
npm install express-ip
```

## Usage
This project will be a working UI within the next few weeks but in the meantime, the tool can be used with the following commands. To follow our progress please follow our repo: https://github.com/cszach/email-beacon-frontend
```JavaScript
// Initialize express web client on a local host, port 3000
node main.js
```

```curl
// Generate hash to insert into an email
curl --insecure -H "Content-type: application/json" 'http://127.0.0.1:3000/generateHash'
```

```
// Periodically send get requests to the following URL to get the mail status
curl --insecure -H "Content-type: application/json" 'http://127.0.0.1:3000/emailBeaconStatus?hash=<YOUR_GENERATED_HASH>'
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
<br/>
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

`npm i`

`npm run-script build`

`typeorm migration:run`

`npm start`


___

POST /customers

```json
{
	"userId": 1,
	"name": "name",
	"email": "mail@topx.team",
	"token": "tok_visa" 
}
```


POST /accounts

```json
{
    "userId": 1,
    "country": "US",
    "currency": "usd",
    "email": "mail@topx.team",
    "ip": "217.12.216.18",
    "individual": {
        "firstName": "name",
        "lastName": "name",
        "email": "mail@topx.team",
        "phone": "+15417543010",
        "ssnLast4": "0000",
        "address": {
            "city": "Santa Cruz",
            "country": "US",
            "line1": "650 Branciforte Ridge",
            "postalCode": "95065",
            "state": "CA"
        },
        "dob": {
            "day": 1,
            "month": 1,
            "year": 1990
        }
    },
    "bankAccount": {
        "country": "US",
        "currency": "usd",
        "accountNumber": "000123456789",
        "routingNumber": "110000000",
        "accountHolderName": "name"
    }
}
```



POST /charges

```json
{
    "amount": 50,
    "currency": "usd",
    "customer": 1,
    "account": 1
}
```



PATCH /charges

```json
{
    "captured": true
}
```
# asn1.js-rfc5652
Incomplete RFC5652 definitions for https://github.com/indutny/asn1.js/

See sources to identify what's implemented and tests for basic examples.

## Test data generation
```
cd test/fixtures/

openssl genpkey -genparam -algorithm ec -pkeyopt ec_paramgen_curve:P-256 -pkeyopt ec_param_enc:named_curve -out ec-keygenparams.temp.pem
openssl req -x509 -newkey ec:ec-keygenparams.temp.pem -keyout ec-key.temp.pem -out ec-cert.temp.pem -days 365 -nodes -subj '/CN=test-ec'
openssl cms -sign -binary -in ec-cert.temp.pem -signer ec-cert.temp.pem -inkey ec-key.temp.pem -outform PEM -out ec-cms.pem
openssl cms -sign -binary -in ec-cert.temp.pem -signer ec-cert.temp.pem -inkey ec-key.temp.pem -outform PEM -out ec-cms-embedded.pem -nodetach

openssl req -x509 -newkey rsa:2048 -keyout rsa-key.temp.pem -out rsa-cert.temp.pem -days 365 -nodes -subj '/CN=test-rsa'
openssl cms -sign -binary -in rsa-cert.temp.pem -signer rsa-cert.temp.pem -inkey rsa-key.temp.pem -outform PEM -out rsa-cms.pem
openssl cms -sign -binary -in rsa-cert.temp.pem -signer rsa-cert.temp.pem -inkey rsa-key.temp.pem -outform PEM -out rsa-cms-embedded.pem -nodetach

rm *.temp.pem
```

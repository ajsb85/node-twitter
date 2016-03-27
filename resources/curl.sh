curl -X POST "http://ajsb85.local/magento/rest/V1/integration/admin/token" \
     -H "Content-Type:application/json" \
     -d '{"username":"ajsb85", "password":""}'


qu2c1k83q4o509fok79ahforykspi15o

curl -X POST "http://ajsb85.local/magento/rest/V1/customers" \
     -H "Authorization: Bearer qu2c1k83q4o509fok79ahforykspi15o" \
     -H "Content-Type:application/json" \
     -d '{"customer":{"email":"user@example.com","firstname":"John","lastname":"Doe"},"addresses":[{"defaultShipping":true,"defaultBilling":true,"firstname":"John","lastname":"Doe","region":{"regionCode":"CA","region":"California","regionId":12},"postcode":"90001","street":["Zoe Ave"],"city":"Los Angeles","telephone":"555-000-00-00","countryId":"US"}]}'


curl -X GET "http://ajsb85.local/magento/rest/V1/products?searchCriteria=*" \
    -H "Authorization: Bearer qu2c1k83q4o509fok79ahforykspi15o" \
    -H "Content-type: application/json" -g

curl -X GET "http://ajsb85.local/magento/rest/V1/products/appandroid" \
    -H "Authorization: Bearer qu2c1k83q4o509fok79ahforykspi15o" \
    -H "Content-type: application/json" -g

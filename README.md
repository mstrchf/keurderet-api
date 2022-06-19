# keurderet-api
Backend API for the KeurDeret app

## routes
1. /user
    * [POST] /register
    * [POST] /verifyphone
    * [GET]  /
    * [POST] /register/phone
2. /requests
    * [GET]      /
    * [POST]    /
    * [DELETE] /:id
    * [PATCH] /:id
3. /notifications
    * [GET]     /
    * [DELETE] /:id
    * [PATCH] /:id

## db table relationships
1. user has many requests
2. user has many notifications
3. notifications belongs to user
4. requests belongs to user
5. notifications has a request

# essent-savings-program
This is a typescript implemented solution for Essent Savings Program. In addition to electricity and gas, Essent also offers “Energy Products”. These are mainly products and services to make homes more sustainable, such as solar panels, heat pumps and insulation. Because these are often major expenses, Essent wants to offer its customers a savings plan. It is possible to open a savings account to which money can be deposited at any time. Once in the savings account, money can not be withdrawn, but it can be used to purchase Essent energy products.

In order to support the functionality above, we have implemented different APIs. You can find details about their requirements [here](https://github.com/TiceWise/EssentBootcampFinalAssignment). The API details are as follow:

#### 1) POST: /accounts:

This endpoint will create an account with balance 0.

#### 2) GET: /accounts

This endpoint will retreive all accounts currently saved in the system.

#### 3) GET: /accounts/:accountId

This endpoint will retreive the account corresponding the given `accountId`.

#### 4) POST: /accounts/:accountId/deposits

This endpoint will register the deposit. The `accountId` should be the id of the account on which to deposited the money. The depositid returned will be the uuid.

#### 5) POST: /accounts/:accountId/purchases

This endpoint will register a product purchase. An account may only purchase this product if it has enough funds and if the product is in stock. A purchase will be illegal if the simulated day of the new purchase is earlier than the simulated day of the latest purchase. This means you can only register purchases chronologically.

#### 6) POST: /products

This endpoint will add a product. This product should be considered available from day 0. The response should be a list of all products. The id of the product will be randomly generated.

#### 7) GET: /products

This endpoint will fetch the list of products. The products will reflect the current stock based on the point in time given by the `Simulated-Day` header.

#### 8) GET: /products/:productId

This endpoint will fetch a particular product. This product will reflect the current stock based on the point in time given by the `Simulated-Day` header.

#### 9) POST: /interest

This endpoint will set the interest rate. The interest rates will be calculated dynamically based on this rate. This rate change will only activates on the day reflected by the `Simulated-Day` header. All interest before this date will reflect the previous interest rate.

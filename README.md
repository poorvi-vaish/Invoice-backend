# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm run dev` command to run in development

# Schema Diagram (For fields to be used in API requests)

https://dbdiagram.io/d/5fa67c4c3a78976d7b7ae7ac

# Response format

```js
{
    success: true | undefined,
    error: true | undefined,
    message: 'Message regarding error' | undefined,
    data: 'Data if success is true' | undefined,
    errStack: 'Conditional Errors if error is true' | undefined
}
```

# Request Format

The whole API is divided into resources, and each resource has some CRUD api endpoints, with identical request and response formats.

They are:

1. /list
2. /readOne
3. /updateOne
4. /deleteOne
5. /create
6. /readMany (Unavailable in some)

## /list

### API Endpoint: `/api/<resource>/list`

For requesting a list of items, the request should be of `POST` method with a `filters` object

```js
filters: {
    pagination: {
        page: <PAGE NUMBER>,
        limit: <NUMBER OF ITEMS PER PAGE>
    },
    sort: {
        field: <FIELD YOU WANT TO SORT>,
        order: 'ASC' | 'DESC'
    }
}
```

For example:

```js
filters: {
    pagination: { page: 1 , limit: 10 },
    sort: { field: 'created_at', order: 'ASC' }
}
```

### If you want the complete list, just set `filters` to false

## /readOne

### API Endpoint: `/api/<resource>/readOne`

For requesting a particular item, the request should be of `POST` method with the `id` of the object

```json
{
  "id": 3 // ID of the object
}
```

## /updateOne

### API Endpoint: `/api/<resource>/updateOne`

For updating a particular item, the request should be of `POST` method

### There are two ways an item can be updated

#### Method 1

You need to send three fields in the JSON request

1. `id`: ID of the Item
2. `field`: Field of the item you want to update (Get the field from Schema Diagram)
3. `new_value`: New value of the field

```json
{
  "id": 3, // ID of the object
  "field": "name",
  "new_value": "John Doe"
}
```

#### Method 2

You need to send two fields in the JSON request

1. `id`: ID of the Item
2. `data`: The whole item with the updated values

```json
{
  "id": 3, // ID of the object
  "data": {
    "name": "John Doe"
  }
}
```

## /deleteOne

### API Endpoint: `/api/<resource>/deleteOne`

For deleting a particular item, the request should be of `POST` method with the `id` of the object

```json
{
  "id": 3 // ID of the object
}
```

## /create

### API Endpoint: `/api/<resource>/create`

For creating a particular item, the request should be of `POST` method with the values and fields as key names in the JSON request. You can get the field names from the Schema Diagram for a resource.

```json
{
  "name": "John Doe",
  "address": "California, USA"
}
```

## /readMany

### API Endpoint: `/api/<resource>/readMany`

For requesting a list of particular items, the request should be of `POST` method with an array `id` of the objects

```json
{
  "ids": [1, 4, 8] // ID of the object
}
```

# Resources Available

1. collectionCentre
2. dehydrationLocation
3. dehydrationMaterialPayment
4. dehydrationMaterialRecieved
5. dehydrationMaterialRequired
6. feAssignedVillages
7. fieldExecutive
8. marketInformation
9. marketInformationGradewise
10. me
11. meFgCollectionDispatch
12. meOperations
13. prmWarehouseDelivery
14. procuredRawMaterials
15. rawMaterials
16. rmDistribution
17. rmFieldDelivery
18. usersWarehouses
19. villages
20. warehouseRawMaterials
21. warehouseRawMaterialsDispatch
22. warehouseRawMaterialsProcessing
23. taskForceMaterialRecievedCC
24. taskForceMaterialRecievedTrader
25. taskForceMaterialSentDehydration
26. taskForceMaterialSentFreshB2B
27. taskForcePaymentMadeCC
28. taskForcePaymentMadeTrader
29. collectionCentreSorting
30. collectionCentreHarvestingTeam
31. b2bMaterialPayment
32. b2bMaterialRecieved
33. collectionCentreMaterial

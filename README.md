# entries-backend-app

## Run the Application

To run the project locally, you will need to follow these steps:

1. Clone this repository.

2. On project root create a ```.env``` file and copy the contents of the ```.env.sample``` file (already present in the repository).

3. Make sure you have Docker and Docker Compose installed on your machine.

4. Run the following command to start the project:

    ```docker-compose up```

The project will start on the default port 3000.

## Postman Collection

In the repository's root folder, you will find a "postman" directory that contains a Postman collection. This collection allows you to test the project locally.

## Testing

Some unit tests have been developed for methods with logic.

To run automated tests (developed with Jest), use the following command:

    npm run test

## API Endpoints

The following sections provide details about the available endpoints, including the HTTP methods, request URLs, expected request bodies, and response bodies.

### Base URL

All URLs referenced in the documentation have the following base (if you run project in local):

  http://localhost:3000

### Fetch All Entries

- **Method**: `GET`
- **URL**: `/entries`
- **Query Parameters**:
  - `page`: The page number (integer)
  - `limit`: The number of entries per page (integer)
- **Success Response**:
  - **Code**: 200 OK
  - **Content Example**:
    ```json
    [
        {
            "id": "1",
            "application_hostname": "new_app",
            "timestamp": "2028-11-02T10:20:11.242Z",
            "type": "WEB"
        },
        {
            "id": 2,
            "application_hostname": "old_app",
            "timestamp": "2028-10-02T10:20:11.242Z",
            "type": "MOBILE"
        }
    ]
    ```

### Get Entry by ID

- **Method**: `GET`
- **URL**: `/entries/:id`
- **Success Response**:
  - **Code**: 200 OK
  - **Content Example**:
    ```json
    {
        "id": "1",
        "user": "Joe Smith",
        "country": "UK",
        "ip": "1.2.3.4",
        "device": "Windows / Chrome 121.0",
        "tags": [
            {
                "title": "ERROR",
                "description": "Error description",
                "color": "#F17567"
            }
        ],
        "isDangerous": true,
        "application_hostname": "new_app",
        "timestamp": "2028-11-02T10:20:11.242Z",
        "type": "WEB"
    }
    ```

### Create a New Entry

- **Method**: `POST`
- **URL**: `/entries`
- **Request Body Example**:
  ```json
  {
      "application_hostname": "new_app",
      "type": "WEB",
      "user": "New User",
      "country": "USA",
      "ip": "192.168.1.1",
      "device": "MacOS / Safari",
      "tags": [
          {
              "title": "NEW",
              "description": "New entry tag",
              "color": "#00FF00"
          }
      ],
      "isDangerous": false
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Content Example**:
    ```json
  {
      "id": "5",
      "application_hostname": "new_app",
      "type": "WEB",
      "user": "New User",
      "country": "USA",
      "ip": "192.168.1.1",
      "device": "MacOS / Safari",
      "tags": [
          {
              "title": "NEW",
              "description": "New entry tag",
              "color": "#00FF00"
          }
      ],
      "isDangerous": false
  }
  ```

  ### Update an Entry

- **Method**: `PUT`
- **URL**: `/entries/:id`
- **Request Body Example**:
  ```json
  {
    "user": "Updated User",
    "country": "Canada"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content Example**:
    ```json
  {
      "id": "5",
      "application_hostname": "new_app",
      "timestamp": "2029-01-01T12:00:00.000Z",
      "type": "WEB",
      "user": "Updated User",
      "country": "Canada",
      "ip": "192.168.1.1",
      "device": "MacOS / Safari",
      "tags": [
          {
              "title": "NEW",
              "description": "New entry tag",
              "color": "#00FF00"
          }
      ],
      "isDangerous": false
  }
  ```

  ### Delete an Entry

- **Method**: `DELETE`
- **URL**: `/entries/:id`
- **Success Response**:
  - **Code**: 204 No Content
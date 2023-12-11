# Node.js Backend for Covid Data Visualization

This Node.js backend serves as the API server for the Covid Data Visualization React application. The backend provides endpoints to fetch mortality data for different countries and supports pagination.

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
- [Database](#database)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Installation

To run the Node.js backend locally, follow these steps:

1. Clone this repository to your local machine using the following command:

```
git clone https://github.com/asormeil/covid-data-backend.git
```

2. Navigate to the project directory:

```
cd covid-data-backend
```

3. Install the required dependencies using npm:

```
npm install
```

4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the necessary environment variables, such as database credentials and API keys.

## Getting Started

To start the Node.js backend server, run the following command:

```
npm start
```

The server will start running on `http://localhost:8000`.

## Endpoints

The API server provides the following endpoints:

- **GET /api/mortality** - Fetches mortality data with pagination support. It accepts query parameters for `page` (page number) and `pageSize` (number of items per page). The default values are `page=1` and `pageSize=10`.

- **GET /api/mortality/:country** - Fetches mortality data for a specific country. It requires the `country` parameter in the URL.

Example:

```
GET http://localhost:8000/api/mortality/Canada
```

Response:

```json
{
  "data": [
    {
      "date": "2023-07-28",
      "deaths_2023_all_ages": 100,
      "average_deaths_2015_2019_all_ages": 80,
      "deaths_since_2020_all_ages": 20,
      "deaths_2015_all_ages": 70
    },
    // More data...
  ],
  "currentPage": 1,
  "totalPages": 5
}
```

## Database

The backend is powered by a MongoDB database that contains the following files:

- **covidData.bson**: BSON file containing Covid data for different countries.
- **covidData.metadata.json**: Metadata file associated with the `covidData.bson` collection.

- **mortalityData.bson**: BSON file containing mortality data for different countries.
- **mortalityData.metadata.json**: Metadata file associated with the `mortalityData.bson` collection.

These files store the relevant data used by the API to provide the mortality information to the frontend application.

## Error Handling

The API server handles errors gracefully and responds with appropriate HTTP status codes and error messages. If an endpoint is requested with invalid parameters or if there is an internal server error, the API will respond with an error message in the following format:

```json
{
  "status": "error",
  "message": "Error message goes here"
}
```


## License

 [MIT License](LICENSE).



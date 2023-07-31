
# Node.js Backend for Covid Data Visualization

This Node.js backend serves as the API server for the Covid Data Visualization React application. The backend provides endpoints to fetch mortality data for different countries and supports pagination.

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
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

## Error Handling

The API server handles errors gracefully and responds with appropriate HTTP status codes and error messages. If an endpoint is requested with invalid parameters or if there is an internal server error, the API will respond with an error message in the following format:

```json
{
  "status": "error",
  "message": "Error message goes here"
}
```

## Contributing

Contributions to this project are welcome. If you find any issues or want to add new features, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/your-bug-fix`.
3. Make your changes and commit them with a descriptive commit message.
4. Push your changes to your branch: `git push origin feature/your-feature-name` or `git push origin bugfix/your-bug-fix`.
5. Create a pull request targeting the `main` branch of this repository.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for using our Covid Data Visualization application! If you have any questions or need further assistance, please don't hesitate to reach out.

Happy coding!
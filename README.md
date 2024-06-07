## Best Time API 🕛

This project involves managing appointments and resources efficiently through a scheduling system. The system ensures that users can book, modify, and cancel appointments seamlessly while preventing scheduling conflicts and optimizing resource utilization.

Benefits:
- Efficiency: The system automates scheduling processes, reducing the time and effort needed to manage appointments.
- Productivity: Users stay organized and adhere to their schedules, improving overall productivity.
- Accessibility: The system is accessible from multiple devices, including desktops and mobile phones, providing flexibility.
- Conflict Reduction: By managing availability and resources, the system minimizes scheduling conflicts and double-bookings.
- Customization: The system can be tailored to meet the unique needs of various users and organizations, ensuring a personalized experience.
- This scheduling system project aims to enhance the organization and efficiency of appointment and resource management, providing clear benefits to users and administrators alike.

**Developed by Kevelyn Nascimento** <a href="https://www.linkedin.com/in/kevelynnascimento" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"></a>

## Packages

- Node.js (version 20.13.1)
- CORS (version ^2.8.5)
- dotenv (version ^16.4.1)
- Express.js (version ^4.18.2)
- Inversify (version ^6.0.2)
- inversify-express-utils (version ^6.4.6)
- reflect-metadata (version ^0.2.1)

## Running the Project for the First Time

### Install Dependencies:

```bash
npm install
```

### Configure your .env file:

```
1. If you do not have one, please create a .env file in your root directory.
2. Configure your PORT value as the desired value.
3. It should be like this: PORT=3000.
```

### To execute docker compose:

```bash
docker-compose up -d
```

### To execute all migrations:

```bash
npm run migration:up
```

### To start in regular mode:

```bash
npm run start
```

### To start in development mode:

```bash
npm run start:dev
```

### To start in production mode:

```bash
npm run prod
```

## Running tests for the First Time

### Run Tests:

```bash
npm run test
```

### Run Tests in Watch Mode (Dev):

```bash
npm run test:dev
```

### Generate Test Coverage Report:

```bash
npm run test:coverage
```

### Generate Migration:

```bash
npx typeorm migration:create migrations/{table-name}/{table-name}-{action}
```

### Generate Structure using CLI:

```bash
npm run cli -- create {structure-name}
```

**Remeber to add the new controller, service and repository inside of the ContainerConfig and generate the new migration file after creating a new structure**
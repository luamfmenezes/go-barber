### GoBarber 💈💈

---

![](https://i.ibb.co/nbtdQ9C/logo-3x.png)

Application developted on Rocketseat goStack bootcamp, course about ReactJS, React-Native and Nodejs.
The application allow to manage the appointments in a barbershop with a web front-end for the barbers control their agenda, and a mobile app to users schedule appointments.

### Features

---

#### Barber

- SignIn, SiginUp and ForgotPassword
- Dashboard page show all schedules appointments for the selected day;
- Calendary with available times, where it is possible to select a day to se the appointments.
- Show the next appointment.
- Update barber infos and avatar.

#### User

- SignIn, SignUp and ForgotPassword
- List all the barbers availables;
- It's possible to see the available times of each user.
- Update users infos and avatar.

## Backend

The backend is a Rest API developed in Nodejs with Typescript, using a DDD strcucture, the backend have dependency injection to be possible apply unit tests in the Services. Trogouth the bootcamp it was explored all the best pratices listened in SOLID principle.

#### Usuability

---

To start the serve is necessary config the .env file.

`yarn dev:server`
start the server in development mode.

`yarn typeorm migration:run`
Run the migrations

`yarn test`
Run the tests

## Front end

The front end is a React application developed with Typescript, it use styled-components, ContextApi.


#### Usuability

---

To start the serve is necessary config the .env file.

`yarn start`
Run the application.

`yarn test --coverage --watchAll false`
Run the tests

## Mobile

The mobile app was developed using React-Native with Ts.

#### Usuability

---

To start the serve is necessary config the .env file.

`yarn start`
Run the application.

`yarn test --coverage --watchAll false`
Run the tests

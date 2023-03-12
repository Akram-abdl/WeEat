# WeEat

## How to install ?

## 1. Online

If you don't want to install anything, you can go to the [deployed version of the app](https://we-eat.vercel.app/).

## 2. Local

1. You need [Docker Desktop](https://docs.docker.com/desktop/) to run the app
2. Clone the repository
3. Create a `.env` file from the `.env.dist`
4. Change the `VITE_SPOONACULAR_API_KEY` to your own key or one of the following :
* (each key has a daily quota ! if you request the API too much, you won't be able to query anymore !)
* `225326f8a01a4707af2fd0c8938c7f51`
* `85f1dc30b9d04c66bebbdb9c166994ac`
* `5788c90e376047b29d75023c2d476b39`
5. Use `docker compose up` to start the project

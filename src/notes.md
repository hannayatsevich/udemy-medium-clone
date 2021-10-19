# сделать back на node.js

https://angular.realworld.io/
user@user.com
user2@user.com
123
12345678

архитектура (страницы + компоненты)
абсолютные пути к файлам - много путей - добавить jsconfig.json/tsconfig.json (см документацию CRA)
### CRA + yarn
prettier (установка в проект + настройка IDE)

react-router, Link предотвращает перезагрузку страницы (см документацию)
компонент, указанный в Route получает history, location
### bootstrap

useState - как snapshoot, это каждый раз новая функции, с новым стейтом (не тот же обновленный стейт)
lazy loading - разница между (влияет на performance):
const initialize = () => '';
const [email, setEmail] = useState(initialize()); функция внутри будет вызываться каждый раз
const [email, setEmail] = useState(initialize); функция внутри вызовется в 1й раз, при последующих рендерах  нет
Если в setState передавать объект, то перезаписываете все поля, если функцию, то есть возможность получить доступ к состоянию и перезаписать не все поля.

ref - мутабельный объект, и react про него ничего не знает

useEffect - заменяет 3 МЖЦ, не блокируют браузер при попытке обновить экран, каждый раз при повторном рендере, ставится в очередь новый эффект, который заменяет предыдущий
работает на замыкании, всегда имеет доступ к актуальному состоянию
эффекты со сбросом и без
настроить пропуск вызова эффекта (первый раз сработает всегда)

### axios https://habr.com/ru/company/ruvds/blog/477286/

side effects, взаимодействие с localstorage, fetch запросы, манипуляции с DOM, логи, подписки

useCallback - мемоизация ф-ии



???(документация) если пришел новый friendId, его статус сохранился от старого, это зависит от ChatAPI, вызовется ли callback, который изменит state?

чтобы одновременно запустить  udemi-medium-clone и koa-knex-realworld-example:
windows - set PORT=3001 && yarn start
mac/linux - PORT=3001 yarn start


koa-knex-realworld-example:

git clone https://github.com/EJIqpEP/koa-knex-realworld-example
npm install
npm run db:migrate
npm run db:load
npm run dev


выносить логику перед JSX
React Redirect более декларативен

### classNames
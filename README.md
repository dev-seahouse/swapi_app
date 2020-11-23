# A simple react-redux spa for swapi.dev

[Demo Link](https://spotty-plantation.surge.sh)

## Project Requirement

### User Stories

1. User should be able to view all people in the star wars universe
2. User should be able to view details of every person in the star wars universe

### Functional Requirements

1. /people should display all people
2. /people: personId should display a person by id in detail

### Non-Functional Requirements 

1. User a state management tool
2. Code should be in production ready-state

### Technologies Used

1. React (hooks)
2. React Router (hooks)
3. Redux (hooks)
4. Redux Toolkit
5. SASS

### Technical Design

#### Fetching all people from swapi process

The application makes an initial request to swapi/people to retrieve the first page of all people data. 

```javascript
{
	"count": 82,
	"next": "http://swapi.dev/api/people/?page=2",
	.....
}
```

The "count" attribute is used to calculate the number of subsequent requests to be make and to generate subsequent requests after the initial request. e.g ?page=2.  The "next" attribute is not used instead because it would mean that subsequent requests could only be made before the previous request resolved, it would be inefficient as compared to sending all requests at once.

Once the request promise resolved, a "fetchAllPeople/fufilled" action will be dispatched and processed by people reducer to updates its "people/entities" state and "people/status" status, allowing us to know when all people data has been successfully fetched.
The resolved results array of all people is processed by redux-thunk middleware, which sits between dispatch(action) and reducer. For each object in the people array, 2 additional attributes are added.

1. id: to help identify each object in people array because the response from swapi does not contain id for each person object.
2. detailsStatus: idle" | "loading" | "succeeded" | "failed",  to keep track of lazy loading state of person details when user visits person details page. An alternative approach would be to store detailsStatus using a separate state { personId: status} instead of nesting inside each person object.

When user visits people/:personId, instead of making new request, the existing person object is reused to retrieve nested urls to additional details such as list of films.

```javascript
{
			"name": "Luke Skywalker",
			"films": [
				"http://swapi.dev/api/films/1/",
				"http://swapi.dev/api/films/2/",
				"http://swapi.dev/api/films/3/",
				"http://swapi.dev/api/films/6/"
			],
			...
}
```

Then, when all of the requests promises for additional data are resolved, the returned data is put back into respective attributes of person object. For example: {

​	"films" : [ obj ,obj ,obj]

}

Once person details is loaded, "fetchPersonById/fulfilled" action would be dispatched, that is how the application knows when person details page can be rendered.

#### ![](https://cdn-std.droplr.net/files/acc_601720/FFvKNr)

#### Redux reducers

##### People Reducer

##### Reducer States

- entities: an array of all people objects
- status : ["idle" | "loading" | "succeeded" | "failed"],  keeps track of fetching people object promise resolution status
- error: stores errors returned by rejected promise. ( for http requests to swapi)

##### Reducer actions:

- fetchAllPeople/pending
- fetchAllPeople/fufilled
- fetchAllPeople/rejected
- fetchPersonById/pending
- fetchPersonById/fufilled
- fetchPersonById/rejected

### CSS architecture

Stylesheets are divided into different categories as follows:

1. Base rules:

   For typography, links, heading, general style resets, tag level elements default styles

2. Layout rules

   Defines reusable container and layout rules, helps to keep application layouts consistent across the app.

3. Module Rules

   Defines reusable modules including buttons, card, gallery.

4. Misc Rules

   Inspired by utility-first css framework such as tailwind to define utilities rules.

5. Page specific rules

   For rules that are unlikely to be reusable and tightly coupled to specific pages

### UI Design

The application attempt to target modern star wars fans by using bright and bold color palettes. Brandon Grotesque and Jedi font pairing is chosen to create a feeling of classical star wars experience combined with a slight touch of modernity.

![](https://cdn-std.droplr.net/files/acc_601720/Hs4xEb)

![](https://cdn-std.droplr.net/files/acc_601720/iJfA8B)

### Challenges and fun

1. Figuring out the best way to load data.

   The swapi has an endpoint for people, however, it does not return all of the people objects. Instead, it returns paginated data in a batch of 10 for each request, it means that 9 requests are needed to retrieve all people data at once.

   There are a few options:

   	1. Use pagination, user could click on prev and next button, and fetch the next page on click.
    	2. Infinite scrolling, when user scrolls to the bottom + 20px , fetch the next page of data while showing loading state.
    	3. Batch requests with Promise.all([]) and shows loading states.
    	4. Create a mini server, cache the results on disk and crontask to update periodically by fetching new data from api,  enable http2 and set Cache-Control header.
    	5. others .....

   Each approach has their own pros and cons, and with each additional feature comes the risk to introduce additional bugs. Given the limited time, I have chosen to use the simple Promise.all([]) approach as it provides reasonable user experience and simple enough to be implemented and tested quickly.

2. Playing with redux hooks and redux tookit.

   Previously, projects are done with mapStateToProps, mapDispatchToProps and connect, as well as hand written reducers and immutability logic. However, the redux community recommends using the new redux hooks such as useDispatch, useSelector and its redux toolkit to write more efficient, less error prone code. It requires some fun reading and experimentation to understand how redux hooks works and how to use them correctly. One notable discovery is that I could mutate objects as if they are mutable inside reducers created by createSlice, because of the [immer](https://github.com/immerjs/immer) integration. The immer library compares our mutated objects with the actual object and creates an immutable copy of it automatically. It is much simpler than using spread operators and creating deep copying helpers myself.

3. Whatifs

   A number of whatif questions are asked and handled, however, I am not able to cover all cases yet for this project. 

   Examples of whatifs:

   1. What if the swapi server is down
   2. What if user types in an invalid url, for example  http://localhost:3000/people/"dfdfdfdf" 
   3. What if the swapi changes its json format ? how to minimize changes to my application if data format changes
   4. What is I want to reuse the PersonCard component, or PersonDetail component etc, would I be able to freely move these components around into any place without changing the structure of existing application?  
   5. What kind, and how much data should each component know to to minimize re-rendering?
   6. What kind of error could happen? empty array, empty object, trying to access an array index that does not exist, trying to access an object key that does not exist, fetch all people promise rejection, fetch person by id promise rejection.
   7. whatif some imaginary additional features are requested, how do I keep my application closed for changes and open for extension?
   8. ...... 


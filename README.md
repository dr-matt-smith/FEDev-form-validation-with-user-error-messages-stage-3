
[Stage 1](https://github.com/dr-matt-smith/FEDev-form-validation-with-user-error-messages---stage-1)
|
[Stage2](https://github.com/dr-matt-smith/FEDev-form-validation-with-user-error-messages--stage-2)
|
Stage 3


# FEDev-form-validation-with-user-error-messages


# stage 3 - catch the errors

Rather than letting the user see the horrible 500 error page, let's **catch** these errors in the page server script

For now, we'll:
- catch any error
- then LOG the error message to the console
- fi there's no error, we'll also log successful creation of a TODO

let's update the `create` form processing action in our server script:

`/routes/+page.server.js`

```javascript
    ... other code

    export const actions = {
        create: async ({cookies, request}) => {
            const data = await request.formData();

            try {
                let description = data.get('description')
                db.createTodo(cookies.get('userid'), description);

                // LOG successful TODO creation
                console.log("TODO success! data valid, created new TODO = '" + description + "'");

            } catch (error) {
                // LOG caught ERROR 
                console.log("TODO - *** ERROR *** - there was a problem with your new TODO = '" +  + error.message + "'");
            }
        },

    ... other code 
```

If we submit the following sequence of TODOs we'll see results logged in the console, and also the successful descriptions appearing in the list of TODOs int the web page:

1. learn JavaScript (valid)
2. empty (invalid - ERROR to be caught)
3. buy milk  (valid)
4. buy milk (invalid since already exists - - ERROR to be caught)
5. walk dog   (valid)

Our screen and terminal should looks as follows:

![](/screenshots/40_logging.png)

So the complete listing now looks as follows:

`/routes/+page.server.js`

```javascript
import * as db from '$lib/server/database.js';

export function load({ cookies }) {
    let id = cookies.get('userid');

    if (!id) {
        id = crypto.randomUUID();
        cookies.set('userid', id, { path: '/' });
    }

    return {
        todos: db.getTodos(id)
    };
}

export const actions = {
    create: async ({cookies, request}) => {
        const data = await request.formData();

        try {
            let description = data.get('description');
            db.createTodo(cookies.get('userid'), description);

            // LOG successful TODO creation
            console.log("TODO success! data valid, created new TODO = '" + description + "'");

        } catch (error) {
            // LOG caught ERROR 
            console.log("TODO - *** ERROR *** - there was a problem with your new TODO = '" + error.message + "'");
        }
    },

    delete: async ({ cookies, request }) => {
        const data = await request.formData();
        db.deleteTodo(cookies.get('userid'), data.get('id'));
    }
};

```

---

at the moment the USER won't see anything happen in the web browser when there is an error - we'll improve the user experience with a message for them in the next stage...

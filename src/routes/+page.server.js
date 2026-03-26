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

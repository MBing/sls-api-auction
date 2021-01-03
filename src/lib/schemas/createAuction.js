import { stringify } from "uuid";

const schema = {
    properties: {
        body: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                },
            },
            required: ['title'],
        },
    },
    required: ['body'],
};

export { schema };

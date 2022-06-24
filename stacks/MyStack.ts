import { StackContext, Api, Table } from "@serverless-stack/resources";


export function MyStack({ stack }: StackContext) {

  const blogTable = new Table(stack, "Blog", {
    fields: {
      blogId: "string",
      author: "string",
      title: "string",
      content: "string",
      createdAt: "string"
    },
    primaryIndex: { partitionKey: "blogId" },
  });

const blogApi = new Api(stack, "BlogApi", {
  defaults: {
    function: {
      environment: {
        TABLE_NAME: blogTable.tableName,
      },
    },
  },
  routes: {
    "GET /blogs": "functions/list-blogs.handler",
    "POST /blogs": "functions/create-blogs.handler",
    "GET /blogs/{id}": "functions/get-blogs.handler",
    "PUT /blogs/{id}": "functions/update-blogs.handler",
    "DELETE /blogs/{id}": "functions/delete-blogs.handler",
  },
});

blogApi.attachPermissions([blogTable]);

  stack.addOutputs({
    ApiEndpoint: blogApi.url
  });
}

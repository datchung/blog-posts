[Blog Home Page](../../README.md)

# Course Notes: API Development in .NET with GraphQL

_Tags: .NET, API, Course, GraphQL, Notes_

Table of Contents
1. [Introduction](#intro)
2. [What is GraphQL.NET?](#what)
3. [Course Goals](#goals)
4. [GraphiQL](#GraphiQL)
5. [Queries](#queries)
6. [Mutations](#mutations)
7. [Subscriptions](#subscriptions)
8. [Conclusion](#conclusion)
9. [Comments](#comments)

## 1. <a name='intro'></a>Introduction

["API Development in .NET with GraphQL"](https://www.linkedin.com/learning/api-development-in-dot-net-with-graphql/welcome) is a LinkedIn Learning course by Glenn Block that introduces API Development in .NET with GraphQL.

## 2. <a name='what'></a>What is GraphQL.NET?

GraphQL.NET is an open source library for building a GraphQL server. A client can perform queries, mutations and subscriptions to a GraphQL endpoint. This library supports .NET Framework (.NET Standard) and .NET Core.

## 3. <a name='goals'></a>Course Goals

Learn how to use GraphiQL (pronounced "graphical"), an interface that can execute GraphQL requests and serve API documentation.

Create a GraphQL server that supports:
* Queries to get data
* Mutations to add or modify data
* Subscriptions to subscribe to data events via a "push" mechanism

## 4. <a name='GraphiQL'></a>GraphiQL

GraphiQL is a browser-based editor to execute queries and mutations against a GraphQL API server. GraphiQL also hosts API documentation.

| ![GraphiQL Editor and Docs](Docs.png) | 
|:--:| 
| *GraphiQL Editor and Docs* |

## 5. <a name='queries'></a>Queries

Below is an example query in GraphiQL. The query specifies what type of data and which properties to return. Note the nested `customer` property which is linked to the `Customer` object.

| ![Queries in GraphiQL](Queries.png) | 
|:--:| 
| *Queries in GraphiQL* |

## 6. <a name='mutations'></a>Mutations

Below is an example mutation in GraphiQL to create a record (an order) and update a record (start an order). `$order` is a variable with its value specified in the Query Variables window.

| ![Mutations in GraphiQL](Mutations.png) | 
|:--:| 
| *Mutations in GraphiQL* |

## 7. <a name='subscriptions'></a>Subscriptions

Below is an example subscription in GraphiQL. Clients that subscribe to a pre-defined will get a push notification when the event occurs. In this case, one client (upper right window) subscribes to the order created event. Another client (lower right window) subscribes to the order started event. When a subscribed event occurs, the event details will show up in the window that says "Your subscription data will appear here after server publication!".

| ![Subscriptions in GraphiQL](Subscriptions.png) | 
|:--:| 
| *Subscriptions in GraphiQL* |

## 8. <a name='conclusion'></a>Conclusion

This course is a practical introduction to GraphQL with real examples. Here are some related topics further research:
* Authentication and authorization
* Subscription performance (eg. how do connections scale, etc)
* HTTP request equivalent of GraphQL queries
* Usage with SPA frameworks (eg. Reactjs)

## 9. <a name='comments'></a>Comments

_Reply to [this tweet](https://twitter.com/innochi_mob/status/1364745891521974277)._
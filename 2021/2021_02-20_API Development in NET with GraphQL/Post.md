[Blog Home Page](../../README.md)

# Course Notes: API Development in .NET with GraphQL

_Tags: .NET, API, Course, GraphQL, Notes_

Table of Contents
1. [Introduction](#intro)
2. [What is GraphQL.NET?](#what)
3. [Course Goals](#goals)
4. [Allowing Updates Through Mutations](#mutations)
5. [Enabling CLients to Subscribe to Notifications](#subscribe)
7. [Conclusion](#conclusion)
8. [Comments](#comments)

## 1. <a name='intro'></a>Introduction

["API Development in .NET with GraphQL"](https://www.linkedin.com/learning/api-development-in-dot-net-with-graphql/welcome) is a LinkedIn Learning course by Glenn Block. This course is an introduction to API Development in .NET with GraphQL.

## 2. <a name='what'></a>What is GraphQL.NET?

* Open source library for building a GraphQL server
* Stand up GraphQL endpoint for queries, mutations and subscriptions
* Supports .NET Framework and Core

## 3. <a name='goals'></a>Course Goals

* Use the GraphiQL (pronounced "graphical") interface to perform GraphQL requests and serve API documentation
* Create a GraphQL server that supports:
  * Queries to get data
  * Mutations to add or modify data
  * Subscriptions to subscribe to data events via a "push" mechanism

## 4. <a name='GraphiQL'></a>GraphiQL

GraphiQL is a browser-based editor to execute queries and mutations against a GraphQL API server. GraphiQL also hosts API documentation.

| ![API Documentation in GraphiQL](Docs.png) | 
|:--:| 
| *API Documentation in GraphiQL* |

## 5. <a name='queries'></a>Queries

Below is an example query in GraphiQL. The query specifies what type of data and which properties to return. Note the nested `customer` property which is linked to the `Customer` object.

| ![Queries in GraphiQL](Queries.png) | 
|:--:| 
| *Queries in GraphiQL* |

## 6. <a name='mutations'></a>Mutations

| ![Mutations in GraphiQL](Mutations.png) | 
|:--:| 
| *Mutations in GraphiQL* |

## 7. <a name='subscriptions'></a>Subscriptions

| ![Subscriptions in GraphiQL](Subscriptions.png) | 
|:--:| 
| *Subscriptions in GraphiQL* |

## 8. <a name='conclusion'></a>Conclusion

Authentication and authorization
Websockets performance (how many, etc)
HTTP request equivalent
Usage with SPA frameworks (eg. Reactjs)

## 9. <a name='comments'></a>Comments

_Reply to [this tweet]()._
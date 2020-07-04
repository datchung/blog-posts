[Blog Home Page](../../README.md)

# Advanced NLog: Multiple Log Managers and Why You Might Need It

_Tags: .NET, C#, Logging, NLog_

Table of Contents
1. [Introduction](#introduction)
2. [NLog](#nlog)
3. [Use Cases](#use)
4. [Example](#example)
5. [Conclusion](#conclusion)
6. [Comments](#comments)

##  1. <a name='introduction'></a>Introduction

Logging is a common application feature and can be implemented in several different ways. Using the logging library, NLog, is one of those ways.

## 2. <a name='nlog'></a>NLog

[NLog](https://github.com/NLog/NLog) is a logging library that is easy to get started with and use. In most cases, the straightforward use of NLog with the `LogManager` class is sufficient. For example:

```c#
var logger = NLog.LogManager.GetCurrentClassLogger();
Logger.Info("Hello world");
```

There are use cases where a single `LogManager` does not suffice and NLog also supports scenarios that are less common through its advanced features.

## 3. <a name='use'></a>Use Cases

Consider the scenario where an application is using NLog for logging and references a Nuget package that also uses NLog for logging.

Let's say that the application loads its logging configuration from the `NLog.config` file whereas the Nuget package's logging is configured programmatically like this:

```c#
var config = new NLog.Config.LoggingConfiguration();
...
NLog.LogManager.Configuration = config;
```

The programmatic logging configuration defined in the Nuget package will actually overwrite the application's logging configuration based on `NLog.config` and break the application's logging.

## 4. <a name='example'></a>Example

### Introduction

### Solution Structure

### Interfaces

## 5. <a name='conclusion'></a>Conclusion

## 6. <a name='comments'></a>Comments

_Reply to [this tweet]()._
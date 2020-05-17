[Blog Home Page](../../README.md)

# Dynamic Module Loading With Ninject

_Tags: .NET, C#, Dependency Injection, Dynamic, Modules, Ninject_

Table of Contents
1. [Introduction](#introduction)
2. [Use Cases](#use)
3. [Ninject](#ninject)
4. [Example](#example)
5. [Conclusion](#conclusion)
6. [Comments](#comments)

##  1. <a name='introduction'></a>Introduction

Dynamic module loading is the act of locating and loading modules at run-time. Instead of defining what modules and implementations to use via code, define the interfaces of the modules and then load the desired implementations dynamically at run-time.

## 2. <a name='use'></a>Use Cases

Here is a quote from [Ninject's documentation](https://github.com/ninject/Ninject/wiki/Modules-and-the-Kernel#dynamic-module-loading):
> This module location strategy is often used for plugin or Composite based architecture styles such as the Onion Architecture and allows one to decouple your container application from its slot-in subsystems.

## 3. <a name='ninject'></a>Ninject

[Ninject](https://github.com/ninject/Ninject) is a dependency injection tool that includes a feature which enables dynamic module loading - the focus of this article.

## 4. <a name='example'></a>Example

## 5. <a name='conclusion'></a>Conclusion

## 6. <a name='comments'></a>Comments

_Reply to [this tweet]()._
# Introduction

This is a website for ordering sandwiches. Everything has been dockerized to make the system platform independent.

# Front-end

The front-end architecture is made the following:

- **React** for the framework
- **NextJS** for compiling and optimisation
- **Tailwind** for styling

# Architecture and services

## API gateway

Acts as a proxy for all services. Handles authentication, rate limiting, logging and firewalling API routes.

In this project the API gateway also handles static file serving. Usually this would be the responsibility of the CDN.

## Sandwich factory service

Makes sandwiches. The service might use the /sandwich API to get information about the sandwich types. This service is not scalable so there's a queue infront of it, implemented with **RabbitMQ**. 

## Database

Stores client data, orders, sandwiches and all other data from the services. Every service has access to only to its own data. The database is implemented with MongoDB.

# How does the system work?

## Overview

## Authentication

## Ordering

# Known weak links

# About RabbitMQ

RabbitMQ is needed only for the queueing the orders. Piping everything trough it would be overhead -- especially since most of the services can be assumed to scale with the usage. Other APIs don't need the queue function before the service; they are assumed to always have enough capacity.

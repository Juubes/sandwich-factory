# Introduction

This is a website for ordering sandwiches. Everything has been dockerized to make the system platform independent.

# Front-end

The front is made with React and Tailwind.

# Architecture and services

## API gateway

    Acts as a proxy for all services. Handles authentication, rate limiting, logging and firewalling API routes.

## Sandwich factory

    Makes sandwiches and keeps track of what sandwiches are possible to make.

## Authentication

    Keeps track of sessions and maintains and authenticates users.

## Database

    Stores client data, orders, sandwiches and all other data from the services. Every service has access to only to its own data.

# How does the system work?

## Overview

Clients can either authenticate, browser all sandwiches or make an order. All of these actions have their own service. There's an API gateway infront of every service.

## Authentication

Clients can authenticate with the authentication service. The service handles the session at the gateway-level. The microservices don't do their own authentication; it's better to have it all in the same place.

## Ordering

Clients can send orders to the Sandwich factory service trough the /order API route. The client gets an immediate response that the order has started processing. The client and the sandwich factory share a websocket so the client gets a push notification when the sandwich is ready.

# Known weak links

The API gateway is the bottleneck and a one-point-of-failure. Normally I'd trust this responsibility to Google's or Amazon's platform and their products but for the moment this will do.

A lot of the microservices could have been replaced with serverless functions for more abstraction and efficiency.

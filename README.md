# Products API

## Retool api

[api link](https://retoolapi.dev/6eCWio/products)

### Data generation

ChatGPT was used to generate mock data for the api

> The Prompt:

```plaintext
I want you to generate a csv file for me.

Think of 10 categories of products (eg. course).
Then, generate 10 products for each category (eg. Typescript Zero to Hero).
Think of am integer as a price in HUF for each product.
The ids of the products should auto increment.

The end result should be a 101 line csv file (including the headers) using ; as a separator and should look like this:
id;category;product;price
1;course;Typescript Zero to Hero;40000
```

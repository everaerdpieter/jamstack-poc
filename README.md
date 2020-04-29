# Jamstack proof of concept

## Goal

Fast seo friendly site with admin portal to edit the site's content.

## How

[Jamstack approach:](https://jamstack.org/)

- Git source control contains code and content of the site.
- Site itself is angular.
- Main pages of the site are prerendered for fast rendering and seo friendlyness.
- Admin portal is a lazy loaded angular module. It is not loaded when only visiting the main pages.
- Admin portal uses Google Cloud function to edit content in GitHub.
- Github actions as a lightweight CI/DC pipeline to deploy a new version of the site when content was changed.

## Why

- Main pages are prerendered and deployed via CDN to be fast and seo-friendly.
- Site content can be edited like e.g. a wordpress site,
- But site visitor requests are not handled by a server process rendering the pages, but by a CDN delivering prerendered pages.
- All changes to the site are versioned in git

## Demo

[https://jamstack-poc.web.app/]https://jamstack-poc.web.app/

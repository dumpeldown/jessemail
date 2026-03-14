---
layout: layouts/base.njk
title: Travel Journal
date: 2026-03-14T00:26:00.000+01:00
tags: []
---
# Travel Journal

Follow my adventures around the world.

## Entries

<ul>{% for post in collections.travel %}{% if post.url != page.url %}<li><a href="{{ post.url }}">{{ post.data.title }}</a> - {{ post.date | dateDisplay }}</li>{% endif %}{% endfor %}</ul>

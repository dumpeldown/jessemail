---
layout: layouts/base.njk
title: Travel Journal
date: 2026-03-14T00:26:00.000+01:00
tags: []
---

# Travel Diary

Follow our adventures around the world.

## Where we have been lately

<ul>{% for post in collections.travel %}{% if post.url != page.url %}<li><a href="{{ post.url }}">{{ post.data.title }}</a> - {{ post.date | dateDisplay }}</li>{% endif %}{% endfor %}</ul>

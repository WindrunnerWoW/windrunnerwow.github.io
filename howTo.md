# How to add a roadmap milestone

## 1. Add the milestone images

Place your images somewhere inside `static/art/`. For example:

```text
static/art/roadmap/my-milestone.webp
static/art/roadmap/my-milestone-gallery.webp
```

On the website, these files are referenced without `static`, such as
`/art/roadmap/my-milestone.webp`.

## 2. Add an entry to the roadmap

Open `src/lib/data/roadmap.ts` and add a new object to the `roadmap` array:

```ts
{
  status: 'planned',
  marker: 'Phase 3',
  title: 'My new milestone',
  when: 'TBD',
  summary: 'A short description of what this milestone adds to Windrunner.',
  images: [
    { src: '/art/roadmap/my-milestone.webp', alt: 'Description of the cover image' },
    {
      src: '/art/roadmap/my-milestone-gallery.webp',
      alt: 'Description of the gallery image'
    }
  ],
  items: [
    'First feature included in this milestone',
    'Second feature included in this milestone'
  ]
},
```

The first image is the milestone's large cover. Any additional images appear in
its expandable gallery. `marker`, `when`, `images`, and `items` are optional.

## 3. Choose its status and position

Use one of these status values:

- `completed` - already released; displays a checkmark
- `now` - currently being worked on
- `next` - lined up after the current work
- `planned` - scoped but not started
- `horizon` - a longer-term direction without a firm date

Place the object where it belongs in the array. The page uses the same order as
the array: completed milestones first, followed by current and future work.

## 4. Check the page

Save the file and open [the local roadmap](http://localhost:5174/roadmap).
Confirm that the cover loads, the text is correct, and the milestone expands to
show its extra images and feature list.

---

# How to add a news article

## 1. Copy the news template

Copy `src/lib/content/news/_template.md` in the same folder and rename the copy
to a URL-friendly filename, for example:

```text
src/lib/content/news/karazhan-preview.md
```

The filename becomes the article URL: `/news/karazhan-preview`.

## 2. Fill in the article information

Update the frontmatter at the top of the copied file:

```md
---
title: "A first look at Karazhan"
date: "2026-09-20"
description: "A short summary shown on the news page and homepage."
category: "Development"
author: "Windrunner"
tags: "devlog, karazhan"
image: "/art/news/karazhan-cover.webp"
---
```

Use the `YYYY-MM-DD` format for the date. `author` and `tags` are optional, but
`title`, `date`, `description`, and `category` should always be filled in.

## 3. Add a cover image

`image` is the article cover. Put the file in `static/art/news/` and reference it
without `static`:

```md
image: "/art/news/karazhan-cover.webp"
```

That one field is used as:

- the full-bleed hero background behind the article title
- the thumbnail on the homepage news cards
- the thumbnail on the `/news` list
- the image in `/rss.xml` for the launcher (`enclosure`, `media:content`,
  `media:thumbnail`, and an `<img>` at the top of `content:encoded`)

Leave `image` out if the post has no cover. Cards then stay text-only; they do
not show an empty placeholder box.

## 4. Write the article and add inline images

Write the article below the frontmatter using Markdown headings, lists, links,
bold text, and images. Inline images in the body are separate from the cover.
Put those files in `static/art/news/` as well:

```md
## A section heading

Write the section text here.

![Karazhan at night](/art/news/karazhan-at-night.webp)
```

The title heading inside the article is optional because the page already shows
the title from the frontmatter.

## 5. Check the article

Save the file and open [the local news page](http://localhost:5174/news). The
new article is discovered automatically and sorted by date, so no other file
needs to be updated. Check:

- the article header, title, summary, formatting, links, and inline images
- the homepage Latest updates card
- the `/news` list thumbnail
- `/rss.xml` for the cover URL if the launcher needs it

---

# How to add a changelog entry

## 1. Open the changelog data file

Open `src/lib/data/changelog.ts`. Changelogs are stored as objects inside the
`changelog` array rather than as separate Markdown files.

## 2. Add the newest entry at the top

Copy this example and place it at the beginning of the array:

```ts
{
  version: '0.2.0',
  date: 'October 1, 2026',
  summary: 'A short overview of the release for its archive card.',
  sections: [
    {
      title: 'General',
      items: [
        'First change players should know about.',
        'Second change players should know about.'
      ]
    },
    {
      title: 'Professions',
      subsections: [
        {
          title: 'Jewelcrafting',
          items: ['Describe the Jewelcrafting change here.']
        }
      ]
    }
  ]
},
```

- `version` is the large release name and is also used to create the page URL.
- `date` is displayed exactly as written on the archive card and release page.
- `summary` is the short introduction shown on both views.
- `sections` creates the named patch-note categories, such as General, Classes,
  Professions, User Interface, and Bug Fixes.
- Each section can contain an `items` list, optional `subsections`, or both.
- Every string inside an `items` list becomes a bullet point.

Keep the newest entry at the top because changelogs are displayed in array
order; they are not sorted automatically.

## 3. Check the changelog

Save the file and open [the local changelog](http://localhost:5174/changelog).
The entry appears automatically as a new archive card. Open it to check its
individual release page, patch notes, and opening/closing transition. For
example, version `0.2.0` receives the URL `/changelog/0-2-0`.

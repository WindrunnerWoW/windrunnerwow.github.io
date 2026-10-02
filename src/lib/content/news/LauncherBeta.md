---
title: "The Windrunner Launcher"
date: "2026-10-02"
description: "One file, one Play button. Client, mods, updates and a whole server, running on your own machine, from one folder you can put on a USB stick."
category: "Launcher"
author: "WrkX"
tags: "launcher, client, server, release"
image: "/art/news/launcher_release.webp"
discussion: "17"
---

# [DOWNLOAD](https://github.com/WindrunnerWoW/windrunner-launcher/releases)


I have been talking about this since [Release 1.18.2](/news/1182), when I very helpfully told you to download the files, get the maps, drop in the config, patch the client, and trust me that it works. It does work. It also takes twenty minutes, a good mood, a tutorial and I am not interested in doing that myself tbh.

So here is the short version: you download the launcher, you put it somewhere,start it, (wait a little for it to set everything up) you press Play. It figures out the rest.

## What it does for you

**The client.** It downloads the game for you and keeps it updated afterwards. No more hunting for a patch folder that someone (me) uploaded on github.

**The mods.** Community mods and the VanillaTweaks settings live in one panel. Turn something off because it annoys you, turn it back on next week, it is still there. Nothing gets thrown away behind your back.

**Addons** Use the launcher to update addons, install new ones, etc. etc.

**The server.** The whole thing, on your machine. It starts it up, it shuts it down, it saves the world when you are done playing. You can create your account in there, update the server when I release version 1.18.3 (soon™).

**The updates.** Server updates, client updates and the launcher itself, in one place. And if an update goes wrong, it puts everything back the way it was instead of leaving you with a broken install and a bad evening.

## The one button

There is exactly one button...  you know of course there are more buttons, but there's one important button... and that's almost all you need.

Pick a realm when it asks. `Windrunner` is your own server. Play -> THATS IT!

Or if you wanna play with your friends, just add a realm with its IP into the list and connect to it too.

## It stays where you put it

The launcher does not install itself into Windows. It does not write into your user folders (unless you use Linux), it does not touch the registry, it does not leave a service running after you close it. Everything it needs is in the folder it sits in, which means that folder can be a USB stick, a second hard drive, or the desktop of a laptop you do not use that often.

It also does not report anything back. Because what the fuck woul I do with that...

If you ever want it gone, you delete the folder. That is the entire uninstall process.

## BETA DISCLAIMER

It works for me. That does not mean it has to work for you, and that goes double for Linux, which I have barely tested. I ran it in a virtual machine, found nothing wrong, and as any of you who have played on my server for more than a week knows, "found nothing" in a virtual machine is not the same as "works".

On Linux it is an AppImage, but still, who knows what your system will make of it.

So yes, this is a beta. Things will break, and I will fix them as fast as I can. The client mods are the worst offenders right now, not all of them behave yet. I know about them and I am going through them one by one.

If something is broken on your machine, tell me in the discussion.

## Why I built it

Some background, since people do not keep asking about the launcher and I have mostly been dodging the non existant question.

I have watched a none of you install this server by hand. Download this, extract there, move these three files, get the maps, get the database, find the config, patch the client, pray. And then do all of it again three months later, because something was out of date and the changelog only said "server files updated".

That is not what I wanted. Singleplayer should mean I start my pc, hit play and I am playing, not that I am re-assembling a repack every time the server moves. So the launcher does the boring part. It knows what the client is supposed to look like, it knows where the mods go, it knows what a server update needs to touch. None of that is your job anymore. If something is missing or something downloaded badly, you can repair the world db or the client.

The server side is the part I am happiest about. There is a real server in there, database and all, it runs while you play, and it saves the world when you close it. You are not installing a service or hand-editing a config, and you are not getting a mysterious black box that happens to be playable.

Updates get backed up before they happen. So the launcher takes a copy first, and if something breaks, it rolls back and tells you what happened. A bad patch should cost you a click, not your night. Also, of course, back up the server yourself manually.

The release goes up on [GitHub](https://github.com/WindrunnerWoW/windrunner-launcher). If something breaks, if something is confusing, or if you would rather have a feature that does not exist yet, tell me in the discussion.



Much love!
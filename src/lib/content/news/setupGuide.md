---
title: "The easy starter Guide"
date: "2026-10-19"
description: "A guide to get started with your own singleplayer server & how to use the launcher"
category: "Guide"
author: "WrkX"
tags: "guide, server, launcher"
image: "/art/news/setupGuide.webp"
discussion: "31"
---

## How to set up your own Windrunner Server

Luckily for you, I already have the launcher. That thing basically does everything for you. But why do I still create this guide?
Well because I know people and I know someone will have problems. Someone will not understand what the options do. So I will give you a short guide on how to set up your server and what the launcher can do apart from setting up the server.

## Setting up Windrunner

On the [home page](/) you will find the download button. ![](/art/news/setupGuide/setupGuide1.webp)

Clicking the Download button will download the launcher for your OS.

*Keep in mind that Linux is not 100% supported and tested right now, but I'm working on that. You can still try to use the launcher but I cannot guarantee that it works right now.*

After downloading, drag the `.exe` into a folder wherever you would like to start your server from in the future. I advise you not to do it on the desktop itself but to create a folder for it because the launcher will download and create multiple subdirectories and I doubt that you would like to have all those folders and files on your desktop. So in this example, I create the folder Windrunner for it. And then all you have to do is simply double-click the `.exe` and it will guide you through the setup.


![](/art/news/setupGuide/setupGuide2.webp)


After starting, you will be greeted by this:
![](/art/news/setupGuide/setupGuide3.webp)

If you know someone who wants to host the server and you just wanna play on his server, select `Client only`, otherwise use the default. 

If you already have the correct client (e.g. do not use the ones Ravencraft, Capycraft or OctoWoW provide), you can use an existing client, otherwise use the `Download a known clean base client`. The managed copy would create a copy of an existing client.

After that press `Continue`. It will fetch the client and the maps, and create all the folders after download. Right after, it will set up the server. 

![](/art/news/setupGuide/setupGuide4.webp)

You will basically just have to wait until all the bars are filled up and until the server tells you that it's ready. The first launch will take longer than every consecutive one because all the SQL migrations run on the first start, so keep in mind it could take up to like an hour depending on how fast your PC is. After that, you will be asked to create an account. Enter an account name and password, create the account and you are good to go. You can, at any time, create more accounts in the `Server` tab.

## The Launcher

Now that you know more about how to set up the server, let's talk about the launcher's features.

### Home

Home shows the need-to-know stuff. 
1. The Auth, Server and DB Status.
2. Selected Realm. If you wanna play on your friend's server, you can use the `+` button to add another server's IP. The cogwheel allows you to set realm-specific settings.
3. News from the Realm. Fetches the newest News from windrunnerwow.github.io. 
4. While empty in the picture, server updates will be displayed here and you can download them. 
5. Your best friend from now on. Play starts the server and launches the client as soon as the server is ready. Should an update add additional SQL migrations, they will be applied. If the button says Update, it will download an updated client patch.

![](/art/news/setupGuide/setupGuide_home.webp)

### Client
This is where you can download client mods, manage addons and Client MPQ files.
1. Client Mods, like VanillaTweaks, MultiMonitorFix, etc. They get auto-applied and edit the needed .txt files. Auto-rollback on error, backed-up `.exe` in case you destroy it. In case of e.g. MultiMonitorFix, it will also dynamically update the monitor ID in the needed .txt file.
2. Addons. A few are already in there by default, like the Windrunner-Voiceover addon and its data. You can add as many as you want, keep em updated and disable/enable them here.
3. Client MPQ Files that are not the base ones needed for Windrunner. Should you decide to use MY client to play on other servers with other MPQs, you can disable/enable them per server here.
![](/art/news/setupGuide/setupGuide_client.webp)

#### Addons
Pretty simple to use, press `Install` to install an addon and `Remove` to delete it. The orange `+ Add addon` button will allow you to use a GitHub URL to track addons and download them off of GitHub.
![](/art/news/setupGuide/setupGuide_addons.webp)


### Server
1. Here you can see the console windows of DB, Auth server and world server. 
2. Settings for the server itself. Realm name, address (if you wanna host for your friends), and port. Also, the option to create additional accounts, change the password or GM level of an existing account and the option to start/stop the server.
3. Server version and latest server version on GitHub. Option to update.
4. Here you can back up your server and accounts/characters. This is done on server update, in case something goes wrong, but you can do it manually here.
![](/art/news/setupGuide/setupGuide_server.webp)


### Settings
1. Settings for the launcher. Language (currently only English), the option to toggle the Windrunner text at the top left, the option to toggle the news on the homepage, optional light mode and a few AI-generated alternate backgrounds. If you are an artist and would like your stuff to replace the AI Art, feel free to reach out.
2. Game path and the option to download a fresh client.
3. Repair/reset the client in case it breaks.
4. Wipe and restore a fresh world db. Shouldn't ever be needed, but who knows what happens.
![](/art/news/setupGuide/setupGuide_settings1.webp)

And then here, 
1. GitHub sign-in, to get around the rate limits.
2. The possibility to update the launcher and the possibility to ignore a version.
![](/art/news/setupGuide/setupGuide_settings2.webp)

Sooooo, this is it. If you have any questions, hit me up on the Discord server or ask in the discussion below.

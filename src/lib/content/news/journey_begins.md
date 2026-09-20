---
title: "The singleplayer journey begins"
date: "2026-09-19"
description: "Windrunner now has a public home. This site is where we will post development updates, patch notes, feature documentation etc. etc."
category: "Welcome"
image: "/art/news/start_journey.webp"
---

# The singleplayer journey begins

## Why

*"Ay Loser, WoW Forever just entered Beta, we have 2 Servers from the old devs, they DDoS the living shit out of the 3rd. What is this about, what are you doing? Also, who the fuck wants a singleplayer game anyway? And aren't there already like 5 of these? Fuckin' Vibe Coders these days..."*

Well, let's go over this:

### WoW Forever

I don't trust Blizzard to fix any of the problems and mistakes they make all the time. Let's look at this. 

They still don't have customer support, so as soon as the bots start mass reporting people they are gonna get banned again? 

I doubt they fixed the reporting system. And oh, you got banned? Good luck getting unbanned because who would to that? The CS AI repsonds that there is nothing that can be done. Unless you blow up on reddit you are fuck'd. 

Most of the devs who created the incredible game we still love today are gone. The people doing that now create retail WoW or re-release Classic -> TBC -> WotLK. SoD was great, sure, but saying it was without problems would be a lie, too. And let's not start with the bot problem we will face. They are already going wild in the beta, but sure, they are paying customers; why would Blizzard ban them in time, when they have the track record of doing a banwave every 6 years...

Oh and A MEGA-MEGASERVER? WTF?! As if queue times arent bad on the "normal" megaservers already. ONE SERVER? Ye, big doubt they will make it work. Imagine you have 1h to play after wifey went to bed and at the end of the hour you are in Q position 150375. 

Pay-to-win? Not planned **for now**. But let us be real here. The dev time is not free. I doubt that they will keep it this way. If it is not successfull or people drop out -> the need money to keep going. If it is successfull -> they want the easy money. No way they are not gonna take advantage of this.

And this is just the tip of the iceberg. Most people do not play on private servers because it is free, but because they do not want to pay for a worse alternative.

I might sound overly negative here, do not get me wrong, I love that they are doing this. And I am happy for whoever enjoys this (and for the ideas I can copy), but I do not trust their decision making and I hate that they are just moneygreeding the living fuck out of this game.

### Ravencraft, Capybara Paradise, OctoWoW

Mad respect for OctoWoW, they try their best even though they get f'd pretty hard. The others I do not give a shit about. But they do have a problem that can basically never happen to you, when playing your own Windrunner Server. They can be shut down. 

I mean, if NetEase wants to, they can probably take down Capybara Paradise. 

And Ravencraft could potentially have the same future as Turtle WoW did. 

**A server on your own hardware, only open to you? Good luck Blizzard.**

### A Singleplayer? It's an MMO? Who wants that?

Me. I want to play it. I don't like people. I hate playing with em. 

I hate having to hope my group has the mental capacity to press the 3 buttons in their easy rotation. I stopped raiding in Retail because of that and I stopped raiding in WotLK Classic when it 
started to bother me again. I don't play M+ in Retail because people are stupid. I cannot stand them. If the bots suck, I can improve em. Can't do that for players. 

Also, I like being able to do everything I want when **I WANT TO DO IT**. I want to raid at 07:45 AM?
No Problem. 

### The other singleplayer projects

Sure, others exist. And that is great. But so far, all I have seen was the [restoration of 1.18.1](https://github.com/tortoise-wow/tortoise-wow) and a [fork with playerbots](https://github.com/Shyalya/tortoise-wow) included. And then of course forks that automate installation for Steam Decks or what not.

My work is based on Shyalya's fork, but it will be archived on 30 September. 

I am continuously merging Penqles work into mine, while keeping my own focus on making it a better singleplayer experience. You can already see that with the [changelog for 1.18.2](/changelog) and with what I intend to do in the [future](/roadmap). All of these changes will of course be [open source](https://github.com/WindrunnerWoW), so everyone can use them however one would want. 

### AI Disclaimer

Now people will be shouting and cursing. Yes, I used AI. A lot. Of the things **I** did, like 90% are AI generated. The changes by the other forks are probably the same amount (or more). But here is the caveat:

My custom modules were ported over from Azerothcore modules, that were created before AI was any usable. They are not on github, but a selfhosted Gitlab instance, so you cannot check for yourself, but you can check out my old fork works. I still have one vmangos core fork public, where some of my changes came (and come) from. So I have been doing this for quite some time. As soon as the old porting work is done, I will start writing myself again. But for now, changing core and lua versions etc. would take too long, especially as the logic already works and is easy to port. So AI was perfect for that. 

Oh, and of course Artwork. People will be mad about that, too. Yes, everything that is not a screenshot, stuff copied from Turtle WoW website or mentioned in the [Stole Assets](/stolen-assets) section was probably AI generated. 

Of course I would have loved to do that myself or pay someone to do it. But this is a hobby project. And I am by no means creative or skilled in anything arty. So, get mad as much as you want, call me out for being the death of artists, because ChatGPT used their art to train their models. I don't give a fuck. It's either this or no images. 

## What comes next

Now that my 'ranting' is done, what comes next?

1.18.2, my first patch, will come out soon™. I have a [roadmap](/roadmap) for everything major I have planned for now, but things might change. 

New ideas are welcome, just hit me up. If I think it is a good addition, I might add it to the roadmap (or make small changes immediately). You can of course also fork it and add it yourself. Just don't create a PR, it will get autoclosed. I will only whitelist people if I think they know what they are doing.

Working changes will be on the patch branches, so you can test out anything immediately. GitHub releases are created when the patch is complete. So either wait for a release or build the server yourself.

That's it for now! Enjoy your time, have fun and stay healthy guys and gals.

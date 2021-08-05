Micrologue
==========

Micrologue is an interactive fiction (text based adventure) engine focused on dialogues between the player and a number of NPCs (Non Player Characters). These dialogues are simple, a number of NPCs say their lines, then the player is given options to respond. After the player chooses a response, the NPCs respond and the cycle starts anew. This method is known as stretch-text.

If your game doesn't fit into this mold, I suggest looking into [Twine](https://twinery.org/). [Here is a megalist of Twine resources.](https://twinelab.net/twine-resources/#/) Remember, micrologue is a standalone engine, not a Twine format. If you are interested in a Twine format that does something similar to micrologue, I suggest checking out [trialogue](https://github.com/phivk/trialogue)

If you don't have any coding experience, this should still be easy to use.

If you have a lot of coding expertise, the fact that this is written in raw javascript means that it should be flexible and extensible, though depending on your need [Twine](https://twinery.org/) might still be better.

Demo Game
---------

Go to the releases section on the right, download `release.zip` from the latest release, unzip it, and open `index.html` to see the demo game.

Guide for Beginners
-------------------

Instructions for those who want to use micrologue to make their own game, but don't have much coding skill.

Download `release.zip` and unzip it. To make your own game, you should edit `configuration.js`, `speakers.css`, and `passages.js`. When you've made the edits you want, open `index.html` to see your game in action.

 - `configuration.js` has a variety of game settings and simple tweaks.
 - `speakers.css` allows you to change the colors for the various speakers.
 - `passages.js` lets you write the actual passages that go into your game. There is some commenting within the file that should hopefully help you along. The first two passages are examples of the simple features, after that the passages show off some of the advanced features.

Advanced Guide
--------------

 - Rather than using the zipped release, I suggest cloning this repository and using a typescript compiler to compile the js files. Typescript will tell you if your passage is in the wrong format.
 - I suggest zettelkasten programs like [Obsidian](https://obsidian.md/) for prototyping and viewing projects like this.
 - You can use the js hooks and state variables to modify your game based on whether the player has visited certain passages etc.
   - For example, in `passages.ts` you can add a variable called `hasPlayerVisitedPassageX`, and then in passage X you can create an `onEnter` hook like `onEnter: () => hasPlayerVisitedPassageX = true` to keep track.
 - Remember that the browser console exists. At the moment it's not heavily utilized, but you can certainly use it to print developer only stuff. [Link to instructions on how to open developer tools.](https://grantwinney.com/how-do-i-view-the-dev-console-in-my-browser/) Once you've opened dev tools, go to the tab that says "console"

Features
--------

 - Branching narrative, ala Twine
   - Passages are read out, then the user chooses which passage to go to next.
 - Stretch text format
 - Multiple speakers, each with their own css
 - js hooks to run arbitrary js code on passage entry, on passage render finish, and on passage exit.
   - These hooks can be used to modify state variables
 - js hooks to allow passages to be hidden or shown depending on state
 - Autolinks, allowing you to jump from passage to passage without user interaction
 - This is a small, open source project, so it can be modified to fit any use case.

Documentation
=============

This formal documentation exists as a reference, but for beginners to micrologue, it would be better to read the comments in `passages.js` for examples of the features and how to use them.

### passages

`passages` is an object mapping passage titles to `passage` objects. This object contains the entirety of the story text and most of the story code.

### passage

passage is an object type that necessarily holds the following variables:

 - utterances (`utterance[]`)
   - list of utterance objects that are rendered in order when the passage is rendered.
 - links (`link[]`)
   - list of link objects that are rendered in order after utterances are rendered. Ignored if `autoLink` returns a non-empty string.

Furthermore, it optionally holds the following variables:

 - onEnter (`() => void`)
   - function called upon entering the passage
 - onLinkRender (`() => void`)
   - function called when links are rendered
 - onExit (`() => void`)
   - function called when passage is exited
 - autoLink (`() => string`)
   - After all utterances are rendered, the passage returned by autolink will be rendered without any player input. No links will be rendered *unless autoLink returns an empty string, in which case links will be rendered like normal*
 - ignoreDebug (`boolean`)
   - if true, debugging warnings will be disabled for this passage.

### utterance

utterance is an object type that necessarily holds the following variables:

 - speaker (`string`)
   - Name of the speaker. When this utterance is rendered, the `<p>` tag's class will be the speaker name, allowing custom css to be applied on a speaker by speaker basis.
 - text (`string`)
   - The text of the utterance

Furthermore, it optionally holds the following variables:

 - showUtterance (`() => boolean`)
   - function, if true this will show utterance, if false the utterance will not be rendered.
 - dynamicText (`() => string`)
   - the text returned by this function will be rendered. **Overrides text**
 - noTypewriter (`boolean`)
   - if true, this utterance will be rendered without typewriter effect. If false, utterance will be rendered normally. To disable typewriter effect for all utterances, set `doTypewriterEffect` in `configuration.ts / configuration.js`
 - additionalDelay (`() => number`)
   - Delay an additional amount after this passage is rendered. The variable `delay` contains the user chosen text speed.

### link

link is an object type that necessarily holds the following variables:

 - text (`string`)
   - The text of the link
 - passageTitle (`string`)
   - Upon clicking this link, the passage with title `passageTitle` will be rendered.

Furthermore, it optionally holds the following variables:

 - showLink (`() => boolean`)
   - function, if true the link will be rendered, if false then it will not be rendered.
 - dynamicText (`() => boolean`)
   - the text returned by this function will be rendered. **Overrides text**
 - onLinkClick (`() => void`)
   - function run on link click
 - dynamicReference (`() => string`)
   - the passage title returned by this function will be rendered. **Overrides `passageTitle`**
 - ignoreDebug (`boolean`)
   - if true, debugging warnings will be disabled for this link.

TODO
----

 - Make graph exporter

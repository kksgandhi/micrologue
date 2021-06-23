Micrologue
==========

Micrologue is an interactive fiction (text based adventure) engine focused on dialogues between the player and a number of NPCs (Non Player Characters). These dialogues are simple, a number of NPCs say their lines, then the player is given options to respond. After the player chooses a response, the NPCs respond and the cycle starts anew. This method is known as stretch-text.

If your game doesn't fit into this mold, I suggest looking into [Twine](https://twinery.org/). [Here is a megalist of Twine resources.](https://twinelab.net/twine-resources/#/) Remember, micrologue is a standalone engine, not a Twine format. If you are interested in a Twine format that does something similar to micrologue, I suggest checking out [trialogue](https://github.com/phivk/trialogue)

If you don't have any coding experience, this should still be easy to use.

If you have a lot of coding expertise, the fact that this is written in raw javascript means that it should be flexible and extensible, though depending on your need [Twine](https://twinery.org/) might still be better.

Beginner's Guide
----------------

Instructions for those who just want to check out the project, or don't have much coding skill.

Go to the releases section on the right, download `release.zip` from the latest release, unzip it, and open `index.html` to see the demo game.

 - You can change `<title>` in `index.html` to give your story a new title
 - You can change `solarized-dark` to `solarized-light` in index.html to change the colorscheme from light to dark.
 - You can change the colors for the various speakers in `speakers.css`
 - There are a couple of customization options in `configuration.js`

To actually write your own text, open `passages.js`. There is some commenting within the file that should hopefully help you along. The first two passages are examples of the simple features, after that the passages show off some of the advanced features.

Advanced Guide
--------------

Rather than using the zipped release, I suggest cloning this repository and using a typescript compiler to compile the js files. Typescript will tell you if your passage is in the wrong format.

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

To actually understand how to use these features, open `passages.js` and read the comments therein.

The "speaker name" parameter in passages sets the class of the `<p>`, so you can apply whatever css you want to it.

TODO
----

 - Find a way to export to a single minified file
 - Add light / dark mode switch
 - Allow player to choose text speed
 - Image support

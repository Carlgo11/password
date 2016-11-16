# Password generator

This is a simple password-generating site designed to offer more random passwords than the mainstream password generators currently available.

## Why JavaScript?

There are several reasons for choosing to use JS to generate passwords with. One is that the generation is done locally and so it doesn't have to be transmitted over the web or handled at all by the webserver.  
This is great news if you want to make sure the webhost can't store the generated passwords from the site.

## What is Unicode and why use it?

Unicode is a industry standard for encoding of characters. Basically all characters are implemented in the Unicode standard. This allows for far more random passwords as the selection is far greater than a normal English langauge, _(a-Z 0-9)_, password.

The `Unicode characters` checkbox allows the script to choose one of the non-ASCII characters between U+161 and U+9999.<br>
_(Note that this is not all possible Unicode characters as there currently are over 120K characters.)_

The downside of using the such characters is that some sites with bad password-storing-implementation might not accept the password or might break the password while storing it.

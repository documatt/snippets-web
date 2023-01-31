###############
Sample document
###############

.. epigraph:: This document demonstrate reStructuredText syntax. Professional books and tech documentation are plain text files written with this easy markup language. Documatt Snippets is online editor with preview useful for learning and testing reStructuredText without installing it.

.. tip:: The following text shows just a very little of reStructuredText. For more examples and description of reStructuredText see for example https://documatt.com/restructuredtext-reference/.

***************
Inline elements
***************

Paragraphs may contain *emphasised*, **strong emphasised** words. Links to external webs like https://documatt.com/blog/ are auto-recognized. Sometimes you need ``monospaced text``. Useful are also :sup:`superscript` or :sub:`subscript`.

******
Images
******

.. image:: https://documatt.com/blog/_static/open-doodles-clumsy.svg

*****
Lists
*****

Unordered lists usually use ``*`` as bullet symbol:

* A bullet list item
* Second item
* A sub item

Ordered (enumerated) lists that is auto-numbered starts with ``#.``:

#. one
#. two
#. three

*********************
Showing code examples
*********************

It's easy to show code parts with ``inline literal``, or literal block::

  some literal text

Or, literal block with syntax highlighting:

.. code-block:: javascript

   for (let i = 0; i < 3; i++) {        // shows 0, then 1, then 2
       alert(i);
   }

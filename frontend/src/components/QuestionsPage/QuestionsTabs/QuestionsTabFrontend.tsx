import React, { Fragment } from 'react';
import FontAwesome from 'react-fontawesome';

const QuestionsTabFrontend = () => (
  <Fragment>
    <h1>
      <a
        href="https://github.com/h5bp/Front-end-Developer-Interview-Questions"
        target="_blank"
        rel="noopener noreferrer">
        <FontAwesome name="link" />
      </a>{' '}
      Front-end Job Interview Questions
    </h1>

    <p>
      Here below you may find only the most popular and interesting questions
      from GitHub H5BP. All others are in the direct page.
    </p>

    <h3>General Questions:</h3>

    <ul>
      <li>What did you learn yesterday/this week?</li>
      <li>What excites or interests you about coding?</li>
      <li>
        What is a recent technical challenge you experienced and how did you
        solve it?
      </li>
      <li>
        What UI, Security, Performance, SEO, Maintainability or Technology
        considerations do you make while building a web application or site?
      </li>
      <li>Talk about your preferred development environment.</li>
      <li>Which version control systems are you familiar with?</li>
      <li>Can you describe your workflow when you create a web page?</li>
      <li>
        If you have 5 different stylesheets, how would you best integrate them
        into the site?
      </li>
      <li>
        Can you describe the difference between progressive enhancement and
        graceful degradation?
      </li>
      <li>How would you optimize a website&apos;s assets/resources?</li>
      <li>
        Name 3 ways to decrease page load (perceived or actual load time).
      </li>
      <li>
        If you jumped on a project and they used tabs and you used spaces, what
        would you do?
      </li>
      <li>Describe how you would create a simple slideshow page.</li>
      <li>If you could master one technology this year, what would it be?</li>
      <li>Explain the importance of standards and standards bodies.</li>
      <li>What is Flash of Unstyled Content? How do you avoid FOUC?</li>
      <li>
        Explain what ARIA and screenreaders are, and how to make a website
        accessible.
      </li>
      <li>
        Explain some of the pros and cons for CSS animations versus JavaScript
        animations.
      </li>
      <li>What does CORS stand for and what issue does it address?</li>
    </ul>

    <h3>HTML Questions:</h3>

    <ul>
      <li>
        What does a<code>doctype</code> do?
      </li>
      <li>
        What&apos;s the difference between full standards mode, almost standards
        mode and quirks mode?
      </li>
      <li>What&apos;s the difference between HTML and XHTML?</li>
      <li>
        Are there any problems with serving pages as
        <code>application/xhtml+xml</code>?
      </li>
      <li>How do you serve a page with content in multiple languages?</li>
      <li>
        What kind of things must you be wary of when design or developing for
        multilingual sites?
      </li>
      <li>
        What are
        <code>data-</code> attributes good for?
      </li>
      <li>
        Consider HTML5 as an open web platform. What are the building blocks of
        HTML5?
      </li>
      <li>
        Describe the difference between a<code>cookie</code>,
        <code>sessionStorage</code> and
        <code>localStorage</code>.
      </li>
      <li>
        Describe the difference between
        <code>&lt;script&gt;</code>,<code>&lt;script async&gt;</code> and
        <code>&lt;script defer&gt;</code>.
      </li>
      <li>
        Why is it generally a good idea to position CSS
        <code>&lt;link&gt;</code>s between
        <code>&lt;head&gt;&lt;/head&gt;</code> and JS
        <code>&lt;script&gt;</code>s just before
        <code>&lt;/body&gt;</code>? Do you know any exceptions?
      </li>
      <li>What is progressive rendering?</li>
      <li>Have you used different HTML templating languages before?</li>
    </ul>

    <h3>CSS Questions:</h3>

    <ul>
      <li>What is the difference between classes and IDs in CSS?</li>
      <li>
        What&apos;s the difference between &quot;resetting&quot; and
        &quot;normalizing&quot; CSS? Which would you choose, and why?
      </li>
      <li>Describe Floats and how they work.</li>
      <li>Describe z-index and how stacking context is formed.</li>
      <li>Describe BFC(Block Formatting Context) and how it works.</li>
      <li>
        What are the various clearing techniques and which is appropriate for
        what context?
      </li>
      <li>
        Explain CSS sprites, and how you would implement them on a page or site.
      </li>
      <li>
        What are your favourite image replacement techniques and which do you
        use when?
      </li>
      <li>How would you approach fixing browser-specific styling issues?</li>
      <li>
        How do you serve your pages for feature-constrained browsers?
        <ul>
          <li>What techniques/processes do you use?</li>
        </ul>
      </li>
      <li>
        What are the different ways to visually hide content (and make it
        available only for screen readers)?
      </li>
      <li>Have you ever used a grid system, and if so, what do you prefer?</li>
      <li>
        Have you used or implemented media queries or mobile specific
        layouts/CSS?
      </li>
      <li>Are you familiar with styling SVG?</li>
      <li>How do you optimize your webpages for print?</li>
      <li>What are some of the gotchas for writing efficient CSS?</li>
      <li>
        What are the advantages/disadvantages of using CSS preprocessors?
        <ul>
          <li>
            Describe what you like and dislike about the CSS preprocessors you
            have used.
          </li>
        </ul>
      </li>
      <li>
        How would you implement a web design comp that uses non-standard fonts?
      </li>
      <li>
        Explain how a browser determines what elements match a CSS selector.
      </li>
      <li>Describe pseudo-elements and discuss what they are used for.</li>
      <li>
        Explain your understanding of the box model and how you would tell the
        browser in CSS to render your layout in different box models.
      </li>
      <li>
        What does
        <code>box-sizing: border-box;</code> do? What are its advantages?
      </li>
      <li>
        List as many values for the display property that you can remember.
      </li>
      <li>What&apos;s the difference between inline and inline-block?</li>
      <li>
        What*apos;s the difference between a relative, fixed, absolute and
        statically positioned element?
      </li>
      <li>
        The *apos;C&apos; in CSS stands for Cascading. How is priority
        determined in assigning styles (a few examples)? How can you use this
        system to your advantage?
      </li>
      <li>
        What existing CSS frameworks have you used locally, or in production?
        How would you change/improve them?
      </li>
      <li>Have you played around with the new CSS Flexbox or Grid specs?</li>
      <li>How is responsive design different from adaptive design?</li>
      <li>
        Have you ever worked with retina graphics? If so, when and what
        techniques did you use?
      </li>
      <li>
        Is there any reason you&apos;d want to use
        <code>translate()</code> instead of
        <em>absolute positioning</em>, or vice-versa? And why?
      </li>
    </ul>

    <h3>JS Questions:</h3>

    <ul>
      <li>Explain event delegation</li>
      <li>
        Explain how
        <code>this</code> works in JavaScript
      </li>
      <li>Explain how prototypal inheritance works</li>
      <li>What do you think of AMD vs CommonJS?</li>
      <li>
        Explain why the following doesn&apos;t work as an IIFE:
        <code>
          function foo()
          {}
          ();
        </code>
        .
        <ul>
          <li>What needs to be changed to properly make it an IIFE?</li>
        </ul>
      </li>
      <li>
        What&apos;s the difference between a variable that is:
        <code>null</code>,<code>undefined</code> or undeclared?
        <ul>
          <li>How would you go about checking for any of these states?</li>
        </ul>
      </li>
      <li>What is a closure, and how/why would you use one?</li>
      <li>What&apos;s a typical use case for anonymous functions?</li>
      <li>
        How do you organize your code? (module pattern, classical inheritance?)
      </li>
      <li>
        What&apos;s the difference between host objects and native objects?
      </li>
      <li>
        Difference between:
        <code>
          function Person()
          {}
        </code>
        ,<code>var person = Person()</code>, and
        <code>var person = new Person()</code>?
      </li>
      <li>
        What&apos;s the difference between
        <code>.call</code> and
        <code>.apply</code>?
      </li>
      <li>
        Explain
        <code>Function.prototype.bind</code>.
      </li>
      <li>
        When would you use
        <code>document.write()</code>?
      </li>
      <li>
        What&apos;s the difference between feature detection, feature inference,
        and using the UA string?
      </li>
      <li>Explain Ajax in as much detail as possible.</li>
      <li>What are the advantages and disadvantages of using Ajax?</li>
      <li>Explain how JSONP works (and how it&apos;s not really Ajax).</li>
      <li>
        Have you ever used JavaScript templating?
        <ul>
          <li>If so, what libraries have you used?</li>
        </ul>
      </li>
      <li>Explain hoisting.</li>
      <li>Describe event bubbling.</li>
      <li>
        What&apos;s the difference between an &quot;attribute&quot; and a
        &quot;property&quot;?
      </li>
      <li>Why is extending built-in JavaScript objects not a good idea?</li>
      <li>
        Difference between document load event and document DOMContentLoaded
        event?
      </li>
      <li>
        What is the difference between
        <code>==</code> and
        <code>===</code>?
      </li>
      <li>Explain the same-origin policy with regards to JavaScript.</li>
      <li>
        Why is it called a Ternary expression, what does the word
        &quot;Ternary&quot; indicate?
      </li>
      <li>
        What is
        <code>&apos;use strict&apos;;</code>? what are the advantages and
        disadvantages to using it?
      </li>
      <li>
        Create a for loop that iterates up to
        <code>100</code> while outputting
        <strong>&apos;fizz&apos;</strong> at multiples of
        <code>3</code>,<strong>&apos;buzz&apos;</strong> at multiples of
        <code>5</code> and
        <strong>&apos;fizzbuzz&apos;</strong> at multiples of
        <code>3</code> and
        <code>5</code>
      </li>
      <li>
        Why is it, in general, a good idea to leave the global scope of a
        website as-is and never touch it?
      </li>
      <li>
        Why would you use something like the
        <code>load</code> event? Does this event have disadvantages? Do you know
        any alternatives, and why would you use those?
      </li>
      <li>
        Explain what a single page app is and how to make one SEO-friendly.
      </li>
      <li>
        What is the extent of your experience with Promises and/or their
        polyfills?
      </li>
      <li>
        What are the pros and cons of using Promises instead of callbacks?
      </li>
      <li>
        What are some of the advantages/disadvantages of writing JavaScript code
        in a language that compiles to JavaScript?
      </li>
      <li>What tools and techniques do you use debugging JavaScript code?</li>
      <li>
        What language constructions do you use for iterating over object
        properties and array items?
      </li>
      <li>
        Explain the difference between mutable and immutable objects.
        <ul>
          <li>What is an example of an immutable object in JavaScript?</li>
          <li>What are the pros and cons of immutability?</li>
          <li>How can you achieve immutability in your own code?</li>
        </ul>
      </li>
      <li>
        Explain the difference between synchronous and asynchronous functions.
      </li>
      <li>
        What is event loop?
        <ul>
          <li>What is the difference between call stack and task queue?</li>
        </ul>
      </li>
      <li>
        Explain the differences on the usage of
        <code>foo</code> between
        <code>
          function foo()
          {}
        </code>{' '}
        and
        <code>
          var foo = function()
          {}
        </code>
      </li>
    </ul>

    <h3>Performance Questions:</h3>

    <ul>
      <li>What tools would you use to find a performance bug in your code?</li>
      <li>
        What are some ways you may improve your website&apos;s scrolling
        performance?
      </li>
      <li>Explain the difference between layout, painting and compositing.</li>
    </ul>

    <h3>Network Questions:</h3>

    <ul>
      <li>
        Traditionally, why has it been better to serve site assets from multiple
        domains?
      </li>
      <li>
        Do your best to describe the process from the time you type in a
        website&apos;s URL to it finishing loading on your screen.
      </li>
      <li>
        What are the differences between Long-Polling, Websockets and
        Server-Sent Events?
      </li>
      <li>
        Explain the following request and response headers:
        <ul>
          <li>Diff. between Expires, Date, Age and If-Modified-...</li>
          <li>Do Not Track</li>
          <li>Cache-Control</li>
          <li>Transfer-Encoding</li>
          <li>ETag</li>
          <li>X-Frame-Options</li>
        </ul>
      </li>
      <li>
        What are HTTP methods? List all HTTP methods that you know, and explain
        them.
      </li>
    </ul>

    <h3>Fun Questions:</h3>

    <ul>
      <li>What&apos;s a cool project that you&apos;ve recently worked on?</li>
      <li>What are some things you like about the developer tools you use?</li>
      <li>Who inspires you in the front-end community?</li>
      <li>Do you have any pet projects? What kind?</li>
      <li>What&apos;s your favorite feature of Internet Explorer?</li>
      <li>How do you like your coffee?</li>
    </ul>
  </Fragment>
);

export default QuestionsTabFrontend;

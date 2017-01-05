####  Example of Google Analytics usage

GA snippet is added directly (index.html) or loaded from separate ga-loader.js file (page2.html). In both cases it is added synchronously, otherwise you cannot just add to body lines like `<script>ga('localHitPrinter:message', 'Hello, world from Page 2!');</script>`

Covered features:
- pages tracking
- events tracking
- time tracking
- plugin
- task

The GA related definitions are slightly different for index.html and page2.html

index.html contains a GA snippet that was standard copy-pasted one and then added:
- set property usage
- plugin loading
- couple of extra functions to play with
- task added to standard sendHitTask that prints some stuff to the browser console
- callback on send pageview command
- some further explanations as comments

page2.html contains a minimal number of extra stuff. The only optional thing there is loading localHitPrinter plugin from ga-utils.js to demonstrate it usage when GA is loaded from a separate file. Note also that task added to standard sendHitTask **sends data to my server** besides other actions

Both HTML files calls onLoadEventHandler function from ga-utils.js file. This function demonstrates timing tracking usage besides other things.  


To test things on local Jetty: webapps\static.xml:
```
 <?xml version="1.0"  encoding="ISO-8859-1"?>
 <!DOCTYPE Configure PUBLIC "-//Mort Bay Consulting//DTD Configure//EN" "http://jetty.eclipse.org/configure.dtd">
 <Configure class="org.eclipse.jetty.server.handler.ContextHandler">
   <Set name="contextPath">/</Set>
   <Set name="resourceBase">path-to-local-folder-where-index-sits</Set>
   <Set name="handler">
     <New class="org.eclipse.jetty.server.handler.ResourceHandler">
       <Set name="cacheControl">no-cache</Set>
     </New>
   </Set>
 </Configure>
```
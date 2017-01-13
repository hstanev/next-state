# next-state

Configurable module that remembers the next state on each transition. When a transition is intercepted(we are redirected to a state that is configured as not to be remembered)
this module ensures to redirect the user to the previous intended state after a it receives a signal that it listens for.

## Requirements

- angular
- ui-router
- angular-permission

## Sample use case scenario

A user attepmts to go to a `accounts` page, but his session expires and he's redirected to a `login` page.
After a successful login we want to redirect the user to where he was heading i.e. the `accounts` page.

## Usage
You can get it from [Bower](http://bower.io/)

```sh
bower install next-state
```

Load the script files in your application:

```html
<script type="text/javascript" src="bower_components/next-state/dist/next-state.min.js"></script>
```

Add the specific module to your dependencies:

```javascript
angular.module('myApp', ['resolve.next-state', ...])
```
## Configuring nextState service

```js
.config(function(nextStateProvider, defaultHomeRedirect) {
        nextStateProvider.setExcludedStates([
            'login'
        ]);

        nextStateProvider.setRedirectEvents([
            'login_successful',
        ]);
        
        // Here defaultHomeRedirect is used as constant defined globally, but if you want feel free to mention a state name directly
        nextStateProvider.setDefaultHomeRedirect(defaultHomeRedirect);
});
```

The module works with **state names and event names**! In the example `login` and `defaultHomeRedirect` are both just state names.

**Note: State params are currently not preserved during redirection.**



